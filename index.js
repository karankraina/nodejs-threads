const { createWorker } = require('./lib/index');


async function main() {
    // create a worker
    const worker = await createWorker('./worker.js', {
        range: 5000000000,
    });

    worker.on('message', (result) => {
        console.log(result);
    });

    setInterval(() => {
        console.log(' HELLO !!! I AM FROM THE PRIMARY THREAD')
    }, 1000);

}

main().then(() => {
    console.log('Done!');
}).catch((err) => {
    console.error(err);
});