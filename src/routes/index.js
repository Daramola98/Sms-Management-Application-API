import sms from './sms';
import contact from './contact';

export default (router) => {
  contact(router);
  sms(router);
};
