/// This file contains a WebWorker.

String.prototype.titleCase = function() {
    var str = this.toLowerCase().split(' ');
    let final = [ ];
    for(let	word of str){
        final.push(word.charAt(0).toUpperCase()+ word.slice(1));
    }
    return final.join(' ')
}

// Global Random source.
g_Random = (function() {

    /**
     * PCG random source.
     */
    class RandomSource {
        /**
         * Creates a new PCG instance.
         */
        constructor() {
            this.state = 0x853c49e6748fea9b;
            this.inc = 0xda3e39cb94b95bdb;
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
            this.state = s * 6364136223846793005 + this.inc;
            let xored = ((s >> 18) ^ s) >> 27;
            let roted = s >> 59;
            return (xored >> roted) | (xored << (-roted) & 31);
        }

        /**
         * Generates a uniformly distributed 32-bit random number, where
         * the result is between 0 and `maxValue`.
         * 
         * @param {*} maxValue Maximum value.
         */
        randomRange(maxValue) {
            let threshold = -maxValue % maxValue;
            while (true) {
                let r = this.random();
                if (r >= threshold) {
                    return r % maxValue;
                }
            }
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