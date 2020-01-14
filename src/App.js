import React, { Component } from "react";
import Axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      dataParticipant: {},
      participants: []
    };
  }

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitFormHandle = () => {
    console.log(this.state.username);
    let newParticipant = {
      username: this.state.username,
      timeOfArrival: new Date()
    };
    this.setState(prevState => {
      return {
        participants: [...prevState.participants, newParticipant]
      };
    });
    Axios.get(`https://api.github.com/users/${this.state.username}`).then(
      response => {
        console.log(response);
        this.setState({
          dataParticipant: response
        });
      }
    );
  };

  render() {
    return (
      <>
        <div className='login'>
          <div className='login-triangle' />
          <h2 className='login-header'>Github Workshop</h2>
          <div className='login-container'>
            <p>
              <input
                value={this.state.username}
                name='username'
                placeholder='username'
                onChange={this.handleFormChange}
              />
            </p>
            <p>
              <input
                type='submit'
                defaultValue='join workshop'
                onClick={() => this.submitFormHandle()}
              />
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default App;
