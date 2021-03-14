import React, {Component} from 'react';
import loadGoogleMaps from '../../modules/load-google-maps.js';
import VehicleMap from "../../components/GoogleMap/VehicleMap";
import VehiclesMap from "../../components/GoogleMap/VehiclesMap";
import VehicleInfo from "../../components/GoogleMap/Vehicleinfo";
import HistoryMap from "../../components/GoogleMap/HistoryMap";
import LiveTrack from "../../components/GoogleMap/LiveTrack";
import Widget from "../../components/Widget";

//redux
import {connect} from 'react-redux';
import Vehicleinfo from '../../components/GoogleMap/Vehicleinfo';


class MapView extends Component{
    constructor(props){
        super(props);
        this.state = { googleMapsReady: false };
    }

    componentWillMount() {
        loadGoogleMaps(() => {
          // Work to do after the library loads.
          this.setState({ googleMapsReady: true });
        });   
  }

  renderMap(){
      if(this.props.view === 2){
           return ( <React.Fragment>
                        <VehicleMap />
                        <VehicleInfo />
                    </React.Fragment> )       
      }
      else if(this.props.view === 3){
          return (<HistoryMap />)
      }
      else if(this.props.view === 4){
        return (<LiveTrack />)
    }
      else{
          return  (<VehiclesMap/>)
      }
  }

  render() {

            return (
                <Widget
                title="Map View"
                upperTitle
                noBodyPadding
                boxShadow='none'
                 >
                {this.renderMap()}
                
            </Widget> 
        );
}

}

export default connect (store =>({view:store.views.mapView}) )(MapView);
