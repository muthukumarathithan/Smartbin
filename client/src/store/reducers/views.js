import {SET_MAP_VIEW, SET_HISTORY} from '../actionTypes';

export const views = (state = {}, action) =>{
    switch(action.type){
        case SET_MAP_VIEW:
            return {
                mapView:action.mapView,
            }
        default:
            return state;     

    }


}

export const history = (state = [], action) =>{
    switch(action.type){
        case SET_HISTORY:
            return action.history;
        default:
            return state;     
    
    }
    
    
    }