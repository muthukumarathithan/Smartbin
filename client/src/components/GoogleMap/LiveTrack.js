import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//images
import amb from './images/vehicles/Ambulance/online.png';


const styles = theme => ({
    mapContainer: {
        height: "100%",
        width:'100%',
      },
  });

  var map;
  var marker;
  var test = 0;
  var k = 0;
  var p;
  var step = 5;
  var stepnum=0;
  var lastVertex = 0;
  var speed=50;
  var poly;
  var poly2;
  var angle;
  var path = [];
  var animation;
  var labelIndex;
  var flag = 0;
  var canvas;
  var context;
  var circle;
  var image = new Image();
  var history = [];

class LiveTrack extends Component{
    constructor(props){
        super(props);
        this.state = {
            zoom:14,
            history:[],
            loaded:false
        }
    }

     bearing = (lat1, lon1, lat2, lon2) => {
      var angle1 = - Math.atan2( Math.sin( lon1 - lon2 ) * Math.cos( lat2 ), Math.cos( lat1 ) * Math.sin( lat2 ) - Math.sin( lat1 ) * Math.cos( lat2 ) * Math.cos( lon1 - lon2 ) );
      if ( angle1 < 0.0 )
        angle1  += Math.PI * 2.0;
        return angle1;
      }

     plotcar = () =>{
      var cosa = Math.cos(angle);
      var sina = Math.sin(angle);
      context.clearRect(0,0,66,66);
      context.save();
      context.rotate(angle);
      context.translate(33*sina+33*cosa,33*cosa-33*sina);
      context.drawImage(image,-33,-33);
      context.restore();
      try {
        marker.setIcon({
            url :canvas.toDataURL(),
            anchor: new window.google.maps.Point(33,33),
          })
      } catch (e) {
        console.log('Naan thaan');
      }
      
      }

     rad = (x) => {
      return x * Math.PI / 180;
    };

