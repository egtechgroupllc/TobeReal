import axios from 'axios';

const getTranslations = async () => {
  // try {
  //   const enResponse = await axios.get(`${languageUrl}/app/language/en.json`);
  //   const viResponse = await axios.get(`${languageUrl}/app/language/vi.json`);
  //   const frResponse = await axios.get(`${languageUrl}/app/language/fr.json`);
  //   const chResponse = await axios.get(`${languageUrl}/app/language/ch.json`);
  //   const ruResponse = await axios.get(`${languageUrl}/app/language/ru.json`);
  //   const translations = {
  //     en: enResponse.data,
  //     vi: viResponse.data,
  //     fr: frResponse.data,
  //     zh: chResponse.data,
  //     ru: ruResponse.data,
  //   };
  // return translations;
  return {};
  // } catch (error) {
  //   console.error('Error retrieving translations:', error);
  //   return null;
  // }
};

export default getTranslations;
