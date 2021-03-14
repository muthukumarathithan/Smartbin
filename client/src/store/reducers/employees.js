import {SET_EMPLOYEES, SET_CURRENT_EMPLOYEE, REMOVE_EMPLOYEE} from '../actionTypes';

export const employees = (state = [], action) =>{
    switch(action.type){
        case SET_EMPLOYEES:
            return action.employees;
        case REMOVE_EMPLOYEE:
            var state = state.filter((item) => item._id !== action.payload);
            return state;     
        default:
            return state;     
 
    }


}

export const currentEmployee = (state = {}, action) =>{
    switch(action.type){
        case SET_CURRENT_EMPLOYEE:
            return action.employee
        default:
            return state;     
    
    }
    
    
    }