import { respondWithWarning, respondWithSuccess } from '../helpers/httpResponse';
import ContactService from '../services/Contact';
import db from '../db';

const { Sms } = db;

class ContactController {
  static async createContact(req, res) {
    try {
      const { dataValues: contact } = await ContactService.create(req.body);
      return respondWithSuccess(res, 201, 'Contact has been created successfully', contact);
    } catch (error) {
      if (error.errors) {
        return respondWithWarning(res, 400, error.errors[0].message);
      }
      console.error(error);
      return respondWithWarning(res, 500, { message: 'An Error Occurred' });
    }
  }

  static async getContact(req, res) {
    const { id } = req.params;
    const query = {
      where: { id },
    };

    try {
      const contact = await ContactService.findOne(query);
      if (!contact) {
        return respondWithWarning(res, 404, 'Contact not found');
      }
      return respondWithSuccess(res, 200, 'Contact has been found successfully', contact.dataValues);
    } catch (error) {
      console.error(error);
      return respondWithWarning(res, 500, { message: 'An Error Occurred' });
    }
  }

  static async getContactMessages(req, res) {
    const { id } = req.params;
    const query = {
      where: { id },
      include: [{
        model: Sms, as: 'sentSms',
      },
      {
        model: Sms, as: 'receivedSms',
      },
      ],
    };

    try {
      const contact = await ContactService.findOne(query);
      if (!contact) {
        return respondWithWarning(res, 404, 'Contact not found');
      }
      return respondWithSuccess(res, 200, 'Contact messages has been found successfully', contact.dataValues);
    } catch (error) {
      console.error(error);
      return respondWithWarning(res, 500, { message: 'An Error Occurred' });
    }
  }

  static async getContacts(req, res) {
    try {
      const contacts = await ContactService.getList();
      return respondWithSuccess(res, 200, 'Contacts has been fetched successfully', contacts);
    } catch (error) {
      console.error(error);
      return respondWithWarning(res, 500, { message: 'An Error Occurred' });
    }
  }

  static async deleteContact(req, res) {
    const { id } = req.params;
    const query = {
      where: { id },
    };
    try {
      const contactToDelete = await ContactService.findOne(query);
      if (!contactToDelete) {
        return respondWithWarning(res, 404, 'Contact not found');
      }
      await ContactService.delete(contactToDelete);
      return respondWithSuccess(res, 200, 'Contact has been deleted successfully');
    } catch (error) {
      console.error(error);
      return respondWithWarning(res, 500, { message: 'An Error Occurred' });
    }
  }
}

export default ContactController;
