import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Grid, TextField} from "@material-ui/core";




//redux
import { createWard, getcurrentWard, updateWard} from '../../store/actions/ward';

import PageTitle from "../PageTitle";
import Widget from "../Widget";

class AddEditWard extends Component {

    constructor(props){
        super(props);
        this.state = {
            page:'ADD',
            wardName:'',
        }
    }

    async componentDidMount(){
        try {
           
            if(this.props.location.pathname.includes("new"))
             this.setState({page : 'ADD'})
             else{
               this.setState({page:'UPDATE'});
               const getcurrentWard = this.props.getcurrentWard;
               await getcurrentWard(this.props.match.params.id);
               this.setState(this.props.ward);

             }

        } catch (error) {
            
        }

        
    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.id]:event.target.value
      })
    }

    addWard = (event) =>{
      if(this.state.page === 'ADD')
        this.props.createWard(this.state, this.props.history);
       else
         this.props.updateWard(this.props.match.params.id, this.state, this.props.history); 
     
    }

    render(){

        return (

          <div>
              <PageTitle title="Ward"/>
              <Grid item lg={10} md={10} sm={12} xs={12}>

              <Widget title="Add New Ward" upperTitle>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="wardName"
            name="wardName"
            label="Ward"
            fullWidth
            autoComplete="ward"
            value={this.state.wardName}
            onChange={this.handleInputChange}
          />
        </Grid>
        <Grid container spacing={3} style={{margin:'10px 0px'}} alignItems="flex-start" justify="flex-end" direction="row">
          <Button variant="contained" style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}
 >CLEAR</Button>
          
          <Button variant="contained" color="secondary" onClick={this.addWard}>{this.state.page} Ward</Button>
        </Grid>

        

      </Grid>
      </Widget>
      </Grid>
          </div>   

        )
    }
}

export default connect (store =>({ward:store.currentWard}), { getcurrentWard, createWard, updateWard } )(AddEditWard);


