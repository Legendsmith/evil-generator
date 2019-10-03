define(function() {
    if (!(window.GeneratorFoundry === undefined)) {
        return window.GeneratorFoundry;
    }

    window.GeneratorFoundry = {
        loadQueue: [],
        generators: {
            handlers: {},
        },
    };

    window.GeneratorFoundry.generators.generate = function(handlerName, data) {
        if (!window.GeneratorFoundry.generators.handlers.hasOwnProperty(handlerName)) {
            return;
        }

        let handler = window.GeneratorFoundry.generators.handlers[handlerName];

        handler(data);
    }

    let worker = new Worker('/genfoundry/foundry.js');
    window.GeneratorFoundry.worker = worker;
    window.GeneratorFoundry.worker._isready = false;

    let workerModuleLoad = function(req) {
        window.GeneratorFoundry.worker.postMessage(
            {
                'source': 'foundry',
                'action': 'load',
                'info': req,
            }
        );
    }

    let processBacklog = function() {
        let q = window.GeneratorFoundry.loadQueue;
        while(window.GeneratorFoundry.loadQueue.length > 0) {
            let req = window.GeneratorFoundry.loadQueue.pop();
            workerModuleLoad(req);
        }
    }

    window.GeneratorFoundry.load = function(path, alias) {
        if (path === undefined || alias === undefined) {
            return false;
        }

        let req = {
            'path': path,
            'alias': alias,
        };

        if (window.GeneratorFoundry.worker._isready) {
            workerModuleLoad(req);
            return true;
        } else {
            window.GeneratorFoundry.loadQueue.push(req);
            return true;
        }
    }

    // Our handler matrix.
    let matrix = {
        foundry: {},
    };

    // Override
    window.GeneratorFoundry.registerSubMatrix = function(root, handlers) {
        matrix[root] = handlers;
    }

    matrix.foundry.ready = function(event) {
        window.GeneratorFoundry.worker._isready = true;
        processBacklog();
    }

    matrix.foundry.notify_error = function(data) {
        console.log("Foundry Error: " + JSON.stringify(data));
    }

    matrix.foundry.generate = function(data) {
        if (!data.hasOwnProperty('handler')) {
            return;
        }
        return window.GeneratorFoundry.generators.generate(data.handler, data);
    }

    worker.onmessage = function(event) {
        let data = event.data;

        console.log(data);

        if (!(data.hasOwnProperty('source') && data.hasOwnProperty('action'))) {
            return;
        }

        // Internal handler fetch to clean up code below.
        function getHandler() {
            if (matrix.hasOwnProperty(data['source'])) {
                handler = matrix[data.source];
                if (handler.hasOwnProperty(data.action)) {
                    return handler[data.action];
                }
            }

            if (matrix.foundry.hasOwnProperty(data.action)) {
                return matrix.foundry[data.action];
            }
            return;
        }
    
        // Non-fatal branching here.  Fallback to foundry handlers.
        if (!matrix.hasOwnProperty(data['source'])) {
            let data = event.data;
            if (!(data.hasOwnProperty('source') && data.hasOwnProperty('action'))) {
                return;
            }
        
            let handler = getHandler(data);
            if (handler === undefined) {
                console.log("Unknown foundry message: " + JSON.stringify(data));
                return;
            }       

            // Pass it off.
            return handler(event.data);
        }
    
        let handler = matrix[data.source];
        if (!handler.hasOwnProperty(data.action)) {
            return;
        }
    
        // Pass all data.
        return handler[data.action](event.data);
    };

    return window.GeneratorFoundry;
});