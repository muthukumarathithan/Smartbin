import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";




//redux
import { createDistrict, getcurrentDistrict, updateDistrict} from '../../store/actions/district';

import PageTitle from "../PageTitle";
import Widget from "../Widget";

class AddEditDistrict extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'ADD',
            district:'',
        }
    }

    async componentDidMount(){
        try {
           
            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getcurrentDistrict = this.props.getcurrentDistrict;
               await getcurrentDistrict(this.props.match.params.id);
               this.setState(this.props.district);

             }

        } catch (error) {
            
        }

        
    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.id]:event.target.value
      })
    }

    addDistrict = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createDistrict(this.state, this.props.history);
       else
         this.props.updateDistrict(this.props.match.params.id, this.state, this.props.history); 
     
    }

    render(){

        return (

          <div>
              <PageTitle title="District"/>
              <Grid item lg={10} md={10} sm={12} xs={12}>

              <Widget
            title="Add New District"
            upperTitle
           
          >

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="district"
            name="district"
            label="District"
            fullWidth
            autoComplete="district"
            value={this.state.district}
            onChange={this.handleInputChange}
          />
        </Grid>
        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="flex-end" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.addDistrict}>{this.state.page} District</Button>
        </Grid>

        

      </Grid>
      </Widget>
      </Grid>
          </div>   

        )
    }
}

export default connect (store =>({district:store.currentDistrict}), { getcurrentDistrict, createDistrict, updateDistrict } )(AddEditDistrict);


