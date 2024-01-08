export const arrayToObject = value => {
  if (Array.isArray(value)) {
    const reducedObject = value.reduce((accumulator, currentObject) => {
      return {...accumulator, ...arrayToObject(currentObject)};
    }, {});
    return reducedObject;
  }

  return typeof value === 'object' && value ? value : {};
};
