import RNFetchBlob from "react-native-fetch-blob";
import {storage} from "../";

// Pollyfills for firebase web sdk
const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const upload = (localPath, remotePath, type, meta = {}) =>
  Blob.build(RNFetchBlob.wrap(localPath), {type: `${type};`})
      .then((blob) =>
        storage.ref(remotePath)
          .put(blob, Object.assign({contentType: type}, meta))
          .then((snapshot) => {
            blob.close();
            return snapshot;
          })
      );

