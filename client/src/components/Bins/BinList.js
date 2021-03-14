import React, {Component} from 'react';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import  { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import moment from 'moment';
import Swal from 'sweetalert2';



//redux
import {getBin, removeBin} from '../../store/actions/';

//Component
import PageTitle from "../PageTitle";


const columns = [
    {
        name: "id",
        label: "No.",
       },
    {
     name: "binName",
     label: "Bin",
     },
    {
        name: "latitude",
        label: "Latitude",
    }, 
    {
        name: "longitude",
        label: "Longitude",
    }, 
    {
        name: "gpsDeviceId",
        label: "GpsDeviceId",
    }, 
    {
        name: "maxCapacity",
        label: "MaxCapacity",
    }, 
    {
        name: "address",
        label: "Address",
    },
     {
        name: "wardName",
        label: "Ward Name",
    },
             
    {
        name: "created",
        label: "Created At",
        options: {
         filter: true,
         sort: false,
        }
       },
    {
     name: "action",
     label: "Action",
     options: {
      filter: true,
      sort: false,
     }
    },
   ];

class BinList extends Component {

    constructor(props){
        super(props);
        this.state = {
            datatableData:[]
        }
    }

    async componentDidMount(){
        try {
            const getBin = this.props.getBin;
            await getBin();
            console.log(getBin)
            
        } catch (error) {
            
        }

        
    }

    
    handleSelect = (id) =>{
        const getcurrentBin = this.props.getcurrentBin;
        getcurrentBin(id);
    }

    handleDelete = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover',
            confirmButtonColor: '#FF5C93',
            cancelButtonColor: '#3CD4A0',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                this.props.removeBin(id)
             
            }
          })
    }


    render(){
        const datatableData = this.props.bins.map((item, index)=>({
            id:index + 1,
            binName:item.binName,
            latitude:item.latitude,
            longitude:item.longitude,
            gpsDeviceId:item.gpsDeviceId,
            maxCapacity:item.maxCapacity,
            address:item.address,
            wardName:item.ward.wardName,
            bintype:item.bintype,
            bincategory:item.bincategory,
            rfid1:item.rfid1,
            rfid2:item.rfid2,
            rfid3:item.rfid3,
            vehicle:item.vehicle && item.vehicle.vehicle_reg_no,
            created:moment(item.created).format('DD-MM-YYYY'),
            action: <div class="MuiBox-root">
                  <Link style={{textDecoration:'none'}} to={`${this.props.location.pathname}/edit/${item._id}`}>
                      <Button 
                       variant="contained"
                       size="small"
                       color="inherit"
                       style={{marginRight:'8px', backgroundColor:'#3CD4A0', color:'#fff'}}

                      >
                          EDIT
                       </Button>
                       </Link>
                   <Button onClick={()=>this.handleDelete(item._id)} id={item._id}
                    variant="contained"
                    size="small"
                    style={{marginRight:'8px'}}
                    color="secondary" >
                        DELETE
                    </Button> 
                </div>

        }));

        return (
          <React.Fragment>
               <PageTitle title="Bin" button="ADD NEW BIN" onClick={()=>this.props.history.push(`${this.props.location.pathname}/new`)} />
                <MUIDataTable
                    title="Bin List"
                    data={datatableData}
                    columns={columns}
                    options={{
                    filterType: "checkbox",
                    selectableRows: false,
                    }}
                />  
          </React.Fragment>  
          

        )
    }
}

export default connect (store =>({bins:store.bins}), {getBin, removeBin } )(BinList);


