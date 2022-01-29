
import './index.css'
import { Fragment } from "react";
import Development from "./modes/Development";
import Programming from './modes/Programming';

function App() {
  return (
    <Fragment>
      <Development />
      {/* <Programming /> */}
    </Fragment>
  );
}

export default App;
