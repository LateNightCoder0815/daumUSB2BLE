const Logger = require('../logger');
const logger = new Logger('test-ble.js');
const DaumBLE = require('../BLE/daumBLE');

let daumBLE = new DaumBLE(serverCallback)

setInterval(callServer, 1000);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function callServer() {
  let data={};
  data.hr=50 + getRandomInt(10);
  data.rpm=50 + getRandomInt(10);
  data.power=50 + getRandomInt(10);
  data.speed=50 + getRandomInt(10);

  logger.debug('data:' + JSON.stringify(data));
  
  daumBLE.notifyFTMS(data)
}


function serverCallback (message, ...args) {
  let success = false;
  return success;
}
