import {storage} from "../../../core/Api";
import RNFetchBlob from "react-native-fetch-blob";
import config from "../../Profiles/Loops/config";

// Pollyfills for firebase web sdk
const fs = RNFetchBlob.fs;
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


export const upload = (photos, path) => {

    const loop_key = database.ref('keyGenerator').push().key;
    const uid = this.props.uid;
    const uploads = this.state.photos.map((photo, key) => {
      return Blob
        .build(RNFetchBlob.wrap(photo), {type: 'image/jpg;'})
        .then((blob) => {
          // upload image using Firebase SDK
          return base.storage()
            .ref(`users/loops/${uid}/${loop_key}`)
            .child(`${key}.jpg`)
            .put(blob, {contentType: 'image/jpg'})
            .then((snapshot) => {
              blob.close();
              console.log("uploaded", snapshot)
              const profileLoopUpdate = {
                [`info/${uid}/loop_key`]: loop_key,
                [`summary/${uid}/loop_key`]: loop_key,
                [`loops/${uid}/${loop_key}`]: base.database.ServerValue.TIMESTAMP,
              };
              return database.ref('users').update(profileLoopUpdate);
            })
        })
    });


    Promise.all(uploads).then(results => console.log(results)).catch(e => console.log("error", e));

    // Triggered when capturing is complete. Captured photos are available in this.state.photos.
  }
