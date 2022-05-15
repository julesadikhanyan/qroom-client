import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Rooms from "./pages/Rooms";
import "./style/App.scss";
import Room from "./pages/Room";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/rooms"/>}/>
                <Route exact path="/rooms">
                    <Rooms/>
                </Route>
                <Route exact path="/room">
                    <Room/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
