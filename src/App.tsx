import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Rooms from "./pages/Rooms";
import "./style/App.scss";
import Room from "./pages/Room";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

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
                <Route exact path="/signup">
                    <SignUp/>
                </Route>
                <Route exact path="/login">
                    <LogIn/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
