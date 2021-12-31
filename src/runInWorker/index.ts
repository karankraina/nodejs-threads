import { Worker } from 'worker_threads';

/**
 * @private
 * Generates the content of the worker thread.
 * 
 * @param {string} modulePath Path of the module to be loaded in the worker thread. This should either be absolute path or relative to the current working directory. 
 * @param {string} functionName Function name to be executed in the worker thread. Must be a named export in the module specified in modulePath.
 *  
 * @returns {string} Returns the worker thread content
 */
function workerContent(workerPath: string, functionName: string): string {
    return `
    const { workerData, parentPort,threadId } = require('worker_threads');
    const { ${functionName} } = require('${workerPath}');

    parentPort.on('message', async (message) => {
        console.log(\`[Thread #\${threadId}] : Received Message \`, message);
        if (message.type === 'execute') {
            try {
                const result = await ${functionName}(workerData);
                console.log(\`[Thread #\${threadId}] : FUNCTION COMPLETED \`, result);
                parentPort.postMessage(result);
                process.exit(0);
            } 
            catch (error) {
                console.log(\`[Thread #\${threadId}] : Error \`, error);
                parentPort.postMessage(error);
                process.exit(1);
            }
        }
    });
    `;
}

/**
 * This function takes in module path and function name and intstantiates a worker thread.
 * It returns a promise which resolves to the result of the job.
 * 
 * @param {string} modulePath Path of the module to be loaded in the worker thread. This should either be absolute path or relative to the current working directory.
 * @param {string} functionName Function name to be executed in the worker thread. Must be a named export in the module specified in modulePath.
 * @param {object} payload Payload to be passed to the function specified in functionName.
 * 
 * @author Karan Raina <karanraina1996@gmail.com>
 * @created 30-DEC-2021
 * 
 * @example
 * 
 * // No need to create a separate file for the worker thread.
 * 
 * const { runInWorker } = require('nodejs-threads');
 * // OR
 * import { runInWorker } from 'nodejs-threads';
 * 
 * // Assume this is the CPU intensive task
 * const { calculateScore } = './users.service';
 * 
 * async function main() {
 *     try {
 *         // Spawn a worker thread like this:
 *         // Does not block the main thread
 *         const result = await runInWorker('./users.service', 'calculateScore', { name: 'Karan' });
 *         console.log('[PRIMARY] : WORKER EXECUTED WITH ...', result);
 *     } catch (error) {
 *         console.log('[PRIMARY] : ERROR', error);
 *     }
 * }
 * 
 * @returns Returns a promise which resolves to the result of the job
 */
const runInWorker = (modulePath: string, functionName: string, payload?: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const worker: Worker = new Worker(workerContent(modulePath, functionName), {
                workerData: payload || {},
                eval: true,
            });

            worker.on('online', () => console.log(`[Thread #${worker.threadId}] : Online`));

            worker.on('exit', (code: number) => {
                if (code === 1) {
                    return reject(new Error(`[Thread #${worker.threadId}] : Worker failed`));
                }
            });

            worker.on('error', (error: Error) => {
                console.log('[WORKER] : Error ', error.message);
                if (error.message.match(/Cannot find module/) || error.message.match(/is not a function/)) {
                    return reject(new Error(`[Thread #${worker.threadId}] : Function or Module not found. Provide relative path from the executing file or an absolute path.`));
                }
                return reject(error);
            });

            worker.on('message', (result: any) => {
                console.log(`[Thread #${worker.threadId}] : Completed with result ${result}`);
                return resolve(result);
            });

            worker.postMessage({
                type: 'execute',
            });

        } catch (error) {
            return reject(error);
        }
    });
};

export default runInWorker;