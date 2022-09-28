import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from "./components/headers/Header";
import Pages from "./components/mainpages/Pages";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
