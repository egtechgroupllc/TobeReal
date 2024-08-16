import {addDays, addMonths, addYears, format} from 'date-fns';
import {vi} from 'date-fns/locale';
import {COUNTRY_KEY} from '../context/CountryContent';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useLanguage} from '../hooks/useLanguage';

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
    return 0;
  }
  // Remove non-digit characters from price
  const numericPrice = parseFloat(price.toString().replace(/[^\d.-]/g, ''));

  if (isNaN(numericPrice)) {
    return 0;
  }

  let option = {
    style: 'currency',
    currency: currency || (locales.startsWith('vi') ? 'VND' : 'USD'),
    maximumSignificantDigits: 14,
  };

  (!showCurrency || unit) && delete option.style;

  const numberFormat = new Intl.NumberFormat(locales, option);

  const formattedPrice = numberFormat.format(
    numericPrice.toFixed(decimalPlaces),
  );

  // Thêm đơn vị tự chọn
  return formattedPrice + (unit ? ` ${unit}` : '');
};

export function formatToken(number) {
  // Convert the number to a string using toFixed to handle the precision
  let numStr = number.toFixed(10);

  // Remove trailing zeros after the decimal point
  numStr = numStr.replace(/\.?0+$/, '');

  // Return the formatted number
  return numStr;
}
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

const getCountry = async () => {
  const countryStorage = await EncryptedStorage.getItem(COUNTRY_KEY);
  return JSON.parse(countryStorage)?.iso2;
};

let countrya = '';
getCountry().then(item => (countrya = item));

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

  return format(formattedDateTime, dateFormat, {locale: vi});
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

  return format(formattedDateTime, formatString, {locale: vi});
};

export const formatTime = (date = new Date(), {isHour24} = {}) => {
  let formattedDateTime = new Date(date);

  const timeFormat = !isHour24 ? 'HH:mm' : 'h:mm a';

  const formatString = `${timeFormat}`.trim();

  return format(formattedDateTime, formatString);
};
export const formatTimeAgo = dateString => {
  const {t} = useLanguage();

  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return t('now');
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes === 1
      ? `1 ${t('minute_ago')}`
      : `${diffInMinutes} ${t('minutes_ago')}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1
      ? `1 ${t('hour_ago')}`
      : `${diffInHours} ${t('hours_ago')}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return diffInDays === 1
      ? `1 ${t('day_ago')}`
      : `${diffInDays} ${t('days_ago')}`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return diffInWeeks === 1
      ? `1 ${t('week_ago')}`
      : `${diffInWeeks} ${t('weeks_ago')}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return diffInMonths === 1
      ? `1 ${t('month_ago')}`
      : `${diffInMonths} ${t('months_ago')}`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return diffInYears === 1
    ? `1 ${t('year_ago')}`
    : `${diffInYears} ${t('years_ago')}`;
};
export const formatCurrency = (num, options = {}) => {
  const {t} = useLanguage();
  const {currency = ''} = options; // Lấy giá trị currency từ options

  let formattedNumber;

  // Tạo định dạng số cho hàng nghìn
  const numberFormat = new Intl.NumberFormat('en-US');

  if (num >= 1e9) {
    formattedNumber = numberFormat.format(num / 1e9) + ' ' + t('billion');
  } else if (num >= 1e6) {
    formattedNumber = numberFormat.format(num / 1e6) + ' ' + t('million');
  } else {
    formattedNumber = numberFormat.format(num);
  }

  // Thêm đơn vị tiền tệ vào cuối chuỗi
  return formattedNumber + (currency ? ` ${currency}` : '');
};
