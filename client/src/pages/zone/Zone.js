import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import ZoneList from '../../components/Zone/ZoneList';
import AddEditZone from '../../components/Zone/AddEditZone';


const Zone = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/zone' component={ZoneList}></Route>
            <Route exact path='/app/zone/new' component={AddEditZone}></Route>
            <Route exact path='/app/zone/edit/:id' component={AddEditZone}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Zone);
