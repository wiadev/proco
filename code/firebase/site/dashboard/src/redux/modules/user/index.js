import { getCurrentUser, updateUser } from '../../../helpers/firebase';

const firebase = require('firebase');

/** Action Types */
export const GET_USER_REQUEST: string = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: string = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE: string = 'GET_USER_FAILURE';

export const EDIT_USER_REQUEST: string = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS: string = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE: string = 'EDIT_USER_FAILURE';

/** Initial State */
const initialState: I.User = {
	isAuthenticated: false
};

/** Reducer */
export function userReducer(state = initialState, action): I.User {
	switch (action.type) {

		case EDIT_USER_REQUEST:
		case GET_USER_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			});

		case GET_USER_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: true,
				userData: action.userData
			});

		case GET_USER_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.error
			});

		case EDIT_USER_SUCCESS:
			const userData = Object.assign({}, state.userData, action.formData);
      return Object.assign({}, state, {
        isFetching: false,
        userData
      });

    case EDIT_USER_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.error
			});

		default:
			return state;
	}
}

/** Action Creators */

/** Get User */
export function getUser(): Redux.Dispatch {
	return dispatch => {
		dispatch(getUserRequest());
		const user = firebase.auth().currentUser;
		if(user){
			getCurrentUser().then(user => dispatch(getUserSuccess(user)));
		} else {
			dispatch(getUserFailure({"error": "no user on firebase auth"}));
		}
	}
};

export function getUserRequest() {
	return {
		type: GET_USER_REQUEST
	};
}

export function getUserSuccess(userData) {
	return {
		type: GET_USER_SUCCESS,
		userData
	};
}

export function getUserFailure(error: any) {
	return {
		type: GET_USER_FAILURE,
		error
	};
}

/** Edit User */
export function editUser(formData): Redux.Dispatch {
	return dispatch => {
		dispatch(editUserRequest());

		return updateUser(formData)
			.then(function() {
			dispatch(editUserSuccess(formData));
		}, function(err) {
			dispatch(editUserFailure(err));
		});
	}
}

export function editUserRequest() {
	return {
		type: EDIT_USER_REQUEST
	};
}

export function editUserSuccess(formData) {
	return {
		type: EDIT_USER_SUCCESS,
		formData
	};
}

export function editUserFailure(error: any){
	return {
		type: EDIT_USER_FAILURE,
		error
	};
}
