import {SET_EMPLOYEES, SET_CURRENT_EMPLOYEE, REMOVE_EMPLOYEE} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';
import { setCurrentUser } from './auth';

 export const setEmployees = employees =>(
    {
        type:SET_EMPLOYEES,
        employees         
 })
 
 export const setCurrentEmployee = employee =>({
        type:SET_CURRENT_EMPLOYEE,
        employee
})

export const deleteEmployee = (id) => ({
    type: REMOVE_EMPLOYEE,
    payload: id
})

export const getEmployees = () =>{
    return async dispatch =>{
        try {
            const employees = await api.call('get',`employees`);
            dispatch(setEmployees(employees));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserEmployee = () =>{
   return async dispatch =>{
       try {
        const employees = await api.call('get','employees/user');
        dispatch(setEmployees(employees));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getCurrentEmployee = (id) =>{
    return async dispatch =>{
        try {
            const employee = await api.call('get',`employees/${id}`);
            dispatch(setCurrentEmployee(employee));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  

export const createEmployee = (data, history) =>{
    return async dispatch =>{
        try {
            const employee = await api.call('post','employees', data);
            dispatch(setCurrentEmployee(employee));
            dispatch(removeError());
            history.push('/app/employees');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateEmployee = (id, data, history) =>{
    return async dispatch =>{
        try {
            const employee = await api.call('post',`employees/${id}`, data);
            dispatch(setCurrentEmployee(employee));
            dispatch(removeError());
            history.push('/app/employees');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}

export const removeEmployee = (id) =>{
    return async dispatch =>{
        try {
            const employee = await api.call('delete',`employees/${id}`);
            dispatch(deleteEmployee(id));
            dispatch(removeError());

        } catch (error) {
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  