import React, {Component} from 'react';
import './App.css';
import firebase from "./Components/Authentication/Firebase";
import MainPage from './Components/MainPage'

class App extends Component {
  constructor() {
    super();
    this.state = {
      password: null,
      isLogged: false
    }
    this.handleLogIn = this.handleLogIn.bind(this)
  }
  componentDidMount() {
    const ref = firebase.database().ref('password')
    ref.on('value', snapshot =>{
      console.log(snapshot.val() )
      this.setState({password: snapshot.val()})

    })
  }
  handleLogIn (){
    this.setState({
      isLogged: true
    })
    window.localStorage.setItem('isLogged', 'true')
  }

  render(){
  return (
     <MainPage password={this.state.password} isLogged={this.state.isLogged} handleLogin={this.handleLogIn}/>
  );
  }
}

export default App;
