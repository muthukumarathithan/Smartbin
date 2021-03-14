import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import DistrictList from '../../components/District/DistrictList';
import AddEditDistrict from '../../components/District/AddEditDistrict';


const District = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/district' component={DistrictList}></Route>
            <Route exact path='/app/district/new' component={AddEditDistrict}></Route>
            <Route exact path='/app/district/edit/:id' component={AddEditDistrict}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(District);