     getDistance = (p1_lat, p1_long, p2_lat, p2_long) => {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = this.rad(p2_lat - p1_lat);
      var dLong = this.rad(p2_long - p1_long);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.rad(p1_lat)) * Math.cos(this.rad(p2_lat)) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d;
    };

     getPointAtDistance = (metres) => {
      // some awkward special cases
      if (metres == 0) return poly.getPath().getAt(0);
      if (metres < 0) return null;
      var dist=0;
      var olddist=0;
      for (var i=1; (i < poly.getPath().getLength() && dist < metres); i++) {
        olddist = dist;
        dist += this.getDistance(poly.getPath().getAt(i).lat(),poly.getPath().getAt(i).lng(),poly.getPath().getAt(i-1).lat(),poly.getPath().getAt(i-1).lng());
      
      }
      if (dist < metres) {return null;}
      var p1= poly.getPath().getAt(i-2);
      var p2= poly.getPath().getAt(i-1);
      var m = (metres-olddist)/(dist-olddist);
      return new window.google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m);
      }

     getIndexAtDistance = (metres) => {
      // some awkward special cases
      if (metres == 0) return poly.getPath().getAt(0);
      if (metres < 0) return null;
      var dist=0;
      var olddist=0;
      for (var i=1; (i < poly.getPath().getLength() && dist < metres); i++) {
        olddist = dist;
        var lat1 = poly.getPath().getAt(i).lat();
        var lon1 = poly.getPath().getAt(i).lng();
        var lat2 = poly.getPath().getAt(i-1).lat();
        var lon2 = poly.getPath().getAt(i-1).lng();
        dist += this.getDistance(lat1,lon1,lat2,lon2);
      
      }
      if (dist < metres) {return null;}
      return i;
      
      }

     updatePoly = (d) => {
      // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow

      if (path.length > 2) {
         poly2 = new window.google.maps.Polyline({
         path: path,
         geodesic: true,
         strokeWeight: 3,
         });
         try {
           poly2.setMap(map);

         } catch (e) {
           console.log('Yes I am');
         }
      }

      if (this.getIndexAtDistance(d) < lastVertex+2) {
         if (poly2.getPath().getLength() > 1) {
           path.pop();
           }
         path.push(this.getPointAtDistance(d));
      } else {
       path.push(poly.getPath().getAt(lastVertex++));
      }
    }

    animate = (d) => {
      var p = this.getPointAtDistance(d);
      if (k++ >= 180/step) {
        if(p !== null)
         map.panTo(p);
        k=0;
       }
     if(p === null){
       var self = this;
      animation = setTimeout(()=>{
        this.animate(d+step);
        } , 5000);
     }
     else {
      try{
          marker.setPosition(p);
          circle.setCenter(p);

          }catch(e){
            console.log('error in 62');
            }
      this.updatePoly(d);
      if (this.getIndexAtDistance(d)>lastVertex) {
            if (lastVertex === poly.getPath().getLength())
               lastVertex -= 1;
            var lat1 = (Math.PI * poly.getPath().getAt(lastVertex-1).lat()) / 180;
            var lon1 = (Math.PI * poly.getPath().getAt(lastVertex-1).lng()) / 180;
            var lat2 = (Math.PI * poly.getPath().getAt(lastVertex).lat()) / 180;
            var lon2 = (Math.PI * poly.getPath().getAt(lastVertex).lng()) / 180;
            angle = this.bearing(lat1, lon1, lat2, lon2);
            // console.log(angle);
            // console.log('start'+poly.getPath().getAt(lastVertex-1).toUrlValue(6));
            // console.log('end'+poly.getPath().getAt(lastVertex).toUrlValue(6));
            this.plotcar();
            }
        var self = this;    
    animation = setTimeout(()=>{
                      this.animate(d+step);
                  } , (speed));


}
    }

    moveVehicle = () => {
      canvas = document.createElement('canvas');
      context = canvas.getContext("2d");
      this.animate(0); 
    }

 
    componentDidUpdate(prevProps){
      if (JSON.stringify(prevProps.vehicle) !== JSON.stringify(this.props.vehicle)  ){
          history.push(prevProps.vehicle);
          path = history.map((item)=>{
            return new window.google.maps.LatLng(item.latitude, item.longitude)
          });

          if(history.length === 2) {
            poly = new window.google.maps.Polyline({
              path: path,
              geodesic: true,
              strokeColor: '#0000FF',
              strokeWeight: 3,
              });
              this.moveVehicle();
              poly.setMap(null);
              poly2.setMap(null);
          } else  poly.setPath(path);         

      }
    }

    componentDidMount(){
      image.src = amb;
      history.push(this.props.vehicle);
      var mapOptions = {
          center:{
                  lat:17.445517,
                  lng:78.397767
                 },
          zoom: 17,
          mapTypeControl: false,
          draggable: false,
          scaleControl: false,
          scrollwheel: false,
          navigationControl: false,
          streetViewControl: false,
  
      };
    map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
    marker = new window.google.maps.Marker({
      map: map,
      position: new window.google.maps.LatLng(this.props.vehicle.latitude,this.props.vehicle.longitude),
      icon : amb 
    });
    circle = new window.google.maps.Circle({      
      strokeColor: 'rgb(38, 194, 129)',      
      strokeOpacity: 0.8,      
      strokeWeight: 2,      
      fillColor: 'rgb(38, 194, 129)',      
      fillOpacity: 0.35,      
      map: map,      
      center: new window.google.maps.LatLng((this.props.vehicle.latitude + 0.0003),this.props.vehicle.longitude),      
      radius: 66,    
    }); 
 
   this.setState({loaded:true});
   map.setCenter(new window.google.maps.LatLng(this.props.vehicle.latitude, this.props.vehicle.longitude));
   poly2 = new window.google.maps.Polyline({
    path: new window.google.maps.LatLng(this.props.vehicle.latitude, this.props.vehicle.longitude),
    geodesic: true,
    strokeColor: '#0000FF',
    strokeWeight: 3,
    });

  
  }

 

  render(){
        const { classes } = this.props;
        return(
                   <div id="map" className={classes.mapContainer} ref="map"/>
        )
    }
}

LiveTrack.propTypes = {
    classes: PropTypes.object.isRequired,
  };

 

export default connect(store=>({vehicle:store.liveVehicle }))(withStyles(styles)(LiveTrack));

