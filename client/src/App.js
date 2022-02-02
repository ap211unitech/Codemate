
import { Fragment } from "react";
import Development from "./modes/Development";
import Programming from './modes/Programming';
import { BrowserRouter, Route, Switch } from "react-router-dom";

/******************************* Components *******************************/
import Landing from "./components/Landing";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/programming_mode" component={Programming} />
          <Route exact path="/development_mode" component={Development} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
