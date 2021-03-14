import {SET_HOUSE, SET_CURRENT_HOUSE, REMOVE_HOUSE} from '../actionTypes';

export const house = (state = [], action) =>{
    switch(action.type){
        case SET_HOUSE:
            return action.house;
        case REMOVE_HOUSE:
            var state = state.filter((item) => item._id !== action.payload);
            return state;     
        default:
            return state;     
 
    }


}

export const currentHouse = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_HOUSE:
            return action.house
        default:
            return state;     
    
    }
}