import { database } from '../../utils';
export const testUsersRef = (fid) => adminDatabase.ref(`playhouse/test-users/${fid ? fid : ''}`);

export * as facebook from './facebook';
