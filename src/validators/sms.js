import { body } from 'express-validator/check';

export default [
  body('message')
    .not()
    .isEmpty()
    .withMessage('Message is required'),
  body('senderContactId')
    .not()
    .isEmpty()
    .withMessage('Sender Contact Id is required'),
  body('receiverPhoneNumber')
    .not()
    .isEmpty()
    .withMessage('Phone number is required')
    .isLength({
      min: 11,
      max: 11,
    })
    .withMessage('Phone number must be 11 digits'),
];
