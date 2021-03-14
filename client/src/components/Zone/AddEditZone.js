import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';




//redux
import { createZone, getcurrentZone, updateZone,getDistrict} from '../../store/actions';

import PageTitle from "../PageTitle";
import Widget from "../Widget";

class AddEditZone extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'ADD',
            zoneName:'',
            district:'',
            operation:'',
        }
    }

    async componentDidMount(){
        try {

            this.props.getDistrict();

            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getcurrentZone = this.props.getcurrentZone;
               await getcurrentZone(this.props.match.params.id);
               this.setState(this.props.zone);

             }

        } catch (error) {
            
        }

        
    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.id]:event.target.value
      })
    }

    addZone = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createZone(this.state, this.props.history);
       else
         this.props.updateZone(this.props.match.params.id, this.state, this.props.history); 
     
    }



    

    render(){

       const district = {
        options: this.props.district,
        getOptionLabel: (option) => option.district,
      };
        return (

          <div>
              <PageTitle title="Zones"/>
              <Grid item lg={10} md={10} sm={12} xs={12}>

              <Widget
            title="Add New Zone"
            upperTitle>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zoneName"
            name="zoneName"
            label="Zone Name"
            fullWidth
            autoComplete="zoneName"
            value={this.state.zoneName}
            onChange={this.handleInputChange}
          />
        <Grid item xs={12} sm={6}>
          <Autocomplete
          id="district"
          name="district"
          {...district}
          value={this.state.district}
          onChange={(event, newValue) => {
            this.setState({district:newValue});
          }}
          renderInput={(params) => <TextField {...params} label="District" margin="normal" />}
        />
        </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="operation"
            name="operation"
            label="Operation"
            fullWidth
            autoComplete="operation"
            value={this.state.operation}
            onChange={this.handleInputChange}

          />
        </Grid>
        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="flex-end" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.addZone}>{this.state.page} Zones</Button>
        </Grid>

        

      </Grid>
      </Widget>
      </Grid>
          </div>   

        )
    }
}

export default connect (store =>({district:store.district,zone:store.currentZone}), { getcurrentZone, createZone, updateZone,getDistrict } )(AddEditZone);





