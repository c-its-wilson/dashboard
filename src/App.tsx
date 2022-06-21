import './App.css';
import React from 'react';
import Bio from './components/Bio';
import Footer from './components/Footer';

function App() {

  return (
    <div className="App">
      <header className='App-header' >
        <h1>My Strava Dashboard</h1>
      </header>
      <body>
        <Bio/>
      </body>
      <Footer/>
    </div>
  );
}

export default App;
