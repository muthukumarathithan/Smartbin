import {addError, removeError} from './error';
import {SET_MAP_VIEW, SET_HISTORY} from '../actionTypes'
import api from '../../services/api';

export const setCurrentMap = mapView => {
    return {
        type:SET_MAP_VIEW,
        mapView
    }
}

export const setCurrentHistory = history => {
    return {
        type:SET_HISTORY,
        history
    }
}

export const setMapView = (view, data) =>{
    return async dispatch => {
        try {
            if(view === 3){
                const history = await api.call('post','reports/history', data);
                if(history.length === 0) throw new Error('No Data Found');
                dispatch(setCurrentHistory(history));
            }
            else{
                dispatch(setCurrentHistory([]));
            }
            dispatch(setCurrentMap(view));
            dispatch(removeError());
        } catch (error) {
          alert(error)
          dispatch(addError(error));

        }
    }
}