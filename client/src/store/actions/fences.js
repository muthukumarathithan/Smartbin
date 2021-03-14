import {SET_FENCES, SET_CURRENT_FENCE, REMOVE_FENCE} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';

 export const setFences = fences =>(
    {
        type:SET_FENCES,
        fences         
 })

 export const setCurrentFence = fence =>({
        type:SET_CURRENT_FENCE,
        fence
})

export const deleteFence = (id) => ({
    type: REMOVE_FENCE,
    payload: id
})

export const getFences = () =>{
    return async dispatch =>{
        try {
            const fences = await api.call('get',`fences`);
            dispatch(setFences(fences));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserFence = () =>{
   return async dispatch =>{
       try {
        const fences = await api.call('get','fences/user');
        dispatch(setFences(fences));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getCurrentFence = (id) =>{
    return async dispatch =>{
        try {
            const fence = await api.call('get',`fences/${id}`);
            dispatch(setCurrentFence(fence));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const createFence = (data, history) =>{
    return async dispatch =>{
        try {
            const fence = await api.call('post','fences', data);
            dispatch(setCurrentFence(fence));
            dispatch(removeError());
            history.push('/app/fences');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateFence = (id, data, history) =>{
    return async dispatch =>{
        try {
            const fence = await api.call('post',`fences/${id}`, data);
            dispatch(setCurrentFence(fence));
            dispatch(removeError());
            history.push('/app/fences');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}



export const removeFence = (id) =>{
    return async dispatch =>{
        try {
            const fence = await api.call('delete',`fences/${id}`);
            dispatch(deleteFence(id));
            dispatch(removeError());

        } catch (error) {
            alert(error)
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  