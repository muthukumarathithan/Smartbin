import React, {Component} from 'react';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import  { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import moment from 'moment';
import Swal from 'sweetalert2';



//redux
import {getSupervisor, removeSupervisor} from '../../store/actions/supervisor';

//Component
import PageTitle from "../PageTitle";


const columns = [
    {
        name: "id",
        label: "No.",
    },
   {
     name: "wardName",
     label: "Ward Name",
    },
     {
        name: "supervisorName",
        label: "House Owner",
    },  
    {
        name: "mobile",
        label: "Mobile",
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

class SupervisorList extends Component {

    constructor(props){
        super(props);
        this.state = {
            datatableData:[]
        }
    }

    async componentDidMount(){
        try {
            const getSupervisor = this.props.getSupervisor;
            await getSupervisor();
            console.log(getSupervisor)
            
        } catch (error) {
            
        }

        
    }

    
    handleSelect = (id) =>{
        const getcurrentSupervisor = this.props.getcurrentSupervisor;
        getcurrentSupervisor(id);
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
                this.props.removeSupervisor(id)
             
            }
          })
    }


    render(){
        const datatableData = this.props.supervisor.map((item, index)=>({
            id:index + 1,
            wardName:item.ward.wardName,
            supervisorName:item.supervisorName,
            mobile:item.mobile,
            GPSDeviceId:item.GPSDeviceId,
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
               <PageTitle title="Supervisor" button="ADD NEW Supervisor" onClick={()=>this.props.history.push(`${this.props.location.pathname}/new`)} />
                <MUIDataTable
                    title="Supervisor List"
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

export default connect (store =>({supervisor:store.supervisor}), {getSupervisor, removeSupervisor } )(SupervisorList);


