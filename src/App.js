import React from 'react';

import SearchArea from "./component/SearchArea/SearchArea";
import CardContainer from "./component/CardContainer/CardContainer";
import classes from "./App.module.scss";

function App() {
  console.log("[App]");
  return (
    <div className="App">
      <div className={classes.App__Title}>
        <h3>Pokédex</h3>
      </div>
      <SearchArea />
      <CardContainer />
    </div>
  );
}

export default App;
