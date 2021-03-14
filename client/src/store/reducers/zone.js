import {SET_ZONE, SET_CURRENT_ZONE, REMOVE_ZONE} from '../actionTypes';

export const zone = (state = [], action) =>{
    switch(action.type){
        case SET_ZONE:
            return action.zone;
        case REMOVE_ZONE:
            var state = state.filter((item) => item._id !== action.payload);
            return state;     
        default:
            return state;     
 
    }


}

export const currentZone = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_ZONE:
            return action.zone
        default:
            return state;     
    
    }
}