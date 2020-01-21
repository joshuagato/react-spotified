import axios from 'axios';
import * as actionTypes from './actionTypes';

const updateEmailSuccess = updatedEmail => {
    return {
        type: actionTypes.UPDATE_DETAIL_EMAIL_SUCCESS,
        updatedEmail: updateEmail
    };
};
const updateEmailFailure = error => {
    return {
        type: actionTypes.UPDATE_DETAIL_EMAIL_FAILURE,
        error: error
    };
};
export const updateEmail = (email) => {
    
};


const updatePasswordSuccess = updatedEmail => {
    return {
        type: actionTypes.UPDATE_PASSWORD_SUCCESS,
        updatedEmail: updateEmail
    };
};
const updatePasswordFailure = error => {
    return {
        type: actionTypes.UPDATE_PASSWORD_FAILURE,
        error: error
    };
};
export const updatePassword = (currentPw, newPw) => {
    
};