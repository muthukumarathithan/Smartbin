import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";

//redux
import { createVehicletype, getcurrentVehicletype, updateVehicletype} from '../../store/actions/vehicletype';

import PageTitle from "../PageTitle";
import Widget from "../Widget";

class AddEditVehicletype extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'ADD',
            vehicletype:'',
        }
        console.log(this.state)
    }

    async componentDidMount(){
        try {
           
            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getcurrentVehicletype = this.props.getcurrentVehicletype;
               await getcurrentVehicletype(this.props.match.params.id);
               this.setState(this.props.vehicletype);

             }

        } catch (error) {
            
        }

        
    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.id]:event.target.value
      })
    }

    addVehicletype = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createVehicletype(this.state, this.props.history);
       else
         this.props.updateVehicletype(this.props.match.params.id, this.state, this.props.history); 
     
    }

    render(){

        return (

          <div>
              <PageTitle title="Vehicle Type"/>
              <Grid item lg={10} md={10} sm={12} xs={12}>

              <Widget title="Add New Vehicle Type" upperTitle>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="vehicletype"
            name="vehicletype"
            label="Vehicle Type"
            fullWidth
            autoComplete="vehicletype"
            value={this.state.vehicletype}
            onChange={this.handleInputChange}
          />
        </Grid>
        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="flex-end" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.addVehicletype}>{this.state.page} Vehicle Type</Button>
        </Grid>

        

      </Grid>
      </Widget>
      </Grid>
          </div>   

        )
    }
}

export default connect (store =>({vehicletype:store.currentVehicletype}), { getcurrentVehicletype, createVehicletype, updateVehicletype } )(AddEditVehicletype);


