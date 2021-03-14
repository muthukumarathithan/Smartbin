import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import DriverList from '../../components/Drivers/DriverList';
import AddEditDriver from '../../components/Drivers/AddEditDriver';


const Drivers = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/drivers' component={DriverList}></Route>
            <Route exact path='/app/drivers/new' component={AddEditDriver}></Route>
            <Route exact path='/app/drivers/edit/:id' component={AddEditDriver}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Drivers);
