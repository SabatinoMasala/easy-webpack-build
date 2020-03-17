const ncp = require('ncp').ncp;
const projectRoot = process.cwd();
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { exec } = require('child_process');

async function copyDir(dir) {
    const src = path.resolve(__dirname, `../setup/${dir}`);
    const dest = `${projectRoot}/${dir}`;
    console.log(`Copying ${dir} dir`);
    return new Promise((resolve, reject) => {
        ncp(src, dest,  function (err) {
            if (err) {
                reject();
            }
            console.log(chalk.green(`${dir} dir copied`));
            resolve();
        });
    })
}

async function copyFile(file) {
    const src = path.resolve(__dirname, `../setup/${file}`);
    const dest = `${projectRoot}/${file}`;
    console.log(`Copying ${file}`);
    return new Promise((resolve, reject) => {
        fs.copyFile(src, dest, (err) => {
            if (err) {
                reject();
            }
            console.log(chalk.green(`${file} copied`));
            resolve();
        });
    })
}

async function mergePackageJson() {
    console.log('Merging package.json');
    const src = path.resolve(__dirname, '../setup/package.json');
    const dest = `${projectRoot}/package.json`;
    const projectPackage = JSON.parse(fs.readFileSync(dest).toString());
    const buildPackage = JSON.parse(fs.readFileSync(src).toString());
    const mergedPackage = {
        scripts: buildPackage.scripts
    };
    ['dependencies', 'devDependencies'].forEach(key => {
        mergedPackage[key] = Object.assign(projectPackage[key] || {}, buildPackage[key]);
    });
    if (mergedPackage.devDependencies['laravel-mix']) {
        delete mergedPackage.devDependencies['laravel-mix'];
    }
    return new Promise((resolve, reject) => {
        fs.writeFile(dest, JSON.stringify(mergedPackage, null, 4), function (err) {
            if (err) {
                reject();
            }
            console.log(chalk.green('package.json merged'));
            resolve();
        });
    })
}

async function mergeComposerJson() {
    console.log('Merging composer.json');
    const src = path.resolve(__dirname, '../setup/config/laravel/composer.json');
    const dest = `${projectRoot}/composer.json`;
    const projectComposer = JSON.parse(fs.readFileSync(dest).toString());
    const buildComposer = JSON.parse(fs.readFileSync(src).toString());
    const mergedComposer = Object.assign({}, projectComposer);
    mergedComposer.require = Object.assign(mergedComposer.require, buildComposer.require);
    const repositories = mergedComposer.repositories || [];
    const repoUrls = repositories.map(r => r.url);
    buildComposer.repositories.forEach(repo => {
        if (repoUrls.indexOf(repo.url) === -1) {
            repositories.push(repo);
        }
    });
    mergedComposer.repositories = repositories;
    return new Promise((resolve, reject) => {
        fs.writeFile(dest, JSON.stringify(mergedComposer, null, 4), function (err) {
            if (err) {
                reject();
            }
            console.log(chalk.green('composer.json merged'));
            resolve();
        });
    })
}

module.exports = async function(type) {
    if (type === 'laravel') {
        await copyDir('src');
        await copyFile('.babelrc');
        await copyFile('simple-build-conf.js');
        await mergePackageJson();
        await mergeComposerJson();
        console.log(chalk.green('project has been set up, please run:'));
        console.log(chalk.yellow('yarn install'));
        console.log(chalk.yellow('composer update'));
        console.log(chalk.yellow(`To add stylesheet, use: {!! ewb()->css('/dist/css/styles.css') !!}`));
        console.log(chalk.yellow(`To add scripts, use: {!! ewb()->scripts() !!}`));
    }
};
