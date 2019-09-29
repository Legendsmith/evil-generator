// Configuration for standalone evil.
// (But even never stands alone...)

requirejs.config({
    baseUrl: '/app',
    paths: {
        core: 'core',
        gen: 'gen',
        lib: 'lib',
        util: 'util',
    }
});

requirejs(['core/main']);