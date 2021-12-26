const { Worker, workerData, isMainThread, parentPort } = require('worker_threads');


/**
 * Function to create a new worker thread.
 * 
 * @param {string} workerPath Path to the worker file
 * @param {Object} payload Payload to be sent to the worker
 * @returns Promise which resolves to the reference of the worker
 */
export function createWorker(workerPath, payload = {}) {
    if (!isMainThread) {
        return null;
    }
    return new Promise((resolve) => {
        const worker = new Worker(workerPath, {
            workerData: payload
        });

        worker.on('exit', (code) => {
            console.log(`Worker ${worker.threadId} exited with code ${code}`);
        });

        // resolve when the worker starts code execution
        worker.on('online', () => {
            resolve(worker);
        });

    });
};

/**
 * Function to define a worker function.
 * 
 * @param {Function} job Function to be executed by the worker
 * @returns Returns a promise which resolves to the result of the job
 */
export async function defineWorker(job) {
    // return if it is primary thread
    if (isMainThread) {
        return null;
    }
    const result = await job(workerData);
    parentPort.postMessage(result);
};