import { DeviceEventEmitter } from "react-native";
import { locationUpdated } from "./actions";

export default function subscriber(uid, emit) {

  DeviceEventEmitter.addListener(
    'locationUpdated',
    (
      {
        coords: {latitude, longitude}
      }
    ) => emit(locationUpdated(latitude, longitude))
  );

  return () => DeviceEventEmitter.removeAllListeners('locationUpdated');
}
