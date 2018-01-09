let cluster = require('cluster');

if (cluster.isMaster) {
  var numWorkers = require('os').cpus().length;

  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for (let i = 0; i < numWorkers - 1; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log(
      'Worker ' +
        worker.process.pid +
        ' died with code: ' +
        code +
        ', and signal: ' +
        signal
    );
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  require('./index.js');
}
