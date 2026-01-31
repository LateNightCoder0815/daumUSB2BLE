const Bleno = require('@abandonware/bleno');
const Logger = require('../logger');

const logger = new Logger('heart-rate-characteristic.js');

class HeartRateCharacteristic extends Bleno.Characteristic {
  constructor () {
    super({
      uuid: '2A37',
      value: null,
      properties: ['notify'],
      descriptors: [
        new Bleno.Descriptor({
          // Client Characteristic Configuration
          uuid: '2901',
          value: 'Heart Rate Measurement'
        })
      ]
    });
    this._updateValueCallback = null;
  }

  onSubscribe (maxValueSize, updateValueCallback) {
    logger.debug('client subscribed');
    this._updateValueCallback = updateValueCallback;
    return this.RESULT_SUCCESS;
  }

  onUnsubscribe () {
    logger.debug('client unsubscribed');
    this._updateValueCallback = null;
    return this.RESULT_UNLIKELY_ERROR;
  }

  notify (event) {
    logger.debug('notify');
    if ('hr' in event) {
      const buffer = new Buffer.alloc(2); 
      //logger.debug('hr: ' + event.hr);
    
      buffer.writeUInt8(0, 0);
      buffer.writeUInt8(event.hr, 1);

      if (this._updateValueCallback) {
        this._updateValueCallback(buffer);
      } else {
        logger.debug('nobody is listening');
      }
    }

    return this.RESULT_SUCCESS;
  }
}

module.exports = HeartRateCharacteristic;
