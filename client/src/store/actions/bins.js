import {SET_BINS, SET_CURRENT_BIN, REMOVE_BIN} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';
import { setCurrentUser } from './auth';

 export const setBin = bins =>(
    {
        type:SET_BINS,
        bins         
 })
 
 export const setcurrentBin = bin =>({
        type:SET_CURRENT_BIN,
        bin
})

export const deleteBin = (id) => ({
    type: REMOVE_BIN,
    payload: id
})

export const getBin = () =>{
    return async dispatch =>{
        try {
            const bins = await api.call('get',`bins`);
            dispatch(setBin(bins));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserBin = () =>{
   return async dispatch =>{
       try {
        const bins = await api.call('get','bins/user');
        dispatch(setBin(bins));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getcurrentBin = (id) =>{
    return async dispatch =>{
        try {
            const bins = await api.call('get',`bins/${id}`);
            dispatch(setcurrentBin(bins));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  

export const createBin = (data, history) =>{
    return async dispatch =>{
        try {
            const bins = await api.call('post','bins', data);
            dispatch(setcurrentBin(bins));
            dispatch(removeError());
            history.push('/app/bins');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateBin = (id, data, history) =>{
    return async dispatch =>{
        try {
            const bins = await api.call('post',`bins/${id}`, data);
            dispatch(setcurrentBin(bins));
            dispatch(removeError());
            history.push('/app/bins');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}

export const removeBin = (id) =>{
    return async dispatch =>{
        try {
            const bins = await api.call('delete',`bins/${id}`);
            dispatch(deleteBin(id));
            dispatch(removeError());

        } catch (error) {
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  