import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Rooms from "./pages/Rooms";
import "./App.scss";
import Header from "./components/Header";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/rooms"/>}/>
                <Route exact path="/rooms">
                    <Rooms/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
