import React, { Component } from "react";
import Board from "./Board";

/** Simple app that just shows the LightsOut game. */

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Board nrows={3} ncols={3} />
                <Board />
                <Board nrows={5} ncols={5} />
                <Board nrows={3} ncols={6} />
            </div>
        );
    }
}

export default App;
