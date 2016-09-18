import { getFirebaseDataWithCache } from "../../core/Api";

export const getThreadPeople = tid =>
  getFirebaseDataWithCache(`threads/info/${tid}/people`)
    .then(people => Object.keys(people));
