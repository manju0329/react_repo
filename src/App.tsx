import React from 'react';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  async function issueLoad() {
    try{
      const response = await axios.get("https://api.github.com/repos/facebook/create-react-app/issues");
      const data = response.data;
      console.log(data)
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://github.com/facebook/create-react-app"
          target="_blank"
        >
          create-react-app - issue list
        </a>
        <button onClick={issueLoad}>Issue Load</button>
      </header>
      
    </div>
  );
}

export default App;
