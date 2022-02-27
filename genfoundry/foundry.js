/// This file contains a WebWorker.

// -- Non root hack
g_AppPrefix = location.toString();
let locationSplit = g_AppPrefix.split("//")[1].split("/");
if (locationSplit.length > 2) {
    // Determine prefix.
    g_AppPrefix = g_AppPrefix.split(locationSplit[0])[1];
}
g_AppPrefix = g_AppPrefix.split("/genfoundry/", 1)[0] + "/";
// -- Non root hack

/// Polyfill.
/// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
if (!Math.imul) Math.imul = function(a, b) {
    var aHi = (a >>> 16) & 0xffff;
    var aLo = a & 0xffff;
    var bHi = (b >>> 16) & 0xffff;
    var bLo = b & 0xffff;
    // the shift by 0 fixes the sign on the high part
    // the final |0 converts the unsigned value into a signed value
    return ((aLo * bLo) + (((aHi * bLo + aLo * bHi) << 16) >>> 0) | 0);
};

String.prototype.titleCase = function() {
    let str = this.toLowerCase().split(' ');
    let final = [ ];
    for(let	word of str) {
        final.push(word.charAt(0).toUpperCase()+ word.slice(1));
    }
    return final.join(' ');
}


/**
 * PCG Random Source (16-bit generator).
 * 
 * Requires a bunch of internal code to make it work.
 * JavaScript's 64-bit support is ... lacking.
 */
g_Random = (function() {
    /**
     * PCG random source.
     */
    class RandomSource {
        /**
         * Creates a new PCG instance.
         */
        constructor() {
            this.state = 0xe39b;
            this.inc = 0x5bdb;
        }

        /**
         * Re-seeds the randomiser.
         * @param {*} s State
         * @param {*} i Inc
         */
        seed(s, i) {
            if (s === undefined || i === undefined) {
                return;
            }

            this.state = 0;
            this.inc = (i << 1) | 1;
            this.random();
            this.state += s;
            this.random();
        }

        /**
         * Generate a uniformly distributed 32-bit random number.
         */
        random() {
            let s = this.state;
            this.state = Math.imul(s, 747796405) + this.inc;
            let xored = ((s >>> 10) ^ s) >> 12;
            let roted = s >>> 28;
            let result = (xored >>> roted) | (xored << (-roted) & 31);
            return result;
        }

        /**
         * Generates a uniformly distributed 32-bit random number, where
         * the result is between 0 and `maxValue`.
         * 
         * @param {*} maxValue Maximum value.
         */
        randomRange(maxValue) {
            let threshold = -maxValue % maxValue;
            for (let i = 0; i < 50; i++) {
                let r = this.random();
                if (r >= threshold) {
                    return r % maxValue;
                }
            }
            return this.random() % maxValue;
        }
    };

    let globalSource = new RandomSource()
    globalSource.new = function(s, i) {
        let randSource = new RandomSource();
        if (s === undefined || i === undefined) {
            return randSource;
        }

        randSource.seed(s, i);
        return randSource;
    }

    return globalSource;
})();

g_Random.randomFromArray = function(data) {
    var ni = this.randomRange(data.length - 1);
    if (isNaN(ni)){
        console.log("NaN detected, array return set to 0")
        ni=0
    }
    return data[ni];
}

// This should work
g_Random.pick = function() {
    return arguments[this.randomRange(arguments.length)];
}

// return true if in range, otherwise false
function isInRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}

// The foundry.
g_Foundry = {};

// The matrix.
let matrix = {
    foundry: {},
    generator: {},
};

function registerSubMatrix(root, handlers) {
    matrix[root] = handlers;
}

matrix.foundry.reseed = function(data) {
    let date = new Date();

    let seed0 = date.valueOf() >>> 4;
    let seed1 = date.valueOf() >>> 7;

    if (data.hasOwnProperty('seed0') && data.hasOwnProperty('seed1')) {
        seed0 = parseInt(data.seed0) || seed0;
        seed1 = parseInt(data.seed1) || seed1;
    }

    seed0 = seed0 % 0xFFFF;
    seed1 = seed1 % 0xFFFF;

    g_Random.seed(seed0, seed1);
}

matrix.foundry.load = function(data) {
    // Load requests
    // {source, action, info: {path, alias}}
    if (!data.hasOwnProperty('info')) {
        return;
    }
    
    // Pull info.
    let info = data.info;

    if ((info.hasOwnProperty('path') && info.hasOwnProperty('alias'))) {
        // Later we can catch, but during dev phases,
        // keep this commented out.
        /*try {
        */
            importScripts(info.path);
        /*
        } catch (e) {
            postMessage({
                'source': 'foundry',
                'action': 'notify_error',
                'error': 'load failure',
                'info': info,
            });
            return;
        }
        */
    }
}

onmessage = function(event) {
    let data = event.data;
    if (!(data.hasOwnProperty('source') && data.hasOwnProperty('action'))) {
        return;
    }

    if (!matrix.hasOwnProperty(data['source'])) {
        return;
    }

    let handler = matrix[data.source];
    if (!handler.hasOwnProperty(data.action)) {
        return;
    }

    // Pass all data.
    return handler[data.action](event.data);
}

// Tell the other side we're ready.
postMessage({
    'source': 'foundry',
    'action': 'ready',
});