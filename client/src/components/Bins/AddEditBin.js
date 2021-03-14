import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


//redux
import { createBin, getcurrentBin, updateBin, getWard,getVehicles} from '../../store/actions';

import PageTitle from "../PageTitle";
import Widget from "../Widget";

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

class AddEditBin extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'ADD',
            binId:'',
            binName:'',
            latitude:'',
            longitude:'',
            gpsDeviceId:'',
            maxCapacity:'',
            address:'',
            quantity:'',
            ward:'',
            bintype:'',
            bincategory:'',
            rfid1:'',
            rfid2:'',
            rfid3:'',
            vehicle:'',
        }
    }



    async componentDidMount(){
        try {
           
            this.props.getWard();
            this.props.getVehicles();
            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getcurrentBin = this.props.getcurrentBin;
               await getcurrentBin(this.props.match.params.id);
               this.setState(this.props.bin);

             }

        } catch (error) {
            
        }

        
    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.id]:event.target.value
      })
    }

    addBin = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createBin(this.state, this.props.history);
       else
         this.props.updateBin(this.props.match.params.id, this.state, this.props.history); 
     
    }

    render(){
              
        const ward = {
        options: this.props.ward,
        getOptionLabel: (option) => option.wardName,
      };
      const vehicles = {
        options: this.props.vehicles,
        getOptionLabel: (option) => option.vehicle_reg_no,
      };
        return (

          <div>
              <PageTitle title="Bins"/>
              <Grid item lg={10} md={10} sm={12} xs={12}>

              <Widget
            title="Add New Bin"
            upperTitle
           
          >

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="binId"
            name="binId"
            label="Bin No"
            fullWidth
            autoComplete="binNo"
            value={this.state.binId}
            onChange={this.handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="latitude"
            name="latitude"
            label="Latitude"
            fullWidth
            autoComplete="latitude"
            value={this.state.latitude}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="binName"
            name="binName"
            label="Bin Name"
            fullWidth
            autoComplete="binName"
            value={this.state.binName}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="longitude"
            name="longitude"
            label="Longitude"
            fullWidth
            autoComplete="longitude"
            value={this.state.longitude}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="gpsDeviceId"
            name="gpsDeviceId"
            label="Gps Device Id"
            fullWidth
            autoComplete="gpsDeviceId"
            value={this.state.gpsDeviceId}
            onChange={this.handleInputChange}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="maxCapacity"
           name="maxCapacity" 
           label="Max Capacity" 
          fullWidth
          autoComplete="maxCapacity"
           onChange={this.handleInputChange}
           value={this.state.maxCapacity}

            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address"
            name="address"
            label="Location"
            fullWidth
            autoComplete="address"
            value={this.state.address}
            onChange={this.handleInputChange}


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="quantity"
            name="quantity"
            label="Quantity"
            fullWidth
            autoComplete="quantity"
            value={this.state.quantity}
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
        <Autocomplete
            {...vehicles}
          name="vehicle"
          label="Vehicle Reg No"
          id="vehicle"
          value={this.state.vehicle}
          onChange={(event, newValue) => {
            this.setState({vehicle:newValue});
          }}
          renderInput={(params) => <TextField {...params} label="Vehicle" margin="normal" />}
        />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rfid1"
            name="rfid1"
            label="RFID1"
            fullWidth
            autoComplete="rfid1"
            value={this.state.rfid1}
            onChange={this.handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rfid2"
            name="rfid2"
            label="RFID2"
            fullWidth
            autoComplete="rfid2"
            value={this.state.rfid2}
            onChange={this.handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rfid3"
            name="rfid3"
            label="RFID3"
            fullWidth
            autoComplete="rfid3"
            value={this.state.rfid3}
            onChange={this.handleInputChange}
          />
        </Grid>
         
        <Grid item xs={12} sm={6}>
         <InputLabel id="demo-simple-select-label">Bin Type</InputLabel>
        <Select
          native
          id="bintype"
          name="bintype"   
          label="Bin Type"
          value={this.state.bintype}
          onChange={this.handleInputChange}
        >
          <option aria-label="None" value="" />
           <option>*************Please Select Bin Type**************</option>
          <option value={1}>B-BIN</option>
          <option value={2}>E-RIKS BIN</option>
          <option value={3}>HOUSE</option>
        </Select>
          
        </Grid>
        <Grid item xs={12} sm={6}>
         <InputLabel id="demo-simple-select-label">Bin Category</InputLabel>
      <Select 
          native
          minWidth="100"
          id="bincategory"
          name="bincategory"   
          label="Bin Category"
          value={this.state.bincategory}
          onChange={this.handleInputChange}
        >
         <option aria-label="None" value="" />
          <option>*************Please Select Bin Category**************</option>
          <option value={1}>Wet</option>
          <option value={2}>DRY</option>
        </Select>
        </Grid>
        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="flex-end" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.addBin}>{this.state.page} Bin</Button>
        </Grid>
      </Grid>
      </Widget>
      </Grid>
          </div>   

        )
    }
}

export default connect (store =>({bin:store.currentBin,ward:store.ward,vehicles:store.vehicles}), { getcurrentBin, createBin, updateBin,getWard,getVehicles } )(AddEditBin);


