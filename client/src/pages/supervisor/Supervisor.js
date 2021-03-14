import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import SupervisorList from '../../components/Supervisor/SupervisorList';
import AddEditSupervisor from '../../components/Supervisor/AddEditSupervisor';


const Supervisor = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/supervisor' component={SupervisorList}></Route>
            <Route exact path='/app/supervisor/new' component={AddEditSupervisor}></Route>
            <Route exact path='/app/supervisor/edit/:id' component={AddEditSupervisor}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Supervisor);
