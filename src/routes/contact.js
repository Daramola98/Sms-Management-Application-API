// Controller
import ContactController from '../controllers/Contact';

// Validator
import ContactValidator from '../validators/contact';
import ValidationMiddleware from '../middlewares/ValidationMiddleware';

const {
  createContact, getContact, getContactMessages, getContacts, deleteContact,
} = ContactController;

export default (router) => {
  router.post('/api/v1/contact', ContactValidator, ValidationMiddleware, createContact);
  router.get('/api/v1/contact/:id', getContact);
  router.get('/api/v1/contact/:id/messages', getContactMessages);
  router.get('/api/v1/contacts', getContacts);
  router.delete('/api/v1/contact/:id', deleteContact);
};
