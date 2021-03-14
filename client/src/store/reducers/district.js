import {SET_DISTRICT, SET_CURRENT_DISTRICT, REMOVE_DISTRICT} from '../actionTypes';

export const district = (state = [], action) =>{
    switch(action.type){
        case SET_DISTRICT:
            return action.district;
        case REMOVE_DISTRICT:
            var state = state.filter((item) => item._id !== action.payload);
            return state;     
        default:
            return state;     
 
    }


}

export const currentDistrict = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_DISTRICT:
            return action.district
        default:
            return state;     
    
    }
}