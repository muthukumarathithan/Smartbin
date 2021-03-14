import {SET_VEHICLETYPE, SET_CURRENT_VEHICLETYPE, REMOVE_VEHICLE} from '../actionTypes';

export const vehicletype = (state = [], action) =>{
    switch(action.type){
        case SET_VEHICLETYPE:
            return action.vehicletype;
        case REMOVE_VEHICLE:
            var state = state.filter((item) => item._id !== action.payload);
            return state;     
        default:
            return state;     
 
    }


}

export const currentVehicletype= (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_VEHICLETYPE:
            return action.vehicletype
        default:
            return state;     
    
    }
}