import {SET_FENCES, SET_CURRENT_FENCE, REMOVE_FENCE} from '../actionTypes';

export const fences = (state = [], action) =>{
    switch(action.type){
        case SET_FENCES:
            return action.fences;
        case REMOVE_FENCE:
            var state = state.filter((item) => item._id !== action.payload);
            return state; 
        default:
            return state;     

    }


}

export const currentFence = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_FENCE:
            return action.fence;
        default:
            return state;     
    
    }
    
    
    }