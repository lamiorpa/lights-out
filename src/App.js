import React, { Component } from "react";
import Lightsout from "./Lightsout";
import "./App.css";

/** Simple app that renders few interesting components */

class App extends Component {
    render() {
        return (
            <div className='App'>
                
                <Lightsout />
            </div>
        );
    }
}

export default App;
