import {SET_SUPERVISOR, SET_CURRENT_SUPERVISOR, REMOVE_SUPERVISOR} from '../actionTypes';

export const supervisor = (state = [], action) =>{
    switch(action.type){
        case SET_SUPERVISOR:
            return action.supervisor;
        case REMOVE_SUPERVISOR:
            var state = state.filter((item) => item._id !== action.payload);
            return state;     
        default:
            return state;     
 
    }


}

export const currentSupervisor = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_SUPERVISOR:
            return action.supervisor
        default:
            return state;     
    
    }
}