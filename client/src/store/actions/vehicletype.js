import {SET_VEHICLETYPE, SET_CURRENT_VEHICLETYPE, REMOVE_VEHICLETYPE} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';
import { setCurrentUser } from './auth';

 export const setVehicletype = vehicletype =>(
    {
        type:SET_VEHICLETYPE,
        vehicletype   
 })
 
 export const setcurrentVehicletype = vehicletype =>({
        type:SET_CURRENT_VEHICLETYPE,
        vehicletype
})

export const deleteVehicletype = (id) => ({
        type: REMOVE_VEHICLETYPE,
        payload: id
})

export const getVehicletype = () =>{
    return async dispatch =>{
        try {
            const vehicletype = await api.call('get',`vehicletype`);
            dispatch(setVehicletype(vehicletype));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserVehicletype = () =>{
   return async dispatch =>{
       try {
        const vehicletype = await api.call('get','vehicletype/user');
        dispatch(setVehicletype(vehicletype));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getcurrentVehicletype = (id) =>{
    return async dispatch =>{
        try {
            const vehicletype = await api.call('get',`vehicletype/${id}`);
            dispatch(setcurrentVehicletype(vehicletype));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  

export const createVehicletype= (data, history) =>{
    return async dispatch =>{
        try {
            const vehicletype = await api.call('post','vehicletype', data);
            dispatch(setcurrentVehicletype(vehicletype));
            dispatch(removeError());
            history.push('/app/vehicletype');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateVehicletype = (id, data, history) =>{
    return async dispatch =>{
        try {
            const vehicletype = await api.call('post',`vehicletype/${id}`, data);
            dispatch(setcurrentVehicletype(vehicletype));
            dispatch(removeError());
            history.push('/app/vehicletype');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}

export const removeVehicletype = (id) =>{
    return async dispatch =>{
        try {
            const vehicletype = await api.call('delete',`vehicletype/${id}`);
            dispatch(deleteVehicletype(id));
            dispatch(removeError());

        } catch (error) {
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  

