const validator = {
  require: {
    required: true,
    message: 'Required',
  },
  maxlength4: {
    max: 4,
    message: 'Must be less than 4 characters',
  },
  maxlength7: {
    max: 7,
    message: 'Must be less than 7 characters',
  },
  maxlength10: {
    max: 10,
    message: 'Must be less than 10 characters',
  },
  maxlength200: {
    max: 200,
    message: 'Must be less than 200 characters',
  },
  maxlength15: {
    max: 15,
    message: 'Must be less than 15 characters',
  },
};

export default validator;
