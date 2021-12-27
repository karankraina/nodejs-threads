const { workerData, isMainThread, parentPort } = require('worker_threads');

/**
 * Function to define a worker function.
 * 
 * @param {Function} job Function to be executed by the worker
 * @returns Returns a promise which resolves to the result of the job
 */
 async function defineWorker(job) {
    // return if it is primary thread
    if (isMainThread) {
        return null;
    }
    const result = await job(workerData);
    parentPort.postMessage(result);
};

export default defineWorker;