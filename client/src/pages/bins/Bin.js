import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import BinList from '../../components/Bins/BinList';
import AddEditBin from '../../components/Bins/AddEditBin';


const Bins = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/bins' component={BinList}></Route>
            <Route exact path='/app/bins/new' component={AddEditBin}></Route>
            <Route exact path='/app/bins/edit/:id' component={AddEditBin}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Bins);
