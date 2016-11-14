# Proco App

## Running development version

* Clone the repository and navigate to `code/mobile` directory
* Install dependencies 

  ```bash
  $ npm i # or yarn maybe?
  ```

* Open `code/mobile/ios/Proco.xcworkspace` with Xcode.
* Select the device you want to run on (if you connect a real device via USB, it'll appear on the list) ([Screenshot](https://cloud.githubusercontent.com/assets/698079/20267596/20b61b60-aa84-11e6-8959-13489e930f10.png))
  
This will fire a Terminal and run react-native's packager. You should keep the packager running for app to be able to run on the device (or simulator). If you don't like Macos' default Terminal app, you can run the packager manually by

  ```bash
  $ npm start
  ```