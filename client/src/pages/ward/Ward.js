import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import WardList from '../../components/Ward/WardList';
import AddEditWard from '../../components/Ward/AddEditWard';


const Ward = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/ward' component={WardList}></Route>
            <Route exact path='/app/ward/new' component={AddEditWard}></Route>
            <Route exact path='/app/ward/edit/:id' component={AddEditWard}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Ward);
