## Modules

<dl>
<dt><a href="#module_nodejs-threads">nodejs-threads</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#createWorker">createWorker(workerPath, [payload])</a> ⇒</dt>
<dd><p>Function to create a new worker thread. Calling this function will instantiate a new worker thread
and return a promise which resolves to the reference to the worker thread. The worker thread will
be executed in a separate process.</p>
</dd>
<dt><a href="#defineWorker">defineWorker(job)</a> ⇒</dt>
<dd><p>Function to define what should be executed inside the worker thread.
The async function will be executed as soon as the worker thread is created.</p>
</dd>
</dl>

<a name="module_nodejs-threads"></a>

## nodejs-threads
<a name="createWorker"></a>

## createWorker(workerPath, [payload]) ⇒
Function to create a new worker thread. Calling this function will instantiate a new worker thread

**Kind**: global function  
**Returns**: Promise which resolves to the reference of the worker  
**Throws**:

- <code>Error</code> If workerPath is not a string

**Created**: 27-DEC-2021  
**Author**: Karan Raina <karanraina1996@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| workerPath | <code>string</code> | Path to the worker file |
| [payload] | <code>object</code> | Payload to be sent to the worker |

**Example**  
```js
const { createWorker } = require('nodejs-threads');
```
<a name="defineWorker"></a>

## defineWorker(job) ⇒
Function to define what should be executed inside the worker thread.

**Kind**: global function  
**Returns**: Returns a promise which resolves to the result of the job  
**Created**: 27-DEC-2021  
**Author**: Karan Raina <karanraina1996@gmail.com>  

| Param | Type | Description |
| --- | --- | --- |
| job | <code>function</code> | Async function to be executed in the worker |

**Example**  
```js
// This code will execute in a separate thread
```