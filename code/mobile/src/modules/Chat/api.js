import { getFirebaseDataWithCache } from "../../core/firebase";

export const getThreadPeople = tid =>
  getFirebaseDataWithCache(`threads/info/${tid}/people`)
    .then(people => Object.keys(people));
