import {SET_BINS, SET_CURRENT_BIN, REMOVE_BIN} from '../actionTypes';

export const bins = (state = [], action) =>{
    switch(action.type){
        case SET_BINS:
            return action.bins;
        case REMOVE_BIN:
            var state = state.filter((item) => item._id !== action.payload);
            return state;     
        default:
            return state;     
 
    }


}

export const currentBin = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_BIN:
            return action.bin
        default:
            return state;     
    
    }
}