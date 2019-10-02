define(['core/foundry', 'core/dataloader'], function(foundry, dataLoader) {
    if(window.GeneratorFoundry.EvilGenerator === undefined) {
        window.GeneratorFoundry.EvilGenerator = {
            loaded : false,
            data : {},
        };
        let loader = new Worker('/app/gen/evil/_data/worker.js');
        
        loader.onmessage = function(event) {
            window.GeneratorFoundry.EvilGenerator.loaded = true;
            window.GeneratorFoundry.EvilGenerator.data = event.data;
            delete loader;
        }
        console.log(loader);
    }

    return window.GeneratorFoundry.EvilGenerator.data;
});