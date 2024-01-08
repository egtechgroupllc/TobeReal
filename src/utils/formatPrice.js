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
