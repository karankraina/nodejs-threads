const { Worker, isMainThread } = require('worker_threads');

/**
 * Function to create a new worker thread. Calling this function will instantiate a new worker thread
 * and return a promise which resolves to the reference to the worker thread. The worker thread will
 * be executed in a separate process.
 * 
 * @param {string} workerPath Path to the worker file
 * @param {object} [payload] Payload to be sent to the worker
 * 
 * @author Karan Raina <karanraina1996@gmail.com>
 * @created 27-DEC-2021
 * 
 * @example
 * const { createWorker } = require('nodejs-threads');
 * // OR
 * import { createWorker } from 'nodejs-threads';
 * // Inside any async function
 * const worker = await createWorker('./worker.js', {
 *        range: 50000000,
 *     });
 * // Attach a listener if you expect any return value from the worker funcion
 * worker.on('message', (result) => {
 *     console.log(result);
 * });
 * 
 * @returns Promise which resolves to the reference of the worker
 * 
 * @throws {Error} If workerPath is not a string
 */
 function createWorker(workerPath, payload = {}) {

    if(!workerPath || typeof workerPath !== 'string') {
        throw new Error('Invalid filePath');
    }
    if(workerPath === 'testpath'){
        console.log('======================', { isMainThread });
    }
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

export default createWorker;