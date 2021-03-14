import {SET_DRIVERS, SET_CURRENT_DRIVER, REMOVE_DRIVER} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';
import { setCurrentUser } from './auth';

 export const setDrivers = drivers =>(
    {
        type:SET_DRIVERS,
        drivers         
 })
 
 export const setCurrentDriver = driver =>({
        type:SET_CURRENT_DRIVER,
        driver
})

export const deleteDriver = (id) => ({
    type: REMOVE_DRIVER,
    payload: id
})

export const getDrivers = () =>{
    return async dispatch =>{
        try {
            const drivers = await api.call('get',`drivers`);
            dispatch(setDrivers(drivers));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserDriver = () =>{
   return async dispatch =>{
       try {
        const drivers = await api.call('get','drivers/user');
        dispatch(setDrivers(drivers));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getCurrentDriver = (id) =>{
    return async dispatch =>{
        try {
            const driver = await api.call('get',`drivers/${id}`);
            dispatch(setCurrentDriver(driver));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  

export const createDriver = (data, history) =>{
    return async dispatch =>{
        try {
            const driver = await api.call('post','drivers', data);
            dispatch(setCurrentDriver(driver));
            dispatch(removeError());
            history.push('/app/drivers');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateDriver = (id, data, history) =>{
    return async dispatch =>{
        try {
            const driver = await api.call('post',`drivers/${id}`, data);
            dispatch(setCurrentDriver(driver));
            dispatch(removeError());
            history.push('/app/drivers');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}

export const removeDriver = (id) =>{
    return async dispatch =>{
        try {
            const driver = await api.call('delete',`drivers/${id}`);
            dispatch(deleteDriver(id));
            dispatch(removeError());

        } catch (error) {
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  