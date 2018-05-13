import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Moment from 'react-moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { ToastContainer, toast } from 'react-toastify';

class Training extends Component {
    constructor(props){
        super(props);

        this.state = {trainings: [], };
    }

    componentDidMount() {
       this.getTraining();
        }
        
    
    getCustomers = (link) => {

      console.log(link);
      fetch(link)
      .then(res => res.json())
      .then(resData => {

        let customerName = resData.firstname +" "+ resData.lastname;
        let trainingsArray = this.state.trainings;

        for(let i = 0; i < trainingsArray.length; i++)
        {
          if(trainingsArray[i].customerLink === link)
          {
              trainingsArray[i].customerName = customerName;
              console.log(trainingsArray[i]);
              break;
          }
        }

        this.setState({
          trainings: trainingsArray,          
        })

      });

    }

    getTraining = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(res => res.json())
        .then(resData => {

            // this.setState({
            //   trainings: resData.content,          
            // })

          for(let i = 0; i < resData.content.length; i++)
          {
            let trainingData = {};
            trainingData.date = resData.content[i].date;
            trainingData.duration = resData.content[i].duration;
            trainingData.activity = resData.content[i].activity;

            trainingData.customerLink = resData.content[i].links[2].href;

            console.log(trainingData);

            let trainingsArray = this.state.trainings;
            trainingsArray.push(trainingData);
              this.setState({
                trainings: trainingsArray,          
              })

            this.getCustomers(trainingData.customerLink);

          }

          //console.log(trainingData);
          // var trainingsArray = this.state.trainings
          // trainingsArray.push(customerData);
          //   this.setState({
          //     trainings: trainingsArray,          
          //   })

          });
    }

    deleteTraining = (value) => {
      confirmAlert({
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              fetch(value, {method: 'DELETE'})
              .then(res => {
              this.getTraining()
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
                  // id: 'date',
                  // accessor: row => 
                  // {return <Moment format="MMMM Do YYYY, h:mm">{row.date}</Moment>
                  // },
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
                    Header: " Customer Name",
                    accessor: "customerName"
                  },       
              ]
            },
        ]}
          filterable
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />      
            </div>
        );
    }
}

export default Training;