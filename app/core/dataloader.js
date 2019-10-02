define(["gen/evil/data",'util/dom'],function(data, domUtil){
    return function(scriptFilename, listener, onError) {
        let instance = {};
        let worker = new Worker(scriptFilename);
        let listeners = {};

        instance.defaultListener = listener || function() {};

        // Optional error handler
        if (onError) {
            worker.onerror = onError;
        }

        // Wrap
        instance.postMessage = function(message) {
            worker.postMessage(message);
        }

        instance.terminate = function() {
            worker.terminate();
        }
    }
});