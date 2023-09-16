import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import "./Home.css";
import Rockets from "./Rockets/Rockets";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import Capsules from "./Capsules/Capsules";
import Capsule from "./Capsule/Capsule";
const Home = () => {
  return (
    <Router>
      <div className="home">
        <Grid container>
          <Grid item xs={12}>
            <Header />
            <Switch>
              <Route path="/home" component={Main} />
              <Route path="/rockets" component={Rockets} />
              <Route path="/capsules" component={Capsules} />
              <Route path="/capsule/:capsule_serial" component={Capsule} />
              <Redirect exact from="/" to="/home" />
            </Switch>
            <Footer />
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default Home;
