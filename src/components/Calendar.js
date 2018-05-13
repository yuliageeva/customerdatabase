import React, { Component } from 'react';
import Calendar from 'react-big-calendar'
import {BrowserRouter, Router, Switch, Link, Route} from 'react-router-dom';
import moment from 'react-moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

Calendar.momentLocalizer(moment);

class CalendarPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { trainings: [], events:[] };
}

  componentDidMount() {
    this.loadTrainings();
  }

  //Load all trainings from API
    loadTrainings = () => {
      fetch('https://customerrest.herokuapp.com/api/trainings')
      .then(res => res.json())
      .then(resData => {
        this.setState({trainings: resData.content});
      })
    }

  render () {

      let events = [];

      for (var i = 0; i < this.state.trainings.length; i++) {
          console.log(i);
          let newEvent = { id: i, title: this.state.trainings[i].activity, start: new Date(moment.utc(this.state.trainings[i].date)), end: new Date(moment.utc(this.state.trainings[i].date).add(this.state.trainings[i].duration / 60, "hours")),
          desc:trainings[i].customer.firstname+' '+ trainings[i].customer.lastname };
          events.push(newEvent);
      }

      
      if (this.state.events.length === 0) {
        return null
      } else {
        return (

          <Calendar
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          onSelectEvent={event => alert("Activity: " + event.title + "\nDate and time: " + moment(event.start).format('MMMM Do YYYY, H:mm'))}
          style={{ height: "100vh" }}
        />

  );
}
  }
}

export default CalendarPage;