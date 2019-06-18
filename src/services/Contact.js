import db from '../db';

const { Contact } = db;

class ContactService {
  static create(contactDetails) {
    return Contact.create(contactDetails);
  }

  static findOne(query) {
    return Contact.findOne(query);
  }

  static getList() {
    return Contact.findAll();
  }

  static delete(contactToDelete) {
    return contactToDelete.destroy();
  }
}

export default ContactService;
