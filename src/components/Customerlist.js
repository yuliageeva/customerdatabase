import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';

class Customerlist extends Component {
    constructor(props){
        super(props);

        this.state = {customers: []};
    }

    componentDidMount() {
       this.loadCustomers();
        }
 

    loadCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(resData => {
            this.setState({customers: resData.content})});
    }

    addCustomer = (newCustomer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', 
        { method: 'POST', 
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(newCustomer)
        })
      .then(res => this.loadCustomers())
      .catch(err => console.error(err))
    }

    deleteCustomer = (value) => {
      confirmAlert({
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              fetch(value, {method: 'DELETE'})
              .then(res => {
              this.loadCustomers()
              toast.success("Customer deleted successfully", {
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

    updateCustomer = (link, customer) => {
      fetch(link, 
        { method: 'PUT', 
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(customer)
        })
      .then(res => this.loadCustomers())
      .catch(err => console.error(err))
    }

    render() {
        

        return (
            
            <div className="container">
            
            <div className="row" style={{marginTop: 20}}>
            <h2 style={{marginTop: 10, marginRight:800, marginLeft:20}}>Customers</h2> 
                
                <Addcustomer addCustomer={this.addCustomer} /> 
                </div>

                <ReactTable
          data={this.state.customers}
          columns={[
            {
              
              columns: [
              {
                  Header: "Id",
                  accessor: "_links.self.href",
                  show: false
                },
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
                  },
                  {
                    id: 'button',
                    width: 100,
                    sortable: false,
                    accessor: "links[0].href",
                    filterable: false,
                    Cell: ({value}) => (<button className="btn btn-danger" onClick={()=> {this.deleteCustomer(value)}}>Delete</button>)
                  },
                  {
                    id: 'button',
                    width: 100,
                    sortable: false,
                    accessor: "links[0].href",
                    filterable: false,
                    Cell: ({row, value}) => (<Editcustomer updateCustomer={this.updateCustomer} link={value} customer ={row} />)
                  },
                
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

export default Customerlist;