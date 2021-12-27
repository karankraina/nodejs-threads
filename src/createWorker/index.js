const { Worker, isMainThread } = require('worker_threads');

/**
 * Function to create a new worker thread.
 * 
 * @param {string} workerPath Path to the worker file
 * @param {Object} payload Payload to be sent to the worker
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