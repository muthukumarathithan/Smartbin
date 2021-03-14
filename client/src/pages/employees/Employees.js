import React from "react";
import { Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  withRouter, 
} from "react-router-dom";

// components
import EmployeeList from '../../components/Employees/EmployeeList';
import AddEditEmployee from '../../components/Employees/AddEditEmployee';


const Employees = (props) =>{
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/app/employees' component={EmployeeList}></Route>
            <Route exact path='/app/employees/new' component={AddEditEmployee}></Route>
            <Route exact path='/app/employees/edit/:id' component={AddEditEmployee}></Route>
          </Switch>
        </Grid>
       </Grid>
    </>
  );
}

export default withRouter(Employees);
