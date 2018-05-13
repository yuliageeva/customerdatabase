import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Addtraining from './Addtraining';

class Trainingupdatedapi extends Component {
    constructor(props){
        super(props);

        this.state = {trainings: []};
    }

    componentDidMount() {
       this.loadTrainings();
        }
 

    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(res => res.json())
        .then(resData => {
          console.log(resData);
            this.setState({trainings: resData})});

    }

    addTraining = (newTraining) => {
      console.log(newTraining);
      fetch('https://customerrest.herokuapp.com/api/trainings', 
        { method: 'POST', 
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(newTraining)
        })
      .then(res => {
        console.log(res);
        this.loadTrainings();
      })
      .catch(err => console.error(err))
    }

    deleteTraining = (value) => {
      confirmAlert({
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              fetch('https://customerrest.herokuapp.com/api/trainings/'+ value, {method: 'DELETE'})
              .then(res => {
              this.loadTrainings()
              toast.success("Training deleted successfully", {
              position: toast.POSITION.TOP_CENTER
                });
              })
            }    
          },
          {
            label: 'No',
          }
        ]
      })      
    }

    render() {
        

        return (
            
            <div className="container">

            <div className="row" style={{marginTop: 20}}>
            <h2 style={{marginTop: 10, marginRight:850, marginLeft:20}}>Trainings</h2> 
                
                <Addtraining addTraining={this.addTraining} /> 
                </div>

                <ReactTable
          data={this.state.trainings}
          columns={[
            {
              
              columns: [
                {
                  Header: " Date",
                  accessor: "date",
                  Cell:({value}) =>(<Moment date={value} />)
                },
                {
                    Header: " Duration",
                    accessor: "duration"
                  },
                  {
                    Header: " Activity",
                    accessor: "activity"
                  },
                  {
                    Header: " Firstname",
                    accessor: "customer.firstname"
                  },
                  {
                    Header: " Lastname",
                    accessor: "customer.lastname"
                  },
                  {
                    id: 'button',
                    width: 100,
                    sortable: false,
                    accessor: "id",
                    filterable: false,
                    Cell: ({value}) => (<button className="btn btn-danger" onClick={()=> {this.deleteTraining(value)}}>Delete</button>)
                  }
                
              ]
            },
        ]}
          filterable
          defaultPageSize={10}
          className="-striped -highlight"
        />
        
        <br /> 
          <ToastContainer autoClose={1500}/>         
            </div>
        );
    }
}

export default Trainingupdatedapi;