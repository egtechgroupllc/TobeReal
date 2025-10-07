import {postUploadFile} from '../../Model/api_new/file';

/**
 * Upload nhiều ảnh, luôn trả về mảng data từ API
 */

export const UseUploadImages = async (files = []) => {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append('files', {
      uri: file.uri,
      type: file.type || 'image/jpeg',
      name: file.name || `image_${index}.jpg`,
    });
  });

  const res = await postUploadFile(formData);

  return res?.data || [];
};

export const extractSrc = (images, single = true) => {
  if (!Array.isArray(images) || images.length === 0) {
    return single ? null : [];
  }

  const srcList = images.map(img => img?.src).filter(Boolean);

  return single ? srcList[0] || null : srcList;
};
