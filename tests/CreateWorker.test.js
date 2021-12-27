describe('createWorker Expectedly Not working', () => {

    const mock = jest.mock('worker_threads', () => {
        let isMainThread = false;
        return {
            isMainThread,
            parentPort: {
                postMessage: jest.fn()
            },
            Worker: function (filePath, payload) {
                if (!filePath || typeof filePath !== 'string') throw new Error('Invalid filePath');
                this.threadId = 1;
                this.on = function (event, callback) {
                    if (event === 'exit') {
                        callback(0);
                    }
                    if (event === 'online') {
                        callback();
                    }
                    if (event === 'message') {
                        callback(payload);

                    }
                };
            },
        }
    });

    afterAll(() => {
        mock.restoreAllMocks();
    });


    const { createWorker } = require('../lib');


    it('should throw an error if filepath is not defined', async () => {
        try {
            await createWorker(undefined, { payload: true });
        } catch (error) {
            expect(error.message).toBe('Invalid filePath');
        }
    });

    it('should throw an error if filepath is not string', async () => {
        try {
            await createWorker(10, { payload: true });
        } catch (error) {
            expect(error.message).toBe('Invalid filePath');
        }
    });
});
 // end describe

describe('createWorker working', () => {
    const mock = jest.mock('worker_threads', () => {
        let isMainThread = true;
        return {
            isMainThread,
            parentPort: {
                postMessage: jest.fn()
            },
            Worker: function (filePath, payload) {
                if (!filePath || typeof filePath !== 'string') throw new Error('Invalid filePath');
                this.threadId = 1;
                this.on = function (event, callback) {
                    if (event === 'exit') {
                        callback(0);
                    }
                    if (event === 'online') {
                        callback();
                    }
                    if (event === 'message') {
                        callback(payload);

                    }
                };
            },
        }
    });


    const { createWorker } = require('../lib');

    it('should return a promise when run', async () => {
        const worker = await createWorker('filepath', { payload: true });
        expect(typeof worker).toBe(typeof new Promise(() => { }));
    });
});