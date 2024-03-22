export const requireField = message => {
  return {required: message};
};

export const confirmField = (message, field) => {
  return {validate: value => value === field || message};
};

export const validateMinLengthText = (message, length) => {
  return {minLength: {value: length, message}, required: message};
};

export const validateMaxLengthText = (message, length) => {
  return {maxLength: {value: length, message}};
};

export const validateEqualLength = (message, length) => {
  return {validate: value => value?.length === length || message};
};

export const validateMinLength = (message, length) => {
  return {validate: value => value?.length >= length || message};
};

export const validateMaxLength = (message, length) => {
  return {validate: value => value?.length <= length || message};
};

export const validateMinAmount = (message, amount) => {
  return {
    min: {
      value: amount || 1,
      message: message,
    },
  };
};

export const validateMaxAmount = (message, amount) => {
  return {
    max: {
      value: amount,
      message: message,
    },
  };
};

export const validateMinMaxAmount = (message, amount, minAmount) => {
  return {
    min: {
      value: minAmount || 1,
      message: message,
    },
    max: {
      value: amount,
      message: message,
    },
  };
};

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
