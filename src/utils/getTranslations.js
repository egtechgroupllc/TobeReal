import axios from 'axios';
import {languageUrlApp, languageUrlServer} from '../Model/url';

const getTranslations = async () => {
  try {
    const typeLng = (await axios.get(`${languageUrlServer}/index.json`)).data
      ?.lng;

    const listLng = await Promise.all(
      typeLng?.map(lng =>
        axios.get(`${languageUrlServer}/${lng}.json`).then(lng => lng.data),
      ),
    );

    const typeLngApp = ['en', 'vi', 'ph', 'ms', 'th', 'zh', 'id'];

    const listLngApp = await Promise.all(
      typeLngApp?.map(lng =>
        axios.get(`${languageUrlApp}/${lng}.json`).then(lng => lng.data),
      ),
    );

    const translations = {};
    // typeLng?.forEach((lng, index) => (translations[lng] = listLng[index]));
    typeLngApp?.forEach((lng, index) => {
      return (translations[lng] = {
        ...listLng[index],
        ...listLngApp[index],
      });
    });
    return translations;
  } catch (error) {
    console.error('Error retrieving translations:', error);
    return null;
  }
};

export default getTranslations;
