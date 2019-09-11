import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dogs from './Dogs';
import Dog from './Dog';
import NotFound from './NotFound';

class Routes extends Component {
    render() {
        let getDog = routeProps => {
            let name = routeProps.match.params.name;
            let currentDog = this.props.dogs.find(
                dog => dog.name.toLowerCase() === name.toLowerCase()
            );
            return <Dog {...routeProps} dog={currentDog} />
        }
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/dogs" />} />
                <Route exact path="/dogs" render={() => <Dogs dogs={this.props.dogs} />} />
                <Route exact path="/dogs/:name" render={routeProps => getDog(routeProps)} />
                <Route render={() => <NotFound />} />
            </Switch>
        );
    }
}

export default Routes;
