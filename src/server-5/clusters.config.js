const logger = require('../logger');

class Master {
  constructor(config) {
    this.config = config || {};
    this.cluster = this.config.cluster;
  }

  levantarWorker() {
    const worker = this.cluster.fork();
    logger.info(`Worker ${worker.id} is running`);
  }

  levantarWorkerMuerto() {
    // Esperamos unos milisegundos para levantar de nuevo un worker
    setTimeout(() => {
      this.levantarWorker();
    }, 300);
  }
}

module.exports = Master;
