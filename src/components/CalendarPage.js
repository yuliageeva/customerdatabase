import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
moment.locale('en-GB');

BigCalendar.momentLocalizer(moment)


class CalendarPage extends React.Component {


constructor(props) {
    super(props);
    this.state = {trainings: [], events: []};
  }

  componentDidMount() {
    this.loadTrainings()
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData,
      });
      this.createEvents();
  });
  }

  createEvents() {
    let {trainings} = this.state
    var eventsArr = []
    for (let i = 0; i < trainings.length; i++) {
      let event = {
        id: i,
        title: trainings[i].activity +', '+ trainings[i].duration + ' minutes',
        start:new Date (moment(trainings[i].date).format('MM/DD/YYYY')),
        end: new Date (moment(trainings[i].date).format('MM/DD/YYYY')),
        desc:trainings[i].customer.firstname+' '+ trainings[i].customer.lastname,
      }
      eventsArr.push(event);
    }
    this.setState({events: eventsArr})
  }

  render() {
   
    
      return (
        <div className="App-body">
          <div>
          <BigCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
            
          />
          </div>
        </div>
      );
    
  }
}

export default CalendarPage;