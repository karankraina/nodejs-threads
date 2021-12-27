const { workerData, isMainThread, parentPort } = require('worker_threads');

/**
 * Function to define what should be executed inside the worker thread.
 * The async function will be executed as soon as the worker thread is created.
 * 
 * @param {Function} job Async function to be executed in the worker
 * @author Karan Raina <karanraina1996@gmail.com>
 * @created 27-DEC-2021
 * 
 * @example
 * 
 * // This code will execute in a separate thread
 * const { defineWorker } = require('nodejs-threads');
 * // OR
 * import { defineWorker } from 'nodejs-threads';
 * defineWorker(async (payload) => {
 *     console.log(payload); // Payload from the Primary thread is availbale here
 *     
 *     // Do any CPU intensive task here.
 *     // The event loop in primary thread won't be blocked .
 *     
 *     let result = 0;
 *     for (let i = 0; i < payload.range; i++) {
 *         result += i;
 *     }
 *     console.log('COMPLETED');
 *     return result;
 * });
 * 
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