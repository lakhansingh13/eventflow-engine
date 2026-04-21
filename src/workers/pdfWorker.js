import { parentPort, workerData } from "worker_threads";

const result = `PDF generated for ${workerData.userId}`;

parentPort.postMessage(result);