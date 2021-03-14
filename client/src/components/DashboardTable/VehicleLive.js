import React, {Component} from 'react';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import Swal from 'sweetalert2';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import {
    LocalShipping as StatusIcon,
    BatteryFull as Battery,
    SignalWifi0Bar as Gsm0,
    SignalWifi1Bar as Gsm1,
    SignalWifi2Bar as Gsm2,
    SignalWifi3Bar as Gsm3,
    SignalWifi4Bar as GsmFull,
} from "@material-ui/icons";



//redux
import {getLiveVehicles, getLiveVehicle, setMapView} from '../../store/actions/';



const OFFROAD_TIME = 24;
const OFFLINE_TIME = 6;

const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
        },
        paper: {
          boxShadow: "none",
        }
      },
      MUIDataTableHeadCell: {
        root: {
           fontWeight:'bolder'
      }
      },
      MUIDataTableBodyRow: {
        root: {
          whiteSpace: 'nowrap'
        }
      }, 

      MuiTableRow: {
        root: {
          '&$selected': {
            backgroundColor: 'yellow'
          }
        }
      },  

     
    }
  })

const columns = [
    {
        name: "id",
        label: "No.",
     },
    {
        name: "reg_no",
        label: "Vehicle No.",
     },
     {
        name: "device_id",
        label: "Device ID",
        }, 
          
    {
        name: "status",
        label: "Status",
        }, 
    {
        name: "speed",
        label: "Speed",
        },
    {
        name: "main_battery",
        label: "Main Battery",
        },
    {
      name: "gsm",
      label: "Gsm Signal",
      },     
    {
        name: "device_time",
        label: "Date",
        },       

  
  
   ];



class VehicleList extends Component {

    constructor(props){
        super(props);
        this.state = {
            datatableData:[],
            vehicles:[]
        }
    }

    async componentDidMount(){
        try {
            const getVehicles = this.props.getLiveVehicles;
            await getVehicles();
   
        } catch (error) {
            
        }

        
    }

    getGsmStatus = (val) => {
      val = (Math.trunc(val/5)) * 5;
      if(val === 5)
       return <GsmFull style={{color:'green'}} />
       else if(val <= 12 && val >=6)
        return <Gsm3 style={{color:'green'}} />
        else if(val <= 18 && val >=12)
         return <Gsm2 style={{color:'blue'}} />
         else if(val <= 24 && val >=18)
          return <Gsm1 style={{color:'red'}} />
          else 
           return <Gsm0 style={{color:'red'}} />


    }

    
    handleRowClick = (rowData, rowMeta) => {
      const getLiveVehicle = this.props.getLiveVehicle;
      this.props.setMapView(2);
      getLiveVehicle(rowData[1]);
  };
    


    render(){
        const datatableData = this.props.vehicles.map((item, index)=>({
            id:index + 1,
            device_id:item.device_id ,
            reg_no:item.vehicle_reg_no,
            status:<StatusIcon style={{color:item.color}}/>,
            main_battery:<Battery style={{ color: item.main_btry_status ? 'green':'red' }} />,
            gsm:this.getGsmStatus(item.gsm_signal),
            speed: item.speed,
            device_time:item.device_time === undefined ? 'No Data yet.':moment(item.device_time).format('DD-MM-YY hh:mm:ss a'),
        }));

        return (
          <React.Fragment>
               <MuiThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                        title="Table View"
                        data={datatableData}
                        columns={columns}
                        options={{
                        filterType: "checkbox",
                        selectableRows: false,
                        onRowClick: this.handleRowClick,
                        }}
                        style={{boxShadow: "none"}}
                        />
               </MuiThemeProvider>
          </React.Fragment>  
          

        )
    }
}

export default connect (store =>({vehicles:store.liveVehicles}), {getLiveVehicles, getLiveVehicle, setMapView } )(VehicleList);


