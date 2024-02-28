const { isMainThread, workerData, parentPort } = require("worker_threads");

if (!isMainThread) {
  // do CPU intensive task
  console.log(isMainThread)
  // Data sent from main thread is available in workerData
  const data = workerData;
  console.log(data, 'woekrerere');
  // for(let i=0;i<1000;i++){
  //   console.log(i)
  // }
  parentPort.postMessage("data from worker");

}
