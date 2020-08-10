import React from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import Routes from "./domain/routes";
import MyProvider from "./context-store/myProvider";

function App() {
  return (
      <>
          <MyProvider>
              <BrowserRouter>
                  <Routes/>
              </BrowserRouter>
          </MyProvider>
      </>
  );
}

export default App;
