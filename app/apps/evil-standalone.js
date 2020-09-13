// Configuration for standalone evil.
// (But evil never stands alone...)

let hrefSplit = window.location.href.split("//")[1].split("/");
window.prefix = "/";
if (hrefSplit.length > 2) {
    // Determine prefix.
    window.prefix = window.location.href.split(hrefSplit[0])[1];
}

requirejs.config({
    baseUrl: window.prefix + 'app',
    paths: {
        core: 'core',
        gen: 'gen',
        lib: 'lib',
        util: 'util',
    }
});

requirejs(['core/main']);