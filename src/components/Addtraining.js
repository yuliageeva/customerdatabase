import React from 'react';
import SkyLight from 'react-skylight';
import RaisedButton from 'material-ui/RaisedButton';
import Moment from 'react-moment';

class Addtraining extends React.Component {
  constructor(props) {
      super(props);
      this.state = {activity: '',  date: '', duration: '', customer: '', customers: []};
  }

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(res => res.json())
    .then(resData => {
      this.setState({customers: resData.content});
      console.log(this.state.customers);
    })
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let newTraining = {activity: this.state.activity, duration: this.state.duration, date: this.state.date + ":00.000+0000", customer: this.state.customer};
    console.log(newTraining);
    this.props.addTraining(newTraining);
    this.simpleDialog.hide();
}

  render() {
    let customerOptions = this.state.customers.map((item) =>
        <option key={item.id} value={item.links[0].href}>{item.firstname} {item.lastname}</option>);
    return (
      <div>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Add training">
              <div className="card" style={{"width": "95%"}}>
                <div className="card-body">
                  <h5 className="card-title">New training</h5>
                  <form>
                      <div className="form-group">
                          <input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange}/>
                      </div>
                      <div className="form-group">
                          <input type="text" placeholder="Duration" className="form-control" name="duration" onChange={this.handleChange}/>
                      </div>
                      <div className="form-group">
                          <input type="date" placeholder="Date" type="datetime-local" className="form-control" name="date" onChange={this.handleChange}/>
                      </div>
                      <div className="form-group">
                        <select className="form-control" id="chooseCust" name="customer" onChange={this.handleChange}>
                            {customerOptions}
                        </select>
                      </div>

                      <div className="form-group">
                          <RaisedButton primary = {true} label ="Save" onClick={this.handleSubmit}/>
                      </div>
                  </form>
                </div>
              </div>
        </SkyLight>
            
            <button style={{margin: 10,backgroundColor:'grey', borderColor:'grey',position:'left'}} className="btn btn-primary" onClick={() => this.simpleDialog.show()}>Add training</button>
             
          
      </div>
    );
  }
}

export default Addtraining;