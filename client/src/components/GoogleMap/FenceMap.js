import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const styles = theme => ({
    mapContainer: {
        height: "100%",
        width:'100%',
      },
  });

  var map;
  var marker = [];

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
      var lat_lng = {lat: 22.08672, lng: 79.42444};       

        var mapOptions = {
            center: lat_lng,
            zoom: 15,
            disableDefaultUI: false,
            
        };
      
      map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
      var addMarker = new window.google.maps.Marker({
        position: lat_lng,
        map: map,
        draggable: true,
      });  
      var cityCircle = new window.google.maps.Circle({      
        strokeColor: '#FF0000',      
        strokeOpacity: 0.8,      
        strokeWeight: 2,      
        fillColor: '#FF0000',      
        fillOpacity: 0.35,      
        map: map,      
        center: lat_lng,      
        radius: 200,    
      });  

      window.google.maps.event.addListener(addMarker, 'drag', (function(){
        lat_lng = addMarker.getPosition();
        var lat = addMarker.getPosition().lat();
        var lng = addMarker.getPosition().lng();
        cityCircle.setCenter(lat_lng);
        this.props.handleFenceChange(lat, lng)
    }).bind(this));

      this.setState({loaded:true})

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


 

export default connect(store=>({vehicles:store.liveVehicles }))(withStyles(styles)(VehicleDetails));

