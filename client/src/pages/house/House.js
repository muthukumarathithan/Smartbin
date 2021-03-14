import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import HouseList from '../../components/House/HouseList';
import AddEditHouse from '../../components/House/AddEditHouse';


const House = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/house' component={HouseList}></Route>
            <Route exact path='/app/house/new' component={AddEditHouse}></Route>
            <Route exact path='/app/house/edit/:id' component={AddEditHouse}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(House);
