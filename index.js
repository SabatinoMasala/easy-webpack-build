const build = require('./src/build');
const setup = require('./src/setup');
const yargs = require('yargs');

const argv = require('yargs')
    .command('$0', 'the default command', () => {}, (argv) => {
        build(process.env.NODE_ENV);
    })
    .command('setup [type]', 'Setup the project', (yargs) => {
        yargs
            .positional('type', {
                describe: 'Project type',
                default: 'laravel'
            })
    }, (argv) => {
        setup(argv.type);
    })
    .argv;
