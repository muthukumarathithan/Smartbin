import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

//redux
import { createDriver, getCurrentDriver, updateDriver} from '../../store/actions/drivers';

import PageTitle from "../PageTitle";
import Widget from "../Widget";

class AddEditDriver extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'ADD',
            firstName:'',
            lastName:'',
            mobile:'',
            email:'',
            dob:moment(),
            valid:moment(),
            employee_code:'',
            license_no:'',
            address:{
              line1:'',
              line2:'',
              city:'',
              state:'',
              zip:'',
              country:''
            },
        
        }
    }


    async componentDidMount(){
        try {
           
            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getCurrentDriver = this.props.getCurrentDriver;
               await getCurrentDriver(this.props.match.params.id);
               this.setState(this.props.driver);

             }

        } catch (error) {
            
        }

        
    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.id]:event.target.value
      })
    }

    handleAddressChange = (event) => {
      var {address} = this.state;
      address[event.target.id] = event.target.value;
      this.setState({
        address
      })
    }

    addDriver = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createDriver(this.state, this.props.history);
       else
         this.props.updateDriver(this.props.match.params.id, this.state, this.props.history); 
     
    }

    handleValidChange = (date) =>{
      this.setState({valid:date})
    }

    handleDobChange = (date) =>{
      this.setState({dob:date})
    }

    

    render(){

        return (

          <div>
              <PageTitle title="Drivers"/>
              <Grid item lg={10} md={10} sm={12} xs={12}>

              <Widget
            title="Add New Driver"
            upperTitle
           
          >

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            value={this.state.lastName}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="employee_code"
            name="employee_code"
            label="Employee Code"
            fullWidth
            autoComplete="employee_code"
            value={this.state.employee_code}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                     value={this.state.dob}
                      onChange={this.handleDobChange}
                      label="Date of Birth"
                      format={"dd-MM-yyyy"} 
                      fullWidth
                       />
                   </MuiPickersUtilsProvider>
                  </Grid>

         <Grid item xs={12} sm={6}>
          <TextField
            required
            id="license_no"
            name="license_no"
            label="License Number"
            fullWidth
            autoComplete="license_no"
            value={this.state.license_no}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                     value={this.state.valid}
                      onChange={this.handleValidChange}
                      label="License Valid Upto"
                      format={"dd-MM-yyyy"} 
                      fullWidth
                       />
                   </MuiPickersUtilsProvider>
                  </Grid>
          

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobile"
            name="mobile"
            label="Mobile No"
            fullWidth
            autoComplete="mobile"
            value={this.state.mobile}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            value={this.state.email}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="line1"
            name="line1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            value={this.state.address.line1}
            onChange={this.handleAddressChange}


          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="line2"
            name="line2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            value={this.state.address.line2}
            onChange={this.handleAddressChange}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            value={this.state.address.city}
            onChange={this.handleAddressChange}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state"
           name="state" 
           label="State/Province/Region" 
           fullWidth
           onChange={this.handleAddressChange}
           value={this.state.address.state}

            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            value={this.state.address.zip}
            onChange={this.handleAddressChange}


          />
        </Grid>

        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="flex-end" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.addDriver}>{this.state.page} DRIVER</Button>
        </Grid>

        

      </Grid>
      </Widget>
      </Grid>
          </div>   

        )
    }
}

export default connect (store =>({driver:store.currentDriver}), { getCurrentDriver, createDriver, updateDriver } )(AddEditDriver);


