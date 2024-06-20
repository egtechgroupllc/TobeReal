import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';

export const downloadFile = async url => {
  // Get the app's cache directory
  const {config, fs} = RNFetchBlob;
  const cacheDir = fs.dirs.DownloadDir;

  // Generate a unique filename for the downloaded image
  const filename = url.split('/').pop();
  const filePath = `${cacheDir}/${filename}`;

  try {
    // Download the file and save it to the cache directory
    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: filePath,
        appendExt: filename.split('.').pop(),
      },
      android: {
        fileCache: true,
        path: filePath,
        appendExt: filename.split('.').pop(),
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'File',
        },
      },
    });

    const response = await RNFetchBlob.config(configOptions).fetch('GET', url);

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
