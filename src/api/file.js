import axios from 'axios';
import {baseUrl, urlUpload} from './url';

const url = urlUpload + '/api/v1/file';
export const postUploadFile = async formData => {
  const response = await fetch(`${url}/bulk-upload`, {
    method: 'POST',
    body: formData,
    // Không cần set 'Content-Type' header, fetch
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
