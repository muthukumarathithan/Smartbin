import {SET_DRIVERS, SET_CURRENT_DRIVER, REMOVE_DRIVER} from '../actionTypes';

export const drivers = (state = [], action) =>{
    switch(action.type){
        case SET_DRIVERS:
            return action.drivers;
        case REMOVE_DRIVER:
            var state = state.filter((item) => item._id !== action.payload);
            return state;     
        default:
            return state;     
 
    }


}

export const currentDriver = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_DRIVER:
            return action.driver
        default:
            return state;     
    
    }
    
    
    }