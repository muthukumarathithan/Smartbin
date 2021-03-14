import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
//redux
import {setMapView} from '../../store/actions';

class HistoryForm extends Component {

    constructor(props){
        super(props);
        this.state = {
          start_time:moment().subtract(1,'day'),
          end_time:moment(),
          Date:new Date(),
             }
    }

    handleStartDateChange = (date) =>{
      this.setState({start_time:date})
    }
   
    handleEndDateChange = (date) =>{
      this.setState({end_time:date})
    }

     showHistory = (event) =>{
       event.preventDefault();
       const data = {
         start_time:this.state.start_time,
         end_time:this.state.end_time,
         device_id:this.props.vehicle.device_id
       }
       this.props.setMapView(3, data);
      
    }

    render(){

       return (

     <Grid container spacing={3} >
                 <Grid item lg={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                     value={this.state.start_time}
                      onChange={this.handleStartDateChange}
                      label="Start Date"
                      format={"dd-MM-yyyy hh:mm:ss"} 

                       />
                   </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item lg={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                     value={this.state.end_time}
                      onChange={this.handleEndDateChange}
                      label="End Date"
                      format={"dd-MM-yyyy hh:mm:ss"} 

                       />
                   </MuiPickersUtilsProvider>
                  </Grid>  
      
     

        
        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="center" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.showHistory}>SHOW HISTORY</Button>
        </Grid>
      </Grid>
        )
    }
}

export default connect (null, {setMapView } )(HistoryForm);



