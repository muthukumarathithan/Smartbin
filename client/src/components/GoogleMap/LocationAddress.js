import React, {Component} from 'react';
import {connect} from 'react-redux';

//redux
import {getLiveAddress} from '../../store/actions/';

class LocationAddress extends Component{
    constructor(props){
        super(props);
        this.state = {
            address:''
        }
    }

    async componentDidMount(){
        try {
            const getAddress = this.props.getLiveAddress;
            const data = {
                lat:this.props.lat,
                lng:this.props.lng
            }
            await getAddress(data);
           } catch (error) {
            alert(error)            
        }
   }

   render(){
       return(
           <React.Fragment>
               {this.props.address}
           </React.Fragment>
       )
   }
}

export default connect (store =>({address:store.getLiveAddress}), {getLiveAddress } )(LocationAddress);


