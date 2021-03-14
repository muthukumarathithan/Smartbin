import {SET_DISTRICT, SET_CURRENT_DISTRICT, REMOVE_DISTRICT} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';
import { setCurrentUser } from './auth';

 export const setDistrict = district =>(
    {
        type:SET_DISTRICT,
        district   
 })
 
 export const setcurrentDistrict = district =>({
        type:SET_CURRENT_DISTRICT,
        district
})

export const deleteDistrict = (id) => ({
    type: REMOVE_DISTRICT,
    payload: id
})

export const getDistrict = () =>{
    return async dispatch =>{
        try {
            const district = await api.call('get',`district`);
            dispatch(setDistrict(district));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserDistrict = () =>{
   return async dispatch =>{
       try {
        const district = await api.call('get','district/user');
        dispatch(setDistrict(district));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getcurrentDistrict = (id) =>{
    return async dispatch =>{
        try {
            const district = await api.call('get',`district/${id}`);
            dispatch(setcurrentDistrict(district));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  

export const createDistrict = (data, history) =>{
    return async dispatch =>{
        try {
            const district = await api.call('post','district', data);
            dispatch(setcurrentDistrict(district));
            dispatch(removeError());
            history.push('/app/district');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateDistrict = (id, data, history) =>{
    return async dispatch =>{
        try {
            const district = await api.call('post',`district/${id}`, data);
            dispatch(setcurrentDistrict(district));
            dispatch(removeError());
            history.push('/app/district');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}

export const removeDistrict = (id) =>{
    return async dispatch =>{
        try {
            const district = await api.call('delete',`district/${id}`);
            dispatch(deleteDistrict(id));
            dispatch(removeError());

        } catch (error) {
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  