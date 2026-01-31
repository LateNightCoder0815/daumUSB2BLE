const Bleno = require('@abandonware/bleno');
const HeartRateCharacteristic = require('./heart-rate-characteristic');


class HeartRateService  extends Bleno.PrimaryService {
  constructor () {
    let heart_rate_characteristic = new HeartRateCharacteristic();

    super({
      uuid: '180d',
      characteristics: [
        heart_rate_characteristic,
      ]
    });

    this.heart_rate_characteristic = heart_rate_characteristic;
  }

  /*
   * Transfer event from daum USB to the given characteristics
   */
  notify (event) {
    this.heart_rate_characteristic.notify(event);
    return this.RESULT_SUCCESS;
  }
}

module.exports = HeartRateService;
