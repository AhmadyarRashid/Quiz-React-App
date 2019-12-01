import {ADD_ANSWER} from './type';

export const quizAction = values => dispatch => {
    dispatch({
        type: ADD_ANSWER,
        payload: values
    })
};
