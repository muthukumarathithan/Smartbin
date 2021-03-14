import {SET_HOUSE, SET_CURRENT_HOUSE, REMOVE_HOUSE} from '../actionTypes';
import api from '../../services/api';
import { addError, removeError } from './error';
import { setCurrentUser } from './auth';

 export const setHouse = house =>(
    {
        type:SET_HOUSE,
        house   
 })
 
 export const setcurrentHouse = house =>({
        type:SET_CURRENT_HOUSE,
        house
})

export const deleteHouse = (id) => ({
    type: REMOVE_HOUSE,
    payload: id
})

export const getHouse = () =>{
    return async dispatch =>{
        try {
            const house = await api.call('get',`house`);
            dispatch(setHouse(house));
            dispatch(removeError()) 
        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
         }

    }
}

export const getUserHouse = () =>{
   return async dispatch =>{
       try {
        const house = await api.call('get','house/user');
        dispatch(setHouse(house));
        dispatch(removeError());
       } catch (error) {
           const err = error.response.data.err;
           dispatch(addError(err));
       }

   }
  }

export const getcurrentHouse = (id) =>{
    return async dispatch =>{
        try {
            const house = await api.call('get',`house/${id}`);
            dispatch(setcurrentHouse(house));
            dispatch(removeError());

        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  

export const createHouse = (data, history) =>{
    return async dispatch =>{
        try {
            const house = await api.call('post','house', data);
            dispatch(setcurrentHouse(house));
            dispatch(removeError());
            history.push('/app/house');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}  


export const updateHouse = (id, data, history) =>{
    return async dispatch =>{
        try {
            const house = await api.call('post',`house/${id}`, data);
            dispatch(setcurrentHouse(house));
            dispatch(removeError());
            history.push('/app/house');  


        } catch (error) {
            const err = error.response.data.err;
            dispatch(addError(err));
        }
    }
}

export const removeHouse= (id) =>{
    return async dispatch =>{
        try {
            const house = await api.call('delete',`house/${id}`);
            dispatch(deleteHouse(id));
            dispatch(removeError());

        } catch (error) {
             const err = error.response.data.err;
             dispatch(addError(err));
        }
    }
}  