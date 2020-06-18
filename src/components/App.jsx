import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu";
import Questions from "./Questions";
import Result from "./Result";

function App() {
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [numOfQues, setnumOfQues] = useState(10);

  let changeDifficulty = (difficulty) => {
    setDifficulty(difficulty);
  };
  let resetState = () => {
    setDifficulty("");
    setScore(0);
    setnumOfQues(10);
  };
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Menu
            difficulty={difficulty}
            changeDifficulty={changeDifficulty}
            setnumOfQues={setnumOfQues}
            numOfQues={numOfQues}
          />
        </Route>
        <Route path="/quiz/:categoryID">
          <Questions
            score={score}
            changeScore={(currScore) => setScore(currScore)}
            difficulty={difficulty}
            numOfQues={numOfQues}
          />
        </Route>
        <Route path="/result">
          <Result score={score} resetState={resetState} numOfQues={numOfQues} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
export default App;
