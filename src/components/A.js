import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { ToastContainer, toast } from 'react-toastify';


class A extends Component {
    constructor(props){
        super(props);

        this.state = {trainings: [], names: [], links:[] };
    }

    componentDidMount() {
       this.getTraining();
        }

    getCustomer = (link) => {
      console.log(link);
      fetch(link)
      .then(res => res.json())
        .then(resData => {
          var customerName = resData.firstname +' '+resData.lastname;
          return customerName;});

    }

    getTraining = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(res => res.json())
        .then(resData => {
          
            for(var i = 0; i < resData.content.length; i++){
               var trainingData = {};
               var link = resData.content[i].links[2].href;       
            
                trainingData.customerName= this.getCustomer(link);
                trainingData.date = resData.content[i].date;
                trainingData.duration = resData.content[i].duration;
                trainingData.activity = resData.content[i].activity;

                var customerArray = [];
                customerArray.push(trainingData);
                this.setState({
                trainings: customerArray
            });


            }
            
            console.log(this.state.trainings);
          });

          //console.log(trainingData);
          // var trainingsArray = this.state.trainings
          // trainingsArray.push(customerData);
          //   this.setState({
          //     trainings: trainingsArray,          
          //   })

         
    }

    

    render() {
        

        return (
            
            <div className="container">
            <div className="row">

            </div>
                <h2>Trainings</h2>      

                <ReactTable
          data={this.state.trainings}
          columns={[
            {
              
              columns: [
                {
                  Header: " Date",
                  accessor: "date"
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
                    Header: " Customer Name",
                    accessor: "customerName",
                    
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

export default A;