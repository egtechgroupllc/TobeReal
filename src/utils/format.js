import {addDays, format} from 'date-fns';

export const formatPrice = (
  price = 0,
  {
    showCurrency = true,
    currency = '',
    locales = 'en-US',
    decimalPlaces = 3,
  } = {},
) => {
  if (!price && price !== 0) {
    return '';
  }
  // Remove non-digit characters from price
  const numericPrice = parseFloat(price.toString().replace(/[^\d.-]/g, ''));

  let option = {
    style: 'currency',
    currency: currency || locales.startsWith('vi') ? 'VND' : 'USD',
    maximumSignificantDigits: decimalPlaces,
  };
  !showCurrency && delete option.style;

  const numberFormat = new Intl.NumberFormat(locales, option);

  return numberFormat.format(numericPrice);
};

export function formatNumber(num) {
  if (num > 1e11) return '100B+';

  if (num >= 1e9) {
    return formatWithComma(num / 1e9, 'B');
  } else if (num >= 1e6) {
    return formatWithComma(num / 1e6, 'M');
  } else if (num >= 1e4) {
    return formatWithComma(num / 1e3, 'K');
  } else {
    return num.toString();
  }
}

function formatWithComma(value, suffix) {
  const stringValue = value.toString();
  const indexDot = stringValue.indexOf('.');
  const formattedValue =
    indexDot !== -1 ? stringValue.slice(0, indexDot + 2) : stringValue;

  return formattedValue.replace('.', ',') + suffix;
}

export const formatDateTime = (
  date = new Date(),
  {dateStyle, addDays: daysToAdd} = {},
) => {
  let formattedDateTime = new Date(date);

  if (daysToAdd) {
    formattedDateTime = addDays(formattedDateTime, daysToAdd);
  }

  const dateFormat = dateStyle || 'dd MMM yyyy';

  return format(formattedDateTime, dateFormat);
};

export const formatTime = (date = new Date(), {isHour24} = {}) => {
  let formattedDateTime = new Date(date);

  const timeFormat = isHour24 ? 'HH:mm' : 'h:mm a';

  const formatString = `${timeFormat}`.trim();

  return format(formattedDateTime, formatString);
};
