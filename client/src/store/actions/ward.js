import {SET_WARD, SET_CURRENT_WARD, REMOVE_WARD} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';
import { setCurrentUser } from './auth';

 export const setWard = ward =>(
    {
        type:SET_WARD,
        ward   
 })
 
 export const setcurrentWard = ward =>({
        type:SET_CURRENT_WARD,
        ward
})

export const deleteWard = (id) => ({
    type: REMOVE_WARD,
    payload: id
})

export const getWard = () =>{
    return async dispatch =>{
        try {
            const ward = await api.call('get',`ward`);
            dispatch(setWard(ward));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserWard = () =>{
   return async dispatch =>{
       try {
        const ward = await api.call('get','ward/user');
        dispatch(setWard(ward));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getcurrentWard = (id) =>{
    return async dispatch =>{
        try {
            const ward = await api.call('get',`ward/${id}`);
            dispatch(setcurrentWard(ward));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  

export const createWard= (data, history) =>{
    return async dispatch =>{
        try {
            const ward = await api.call('post','ward', data);
            dispatch(setcurrentWard(ward));
            dispatch(removeError());
            history.push('/app/ward');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateWard = (id, data, history) =>{
    return async dispatch =>{
        try {
            const ward = await api.call('post',`ward/${id}`, data);
            dispatch(setcurrentWard(ward));
            dispatch(removeError());
            history.push('/app/ward');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}

export const removeWard = (id) =>{
    return async dispatch =>{
        try {
            const ward = await api.call('delete',`ward/${id}`);
            dispatch(deleteWard(id));
            dispatch(removeError());

        } catch (error) {
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  