import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import VehicletypeList from '../../components/Vehicletype/VehicletypeList';
import AddEditVehicletype from '../../components/Vehicletype/AddEditVehicletype';


const Vehicletype = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/vehicletype' component={VehicletypeList}></Route>
            <Route exact path='/app/vehicletype/new' component={AddEditVehicletype}></Route>
            <Route exact path='/app/vehicletype/edit/:id' component={AddEditVehicletype}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Vehicletype);
