/**
 * Desc: Hosts the starter page that will render the web page
 * Author: Christopher Banas
 */
import React from 'react';
import './App.css';
import StarterPage from "./StarterPage";

/**
 * Calls on Starter page to be created
 * @returns {JSX.Element} Starter page
 * @constructor
 */
function App() {
  return (
    <div className="App">
      <StarterPage/>
    </div>
  );
}

export default App;
