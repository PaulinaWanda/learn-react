import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Space from './Components/Space';
import First from './Components/First';
import Second from "./Components/Second";
import Third from "./Components/Third";

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class App extends Component {
  render() {
    return (
        <div className="container">
            <Space/>
            <First/>
            <Space/>
            <Second/>
            <Space/>
            <Third/>
            <Space/>
        </div>
    );
  }
}

export default App;
