import db from '../db';

const { Sms } = db;

class SmsService {
  static create(smsDetails) {
    return Sms.create(smsDetails);
  }

  static findOne(query) {
    return Sms.findOne(query);
  }

  static getList() {
    return Sms.findAll();
  }

  static delete(smsToDelete) {
    return smsToDelete.destroy();
  }
}

export default SmsService;
