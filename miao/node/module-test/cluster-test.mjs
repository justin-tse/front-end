import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';
import process from 'process';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  var port = Math.random() > 0.5 ? 8000 : 7000
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`hello world ${process.pid}\n`);
  }).listen(port);

  console.log(`Worker ${process.pid} ${port} started`);
}
