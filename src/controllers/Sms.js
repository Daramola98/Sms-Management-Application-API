import { respondWithWarning, respondWithSuccess } from '../helpers/httpResponse';
import SmsService from '../services/Sms';
import ContactService from '../services/Contact';

class SmsController {
  static async createSms(req, res) {
    const { senderContactId, receiverPhoneNumber: phoneNumber } = req.body;
    const findReceiverIdQuery = {
      where: {
        phoneNumber,
      },
    };
    const findSenderIdQuery = {
      where: {
        id: senderContactId,
      },
    };
    try {
      const sender = await ContactService
        .findOne(findSenderIdQuery);
      const receiver = await ContactService
        .findOne(findReceiverIdQuery);

      if (!sender) {
        return respondWithWarning(res, 403, { message: 'You are not permitted to send a message' });
      }

      if (!receiver) {
        return respondWithWarning(res, 404, { message: 'Contact with phone number not found' });
      }

      const { id: receiverContactId } = receiver;

      if (receiverContactId === senderContactId) {
        return respondWithWarning(res, 403, { message: 'You are not permitted to send a message to yourself' });
      }

      const { dataValues: sms } = await SmsService.create({ ...req.body, receiverContactId });
      return respondWithSuccess(res, 201, 'Sms has been created successfully', sms);
    } catch (error) {
      console.error(error);
      return respondWithWarning(res, 500, { message: 'An Error Occurred' });
    }
  }

  static async getSms(req, res) {
    const { id } = req.params;
    const query = {
      where: { id },
    };

    try {
      const sms = await SmsService.findOne(query);
      if (!sms) {
        return respondWithWarning(res, 404, 'Sms not found');
      }
      return respondWithSuccess(res, 200, 'Sms has been found successfully', sms.dataValues);
    } catch (error) {
      console.error(error);
      return respondWithWarning(res, 500, { message: 'An Error Occurred' });
    }
  }

  static async getSmsList(req, res) {
    try {
      const smsMessages = await SmsService.getList();
      return respondWithSuccess(res, 200, 'Sms Messages has been fetched successfully', smsMessages);
    } catch (error) {
      console.error(error);
      return respondWithWarning(res, 500, { message: 'An Error Occurred' });
    }
  }

  static async deleteSms(req, res) {
    const { id } = req.params;
    const query = {
      where: { id },
    };
    try {
      const smsToDelete = await SmsService.findOne(query);
      if (!smsToDelete) {
        return respondWithWarning(res, 404, 'Sms not found');
      }
      await SmsService.delete(smsToDelete);
      return respondWithSuccess(res, 200, 'Sms has been deleted successfully');
    } catch (error) {
      console.error(error);
      return respondWithWarning(res, 500, { message: 'An Error Occurred' });
    }
  }
}

export default SmsController;
