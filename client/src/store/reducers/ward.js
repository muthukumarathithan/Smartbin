import {SET_WARD, SET_CURRENT_WARD, REMOVE_WARD} from '../actionTypes';

export const ward = (state = [], action) =>{
    switch(action.type){
        case SET_WARD:
            return action.ward;
        case REMOVE_WARD:
            var state = state.filter((item) => item._id !== action.payload);
            return state;     
        default:
            return state;     
 
    }


}

export const currentWard = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_WARD:
            return action.ward
        default:
            return state;     
    
    }
}