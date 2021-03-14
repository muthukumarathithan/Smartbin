import {SET_SUPERVISOR, SET_CURRENT_SUPERVISOR, REMOVE_SUPERVISOR} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';
import { setCurrentUser } from './auth';

 export const setSupervisor = supervisor =>(
    {
        type:SET_SUPERVISOR,
        supervisor   
 })
 
 export const setcurrentSupervisor = supervisor =>({
        type:SET_CURRENT_SUPERVISOR,
        supervisor
})

export const deleteSupervisor = (id) => ({
    type: REMOVE_SUPERVISOR,
    payload: id
})

export const getSupervisor= () =>{
    return async dispatch =>{
        try {
            const supervisor = await api.call('get',`supervisor`);
            dispatch(setSupervisor(supervisor));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserSupervisor = () =>{
   return async dispatch =>{
       try {
        const supervisor = await api.call('get','supervisor/user');
        dispatch(setSupervisor(supervisor));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getcurrentSupervisor = (id) =>{
    return async dispatch =>{
        try {
            const supervisor = await api.call('get',`supervisor/${id}`);
            dispatch(setcurrentSupervisor(supervisor));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  

export const createSupervisor = (data, history) =>{
    return async dispatch =>{
        try {
            const supervisor = await api.call('post','supervisor', data);
            dispatch(setcurrentSupervisor(supervisor));
            dispatch(removeError());
            history.push('/app/supervisor');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateSupervisor = (id, data, history) =>{
    return async dispatch =>{
        try {
            const supervisor = await api.call('post',`supervisor/${id}`, data);
            dispatch(setcurrentSupervisor(supervisor));
            dispatch(removeError());
            history.push('/app/supervisor');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}

export const removeSupervisor = (id) =>{
    return async dispatch =>{
        try {
            const supervisor = await api.call('delete',`supervisor/${id}`);
            dispatch(deleteSupervisor(id));
            dispatch(removeError());

        } catch (error) {
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  