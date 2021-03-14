import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";

//redux
import { createFence, getCurrentFence, updateFence, getDevices} from '../../store/actions';

//Component
import PageTitle from "../PageTitle";
import Widget from "../Widget";
import FenceMap from "../GoogleMap/FenceMap";
import GooglePlace from "../GoogleMap/GooglePlaces";

class AddEditFence extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'Add',
            lng:'',
            lat:'',
            fence_name:'',
            mobile_no:'',
            radius:''
          
             }
    }

    

    async componentDidMount(){
        try {

            this.props.getDevices();
            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getCurrentFence = this.props.getCurrentFence;
               await getCurrentFence(this.props.match.params.id);
               this.setState(this.props.fence);

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

    addFence = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createFence(this.state, this.props.history);
       else
         this.props.updateFence(this.props.match.params.id, this.state, this.props.history); 
     
    }

    handleFenceChange = (lat, lng) =>{
      this.setState({lat, lng});
    }

    

    render(){

      const devices = {
        options: this.props.devices,
        getOptionLabel: (option) => option.device_id,
      };

       return (

           <div>
              <PageTitle title="Fences"/>
               <Grid item lg={12} md={12} sm={12} xs={12}>
                <Widget title="Add New Fence" upperTitle>
                 <Grid container spacing={3} lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={1} item lg={4} md={4} sm={4} xs={12}>
                    <Grid item xs={12} sm={10}>
                      <GooglePlace />
                      </Grid>
                      <Grid item xs={12} sm={10}>
                        <TextField
                          required
                          id="fence_name"
                          name="fence_name"
                          label="Fence Name"
                          fullWidth
                          autoComplete="fence_name"
                          value={this.state.fence_name}
                          onChange={this.handleInputChange}
                        />
                       </Grid>
                       <Grid item xs={12} sm={10}>
                        <TextField
                          required
                          id="lat"
                          name="lat"
                          label="Latitute"
                          fullWidth
                          autoComplete="lat"
                          value={this.state.lat}
                          onChange={this.handleInputChange}
                        />
                       </Grid>
                       <Grid item xs={12} sm={10}>
                        <TextField
                          required
                          id="lng"
                          name="lng"
                          label="Longitude"
                          fullWidth
                          autoComplete="lng"
                          value={this.state.lng}
                          onChange={this.handleInputChange}
                        />
                       </Grid>
                       <Grid item xs={12} sm={10}>
                        <TextField
                          required
                          id="mobile_no"
                          name="mobile_no"
                          label="Mobile No"
                          fullWidth
                          autoComplete="mobile_no"
                          value={this.state.mobile_no}
                          onChange={this.handleInputChange}
                        />
                       </Grid>
                       <Grid container lg={10} spacing={3} style={{margin:'20px 0px'}} alignItems="flex-start" justify="flex-end" >
                          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
                           >CLEAR</Button>
                          <Button variant="contained" color="secondary" onClick={this.addFence}>{this.state.page} Fence</Button>
                      </Grid>
                    </Grid>
                  <Grid item lg={8} md={8} sm={8} xs={12} style={{minHeight:'70vh'}}>
                     <FenceMap handleFenceChange = {this.handleFenceChange}/>
                  </Grid>  
                 </Grid>

               </Widget>
               </Grid>
          </div>   

        )
    }
}


export default connect (store =>({devices:store.devices, fence:store.currentFence }), { getDevices ,getCurrentFence, createFence, updateFence } )(AddEditFence);
