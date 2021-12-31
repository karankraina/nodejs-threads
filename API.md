## Functions

<dl>
<dt><a href="#createWorker">createWorker(workerPath, [payload])</a> ⇒</dt>
<dd><p>Function to create a new worker thread. Calling this function will instantiate a new worker thread
and return a promise which resolves to the reference to the worker thread. The worker thread will
be executed in a separate process.</p></dd>
<dt><a href="#defineWorker">defineWorker(job)</a> ⇒</dt>
<dd><p>Function to define what should be executed inside the worker thread.
The async function will be executed as soon as the worker thread is created.</p></dd>
<dt><a href="#runInWorker">runInWorker(modulePath, functionName, payload)</a> ⇒</dt>
<dd><p>This function takes in module path and function name and intstantiates a worker thread.
It returns a promise which resolves to the result of the job.</p></dd>
</dl>

<a name="createWorker"></a>

## createWorker(workerPath, [payload]) ⇒
<p>Function to create a new worker thread. Calling this function will instantiate a new worker thread
and return a promise which resolves to the reference to the worker thread. The worker thread will
be executed in a separate process.</p>

**Kind**: global function  
**Returns**: <p>Promise which resolves to the reference of the worker</p>  
**Throws**:

- <code>Error</code> <p>If workerPath is not a string</p>

**Created**: 27-DEC-2021  
**Author**: Karan Raina <karanraina1996@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| workerPath | <code>string</code> | <p>Path to the worker file</p> |
| [payload] | <code>object</code> | <p>Payload to be sent to the worker</p> |

**Example**  
```js
const { createWorker } = require('nodejs-threads');// ORimport { createWorker } from 'nodejs-threads';// Inside any async functionconst worker = await createWorker('./worker.js', {       range: 50000000,    });// Attach a listener if you expect any return value from the worker funcionworker.on('message', (result) => {    console.log(result);});
```
<a name="defineWorker"></a>

## defineWorker(job) ⇒
<p>Function to define what should be executed inside the worker thread.
The async function will be executed as soon as the worker thread is created.</p>

**Kind**: global function  
**Returns**: <p>Returns a promise which resolves to the result of the job</p>  
**Created**: 27-DEC-2021  
**Author**: Karan Raina <karanraina1996@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| job | <code>function</code> | <p>Async function to be executed in the worker</p> |

**Example**  
```js
// This code will execute in a separate threadconst { defineWorker } = require('nodejs-threads');// ORimport { defineWorker } from 'nodejs-threads';defineWorker(async (payload) => {    console.log(payload); // Payload from the Primary thread is availbale here        // Do any CPU intensive task here.    // The event loop in primary thread won't be blocked .        let result = 0;    for (let i = 0; i < payload.range; i++) {        result += i;    }    console.log('COMPLETED');    return result;});
```
<a name="runInWorker"></a>

## runInWorker(modulePath, functionName, payload) ⇒
<p>This function takes in module path and function name and intstantiates a worker thread.
It returns a promise which resolves to the result of the job.</p>

**Kind**: global function  
**Returns**: <p>Returns a promise which resolves to the result of the job</p>  
**Created**: 30-DEC-2021  
**Author**: Karan Raina <karanraina1996@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| modulePath | <code>string</code> | <p>Path of the module to be loaded in the worker thread. This should either be absolute path or relative to the current working directory.</p> |
| functionName | <code>string</code> | <p>Function name to be executed in the worker thread. Must be a named export in the module specified in modulePath.</p> |
| payload | <code>object</code> | <p>Payload to be passed to the function specified in functionName.</p> |

**Example**  
```js
// No need to create a separate file for the worker thread.const { runInWorker } = require('nodejs-threads');// ORimport { runInWorker } from 'nodejs-threads';// Assume this is the CPU intensive taskconst { calculateScore } = './users.service';async function main() {    try {        // Spawn a worker thread like this:        // Does not block the main thread        const result = await runInWorker('./users.service', 'calculateScore', { name: 'Karan' });        console.log('[PRIMARY] : WORKER EXECUTED WITH ...', result);    } catch (error) {        console.log('[PRIMARY] : ERROR', error);    }}
```
