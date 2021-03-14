import {SET_ZONE, SET_CURRENT_ZONE, REMOVE_ZONE} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';
import { setCurrentUser } from './auth';

 export const setZone = zone =>(
    {
        type:SET_ZONE,
        zone         
 })
 
 export const setcurrentZone = zone =>({
        type:SET_CURRENT_ZONE,
        zone
})

export const deleteZone = (id) => ({
    type: REMOVE_ZONE,
    payload: id
})

export const getZone = () =>{
    return async dispatch =>{
        try {
            const zone = await api.call('get',`zone`);
            dispatch(setZone(zone));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserZone = () =>{
   return async dispatch =>{
       try {
        const zone = await api.call('get','zone/user');
        dispatch(setZone(zone));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getcurrentZone = (id) =>{
    return async dispatch =>{
        try {
            const zone = await api.call('get',`zone/${id}`);
            dispatch(setcurrentZone(zone));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  

export const createZone = (data, history) =>{
    return async dispatch =>{
        try {
            const zone = await api.call('post','zone', data);
            dispatch(setcurrentZone(zone));
            dispatch(removeError());
            history.push('/app/zone');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateZone = (id, data, history) =>{
    return async dispatch =>{
        try {
            const zone = await api.call('post',`zone/${id}`, data);
            dispatch(setcurrentZone(zone));
            dispatch(removeError());
            history.push('/app/zone');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}

export const removeZone = (id) =>{
    return async dispatch =>{
        try {
            const zone = await api.call('delete',`zone/${id}`);
            dispatch(deleteZone(id));
            dispatch(removeError());

        } catch (error) {
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  