import {combineReducers} from 'redux';
import error from './error';
import auth from './auth';
import {customers, currentCustomer} from './customers';
import {drivers, currentDriver} from './drivers';
import {dealers, currentDealer} from './dealers';
import {distributors, currentDistributor} from './distributors';
import {devices, currentDevice} from './devices';
import {vehicles, currentVehicle} from './vehicles';
import {fences, currentFence} from './fences';
import {zone,currentZone} from './zone';
import {district,currentDistrict} from './district';
import {ward,currentWard} from './ward';
import {vehicletype,currentVehicletype} from './vehicletype';
import {house,currentHouse} from './house';
import {supervisor,currentSupervisor} from './supervisor';
import {employees,currentEmployee} from './employees';
import {liveVehicles, vehicleStatus, liveVehicle, address} from './sockets';
import {views, history} from './views';
import {bins, currentBin} from './bins';

export default combineReducers ({
    auth,
    error,
    customers,
    currentCustomer,
    drivers,
    currentDriver,
    dealers,
    currentDealer,
    distributors,
    currentDistributor,
    devices,
    currentDevice,
    vehicles,
    currentVehicle,
    liveVehicles,
    vehicleStatus,
    liveVehicle,
    address,
    fences,
    currentFence,
    views,
    history,
    bins,
    currentBin,
    zone,
    currentZone,
    district,
    currentDistrict,
    ward,
    currentWard,
    vehicletype,
    currentVehicletype,
    house,
    currentHouse,
    supervisor,
    currentSupervisor,
    employees,
    currentEmployee
})