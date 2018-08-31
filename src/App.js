import React, { Component } from 'react';
import './App.css';
import Carousel from './components/carousel'
import Navbar from './components/nav_bar'
import ReorderGrid from './components/reorder_grid'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Carousel}/>
          <Route exact path='/reorder' component={ReorderGrid}/>
        </Switch>
      </div>
    );
  }
}

export default App;
