// Controller
import SmsController from '../controllers/Sms';

// Validator
import SmsValidator from '../validators/sms';
import ValidationMiddleware from '../middlewares/ValidationMiddleware';

const {
  createSms, getSms, getSmsList, deleteSms,
} = SmsController;

export default (router) => {
  router.post('/api/v1/sms', SmsValidator, ValidationMiddleware, createSms);
  router.get('/api/v1/sms/:id', getSms);
  router.get('/api/v1/sms-messages', getSmsList);
  router.delete('/api/v1/sms/:id', deleteSms);
};
