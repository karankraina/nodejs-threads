const { defineWorker } = require('./lib/index');

defineWorker((payload) => {
    console.log(payload);
    let result = 0;
    for (let i = 0; i < payload.range; i++) {
        result += i;
    }
    console.log('COMPLETED-------------------------------------------------');
    return result;
});