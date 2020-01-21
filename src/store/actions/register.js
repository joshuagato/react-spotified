import axios from 'axios';
import * as actionTypes from './actionTypes';

const registerSuccess = details => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        details: details
    };
};
const registerFailure = errors => {
    return {
        type: actionTypes.REGISTER_FAILURE,
        errors: errors
    };
};
export const registerUser = userInput => {
    console.log(userInput);
    return dispatch => {
        const graphqlQuery = {
            query: `
                query RegisterUser($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
                    createUser(userInput: { firstname: $firstname, lastname: $lastname, email: $email, password: $password }) {
                        id firstname lastname email
                    }
                }
            `,
            variables: { firstname: userInput.firstname, lastname: userInput.lastname, 
                email: userInput.email, password: userInput.password }
        };

        axios.post('http://localhost:4004/graphql', graphqlQuery).then(response => {
            
            dispatch(registerSuccess(response.data.data));
            // dispatch(registerSuccess(response.data.data.createUser));
        })
        .catch(error => {
            // console.log(error.response.data.errors[0].message); //we can map through this array
            console.log("error", error.response);
            
            dispatch(registerFailure(error.response));
        });
    };
};