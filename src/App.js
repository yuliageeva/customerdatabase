import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Router, Switch, Link, Route} from 'react-router-dom';
import Home from './components/Home';
import Customerlist from './components/Customerlist';
import Training from './components/Training';
import Addcustomer from './components/Addcustomer';
import Trainingupdatedapi from './components/Trainingupdatedapi';
import CalendarPage from './components/CalendarPage';
import {Nav, Navbar, NavItem} from 'react-bootstrap';

class App extends Component {
  
  render() {


    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Customers & Trainings</h1>
          </header>
          
        
        <BrowserRouter>
        <div style={{textAlign: "center", padding: "10px", marginTop:5, marginBottom:40, fontSize:20
      }}>
         <Link to ="/"></Link>{' '}
         <Link style={{margin:30}} to ="/home">Home</Link>{' '}
         <Link style={{margin:30}} to ="/customers">Customers</Link>{' '}
         <Link style={{margin:30}} to ="/training">Trainings</Link>{' '}
         <Link style={{margin:30}} to ="/newtrainings">Updated trainings</Link>{' '}
         <Link style={{margin:30}} to ="/calendarpage">Calendar</Link>{' '}

        
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/customers" component = {Customerlist}/>
            <Route path="/training" component={Training}/>
            <Route path="/newtrainings" component={Trainingupdatedapi}/>
            <Route path="/calendarpage" component={CalendarPage} />
          </Switch>
          
          
          </div>
       
          </BrowserRouter>   
      </div>
    );
  }
}

export default App;
