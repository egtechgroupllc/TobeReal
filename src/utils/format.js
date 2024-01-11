const decimalPlaces = 2;
export const formatPrice = (number = 0, decimal) => {
  const numberString = number ? number.toString() : '0';
  const dotIndex = numberString.indexOf('.');

  if (dotIndex !== -1) {
    const decimalPart = numberString.slice(
      dotIndex + 1,
      dotIndex + 1 + (decimal || decimalPlaces),
    );
    const integerPart = numberString
      .slice(0, dotIndex)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const result = integerPart + '.' + decimalPart;

    return result;
  } else {
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
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
