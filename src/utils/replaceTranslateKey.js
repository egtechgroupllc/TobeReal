export const replaceTranslateKey = (text, replacements) => {
  return text?.replace(/{(\w+)}/g, (match, key) => {
    return replacements?.[key] || match;
  });
};
