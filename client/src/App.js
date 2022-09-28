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
        <div className="App h-100 d-flex flex-column align-items-center">
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
