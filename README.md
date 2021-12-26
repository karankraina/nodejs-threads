<h1 align="center">Welcome to nodejs-threads 👋</h1>
<p>
  <a href="https://circleci.com/gh/karankraina/nodejs-threads/tree/main.svg?style=svg" target="_blank">
    <img alt="Version" src="https://circleci.com/gh/karankraina/nodejs-threads/tree/main.svg?style=svg">
  </a>
  <a href="https://www.npmjs.com/package/nodejs-threads" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/nodejs-threads.svg">
  </a>
  <a href="https://github.com/karankraina/nodejs-threads#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/karankraina/nodejs-threads/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/karankraina/nodejs-threads/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/karankraina/nodejs-threads" />
  </a>
  <a href="https://twitter.com/karankraina" target="_blank">
    <img alt="Twitter: karankraina" src="https://img.shields.io/twitter/follow/karankraina.svg?style=social" />
  </a>
</p>

> A very simple function based implementation of node.js worker threads

### 🏠 [Homepage](https://github.com/karankraina/nodejs-threads#readme)

### ✨ [Demo](https://replit.com/@karankraina/nodejs-threads)

## Install

```sh
npm install nodejs-threads
```

## Usage

### Define a worker job that needs to be run in a separate thread.

Use the ```defineWorker``` function to define a worker job in ```worker.js``` file (can be named anything). This function takes an async function as argument. It passes the payload received from the main thread to the argument function of the worker thread.

```javascript
/** 
 * This code will execute in a separate thread
*/
const { defineWorker } = require('nodejs-threads');
// OR
import { defineWorker } from 'nodejs-threads';


defineWorker(async (payload) => {
    console.log(payload); // Payload from the Primary thread is availbale here

    /*
    * Do any CPU intensive task here.
    * The event loop in primary thread won't be blocked .
    */
    let result = 0;
    for (let i = 0; i < payload.range; i++) {
        result += i;
    }
    console.log('COMPLETED');
    return result;
});
```

### Create a worker thread

You can create a new worker thread by simply calling ```createWorker``` function. The first argument is the path of the ```worker.js``` file and you can pass any payload as the second argument. The payload passed will be provided as an argument in the worker callback function.

```javascript
const { createWorker } = require('nodejs-threads');
// OR
import { createWorker } from 'nodejs-threads';

// Inside any async function
const worker = await createWorker('./worker.js', {
       range: 50000000,
    });

// Attach a listener if you expect any return value from the worker funcion
worker.on('message', (result) => {
    console.log(result);
});
    
```


## Run tests

```sh
npm run test
```

## Author

👤 **Karan Raina <karanraina1996@gmail.com>**

* Website: https://karanraina.tech/
* Twitter: [@karankraina](https://twitter.com/karankraina)
* Github: [@karankraina](https://github.com/karankraina)
* LinkedIn: [@karankraina](https://linkedin.com/in/karankraina)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/karankraina/nodejs-threads/issues). You can also take a look at the [contributing guide](https://github.com/karankraina/nodejs-threads/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Karan Raina <karanraina1996@gmail.com>](https://github.com/karankraina).<br />
This project is [MIT](https://github.com/karankraina/nodejs-threads/blob/main/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
