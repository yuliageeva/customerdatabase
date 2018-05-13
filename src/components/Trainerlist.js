import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {CSVLink, CSVDownload} from 'react-csv';
import Training from './Training';

class Trainerlist extends Component {
    constructor(props){
        super(props);

        this.state = {trainers: [], trainingsLink: ''};
    }

    componentDidMount() {
       this.loadTrainers();
        }

    

    loadTrainers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(resData => {
            this.setState({trainers: resData.content})});
    }

    handleClick(event, link) {
    event.preventDefault();
    window.open('/trainings');
    // this.getTraining(link);
  }




    render() {
        

        return (
            
            <div className="container">
            <div className="row">
            </div>
                <h2>Customers</h2>      

                <ReactTable
          data={this.state.trainers}
          columns={[
            {
              
              columns: [
                {
                  Header: " Firtsname",
                  accessor: "firstname"
                },
                {
                    Header: " Lastname",
                    accessor: "lastname"
                  },
                  {
                    Header: " Street address",
                    accessor: "streetaddress"
                  },
                  {
                    Header: " Postcode",
                    accessor: "postcode"
                  },
                  {
                    Header: " City",
                    accessor: "city"
                  },
                  {
                    Header: " Email",
                    accessor: "email"
                  },
                  {
                    Header: " Phone",
                    accessor: "phone"
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

export default Trainerlist;