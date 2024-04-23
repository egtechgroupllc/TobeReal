import {addDays, addMonths, addYears, format} from 'date-fns';

export const formatPrice = (
  price = 0,
  {
    showCurrency = true,
    currency = '',
    unit = '',
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

  (!showCurrency || unit) && delete option.style;

  const numberFormat = new Intl.NumberFormat(locales, option);

  const formattedPrice = numberFormat.format(numericPrice);

  // Thêm đơn vị tự chọn
  return formattedPrice + (unit ? ` ${unit}` : '');
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

export const formatDate = (
  date = new Date(),
  {dateStyle, addDays: daysToAdd, monthsToAdd, yearsToAdd} = {},
) => {
  let formattedDateTime = new Date(date);

  if (daysToAdd) {
    formattedDateTime = addDays(formattedDateTime, daysToAdd);
  }

  if (monthsToAdd) {
    formattedDateTime = addMonths(formattedDateTime, monthsToAdd);
  }

  if (yearsToAdd) {
    formattedDateTime = addYears(formattedDateTime, yearsToAdd);
  }

  const dateFormat = dateStyle || 'yyyy-MM-dd';

  return format(formattedDateTime, dateFormat);
};

export const formatDateTime = (
  date = new Date(),
  {noDate, noHour, isHour24, addDays: daysToAdd, dateStyle} = {},
) => {
  let formattedDateTime = new Date(date);

  // Thêm số ngày vào ngày hiện tại nếu có
  if (daysToAdd) {
    formattedDateTime = addDays(formattedDateTime, daysToAdd);
  }

  const dateFormat = noDate ? '' : 'dd MMM yyyy';
  const timeFormat = noHour ? '' : !isHour24 ? 'HH:mm ' : 'hh:mm a';
  const formatString = dateStyle || `${dateFormat} ${timeFormat}`.trim();

  return format(formattedDateTime, formatString);
};

export const formatTime = (date = new Date(), {isHour24} = {}) => {
  let formattedDateTime = new Date(date);

  const timeFormat = !isHour24 ? 'HH:mm' : 'h:mm a';

  const formatString = `${timeFormat}`.trim();

  return format(formattedDateTime, formatString);
};
