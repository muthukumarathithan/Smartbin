import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

//redux
import { createHouse, getcurrentHouse, updateHouse, getWard} from '../../store/actions';

import PageTitle from "../PageTitle";
import Widget from "../Widget";

class AddEditHouse extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'ADD',
            wardName:'',
            houseowner:'',
            mobile:'',
           address:{
              line1:'',
              line2:'',
              city:'',
              state:'',
              zip:'',
              country:''
            },
             ward:'',
        }
    }

    async componentDidMount(){
        try {
           
            this.props.getWard();
            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getcurrentHouse = this.props.getcurrentHouse;
               await getcurrentHouse(this.props.match.params.id);
               this.setState(this.props.house);

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

    addHouse = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createHouse(this.state, this.props.history);
       else
         this.props.updateHouse(this.props.match.params.id, this.state, this.props.history); 
     
    }

    render(){

       const ward = {
        options: this.props.ward,
        getOptionLabel: (option) => option.wardName,
      };

        return (

          <div>
              <PageTitle title="House"/>
              <Grid item lg={10} md={10} sm={12} xs={12}>

              <Widget title="Add New House" upperTitle>

      <Grid container spacing={3}>
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
            id="mobile"
            name="mobile"
            label="Mobile No"
            fullWidth
            autoComplete="mobile"
            value={this.state.mobile}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="houseowner"
            name="houseowner"
            label="houseowner"
            fullWidth
            autoComplete="House Owner"
            value={this.state.houseowner}
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
            autoComplete="line1"
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
            autoComplete="line2"
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
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            value={this.state.address.country}
            onChange={this.handleAddressChange}
          />
        </Grid>
        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="flex-end" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.addHouse}>{this.state.page} House</Button>
        </Grid>

        

      </Grid>
      </Widget>
      </Grid>
          </div>   

        )
    }
}

export default connect (store =>({house:store.currentHouse,ward:store.ward}), { getcurrentHouse, createHouse, updateHouse,getWard } )(AddEditHouse);


