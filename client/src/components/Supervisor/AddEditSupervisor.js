import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

//redux
import { createSupervisor, getcurrentSupervisor, updateSupervisor,getWard} from '../../store/actions';

import PageTitle from "../PageTitle";
import Widget from "../Widget";

class AddEditSupervisor extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'ADD',
            ward:'',
            supervisorName:'',
            mobile:'',
            GPSDeviceId:''
        }
    }

    async componentDidMount(){
        try {
              this.props.getWard();
           
            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getcurrentSupervisor = this.props.getcurrentSupervisor;
               await getcurrentSupervisor(this.props.match.params.id);
               this.setState(this.props.supervisor);

             }
             console.log(getWard());

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

    addSupervisor = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createSupervisor(this.state, this.props.history);
       else
         this.props.updateSupervisor(this.props.match.params.id, this.state, this.props.history); 
     
    }

    render(){
           const ward = {
        options: this.props.ward,
        getOptionLabel: (option) => option.wardName,
      };
        return (

          <div>
              <PageTitle title="Supervisor"/>
              <Grid item lg={10} md={10} sm={12} xs={12}>

              <Widget title="Add New Supervisor" upperTitle>

      <Grid container spacing={3}>
         <Grid item xs={12} sm={6}>
        <TextField
            required
            id="supervisorName"
            name="supervisorName"
            label="Supervisor Name"
            fullWidth
            autoComplete="supervisorName"
            value={this.state.supervisorName}
            onChange={this.handleInputChange}

          />
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
          <Autocomplete
            {...ward}
          name="ward"
          label="Ward"
          id="ward"
          value={this.state.ward}
          onChange={(event, newValue) => {
            this.setState({ward:newValue});
          }}
          renderInput={(params) => <TextField {...params} label="Ward" margin="normal" />}
        />
        </Grid>
         <Grid item xs={12} sm={6}>
          <TextField
            required
            id="GPSDeviceId"
            name="GPSDeviceId"
            label="GPSDeviceId"
            fullWidth
            autoComplete="GPSDeviceId"
            value={this.state.GPSDeviceId}
             onChange={this.handleInputChange}
          />
        </Grid>
        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="flex-end" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.addSupervisor}>{this.state.page} Supervisor</Button>
        </Grid>

        

      </Grid>
      </Widget>
      </Grid>
          </div>   

        )
    }
}

export default connect (store =>({ward:store.ward,supervisor:store.currentSupervisor}), { getcurrentSupervisor, createSupervisor, updateSupervisor, getWard} )(AddEditSupervisor);


