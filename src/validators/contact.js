import { body } from 'express-validator/check';

export default [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
    .isLength({
      min: 2,
    })
    .withMessage('Password must be more than 6'),
  body('phoneNumber')
    .not()
    .isEmpty()
    .withMessage('Phone number is required')
    .isLength({
      min: 11,
      max: 11,
    })
    .withMessage('Phone number must be 11 digits')
    .isInt()
    .withMessage('Provide only numeric digits'),
];
