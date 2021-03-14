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
  });

  var map;
  var marker = [];
  var bin_marker = [];

class VehicleDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            zoom:14,
            vehicles:[],
            state:false
        }
    }

    async componentDidMount(){
      await  this.props.getBin();

        var mapOptions = {
            center:{
                    lat:13.00377,
                    lng:80.20275
                   },
            zoom: 14,
            disableDefaultUI: false,
            
        };

      map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
      this.setState({loaded:true})
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
      if(state.loaded && state.vehicles.length === 0){
        props.vehicles.map((vehicle, index)=>{
          marker[index] = new window.google.maps.Marker({
            position: {
              lat:vehicle.latitude,
              lng:vehicle.longitude
             },
             icon:{
              url: `static/media/vehicles/Ambulance/${vehicle.status}.png`,
            },
            map: map,
            title: vehicle.vehicle_reg_no
          });
        })
        return{
          vehicles:props.vehicles
        }
      }
        if (state.loaded && props.vehicles.length !== 0 && 
          JSON.stringify(props.vehicles) !== JSON.stringify(state.vehicles)  ) {
             props.vehicles.map((vehicle, index )=>{
               marker[index].setPosition(new window.google.maps.LatLng(vehicle.latitude, vehicle.longitude))
               marker[index].setIcon({
                 url: `static/media/vehicles/Ambulance/${vehicle.status}.png`, 
                 anchor: new window.google.maps.Point(33,33),
               })
             })
               
            return {
             vehicles: props.vehicles,
           };
         }


      return null;
    }

    render(){
        const { classes } = this.props;
        return(
                   <div id="map" className={classes.mapContainer} ref="map"/>
        )
    }
}

VehicleDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  VehicleDetails.defaultProps = {
    vehicles:[]
  }


 

export default connect(store=>({vehicles:store.liveVehicles, bins:store.bins }),{getBin})(withStyles(styles)(VehicleDetails));

