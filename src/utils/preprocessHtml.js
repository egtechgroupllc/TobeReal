export const preprocessHtml = html => {
  const source = html?.replace(/data-src/g, 'src');

  return {
    html: source,
  };
};
