import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//redux
import {getBin} from '../../store/actions/';


const styles = theme => ({
    mapContainer: {
        height: "100%",
        width:'100%',
      },
      mapWithDetails: {
        height: "40%",
        width:'100%',
      }  

  });

  var map;
  var marker;
  var bin_marker = [];

class VehicleDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            zoom:14,
            vehicle:{},
            loaded:false
        }
    }

   async componentDidMount(){
      await  this.props.getBin();
      var mapOptions = {
          center:{
                  lat:17.445517,
                  lng:78.397767
                 },
          zoom: 14,
          disableDefaultUI: false,
          
      };
    map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
    marker = new window.google.maps.Marker({
      position: {
        lat:17.445517,
        lng:78.397767
       },
      map: map,
    });
    this.setState({loaded:true});
    this.props.bins.map((bin, index)=>{
      bin_marker[index] = new window.google.maps.Marker({
        position: {
          lat:bin.latitude,
          lng:bin.longitude
         },
         icon:{
          url: `static/media/vehicles/Ambulance/bin.png`,
        },
        map: map,
        title: bin.binName
      });
    })
  }

    static getDerivedStateFromProps(props, state) {
        if ( state.loaded && Object.keys(props.vehicle).length !== 0 && 
        JSON.stringify(props.vehicle) !== JSON.stringify(state.vehicle)  ) {
 
             marker.setPosition(new window.google.maps.LatLng(props.vehicle.latitude, props.vehicle.longitude))
             marker.setIcon({
               url: `static/media/vehicles/Ambulance/${props.vehicle.status}.png`, 
               anchor: new window.google.maps.Point(33,33),
             })
  
         map.setCenter(new window.google.maps.LatLng(props.vehicle.latitude, props.vehicle.longitude));
         return {
           vehicle: props.vehicle,
         };
      }
 


      return null;
    }

    render(){
        const { classes } = this.props;
        return(
                   <div id="map" className={classes.mapWithDetails} ref="map"/>
        )
    }
}

VehicleDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };

 

export default connect(store=>({vehicle:store.liveVehicle ,bins:store.bins}),{getBin})(withStyles(styles)(VehicleDetails));

