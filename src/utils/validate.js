export const requireField = message => {
  return {required: message};
};

export const confirmField = (message, field) => {
  return {validate: value => value === field || message};
};

export const validateMinLength = (message, length) => {
  return {minLength: {value: length, message}, required: message};
};

export const validateEqualLength = (message, length) => {
  return {validate: value => value?.length === length || message};
};

export const validateMinAmount = (message, amount) => {
  return {validate: value => parseFloat(value) > amount || message};
};

export const validateMaxAmount = (message, max) => {
  return {validate: value => value?.length < max || message};
};

export const validateMinMaxAmount = (message, amount, minAmount = 1) => {
  return {
    validate: value =>
      (parseFloat(value) <= amount &&
        parseFloat(value) >= (minAmount || 1) &&
        /^[0-9.]+$/.test(value)) ||
      message,
  };
};
// /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const validateEmail = message => {
  return {
    pattern: {value: /^[a-zA-Z0-9.]+@gmail\.com$/, message},
  };
};

export const validateUserName = message => {
  return {
    pattern: {value: /^[a-zA-Z][a-zA-Z0-9]{3,29}$/, message},
  };
};

const PNF = require('google-libphonenumber');
const phoneUtil = PNF.PhoneNumberUtil.getInstance();

export const validatePhone = (message, countryCode) => {
  return {
    validate: value => {
      try {
        return (
          phoneUtil.isValidNumberForRegion(
            phoneUtil.parseAndKeepRawInput(value, countryCode),
            countryCode,
          ) || message
        );
      } catch (error) {
        return message;
      }
    },
  };
};

export const validatePhoneNotRequire = (message, countryCode) => {
  return {
    validate: value => {
      try {
        return value
          ? phoneUtil.isValidNumberForRegion(
              phoneUtil.parseAndKeepRawInput(value, countryCode),
              countryCode,
            ) || message
          : true;
      } catch (error) {
        return message;
      }
    },
  };
};

export const validateCode = message => {
  return {
    pattern: {value: /^[0-9]+$/, message},
  };
};

export const validateLengthImage = (message, length) => {
  return {validate: value => value?.length === length || message};
};
