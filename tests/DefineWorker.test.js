jest.mock('worker_threads', () => {
    return {
        isMainThread: false,
        parentPort: {
            postMessage: jest.fn()
        },
    }
});

const { defineWorker } = require('../lib');
const { parentPort } = require('worker_threads');

describe('defineWoker', () => {

    // mock worker thread module
    beforeAll(() => {
      
    });

    it('should return the function result to postMessage 1', async () => {
        await defineWorker(() => Promise.resolve('test'));
        expect(parentPort.postMessage).toHaveBeenCalledWith('test');
    });

    it('should return the function result to postMessage 2', async () => {
        // Mock some cpuwork being done in worker thread
        const cpuWork = async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('test');
                }, 500);
            });
        };

        await defineWorker(cpuWork);
        expect(parentPort.postMessage).toHaveBeenCalledWith('test');
    });
}
); // end describe