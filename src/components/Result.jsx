import React from "react";
import { useHistory } from "react-router-dom";

function Result(props) {
  const history = useHistory();
  let restart = () => {
    props.resetState();
    history.push("/");
  };
  return (
    <div className="result">
      <h2>Congratulations! You have scored</h2>
      <h1>
        {props.score} out of {props.numOfQues}
      </h1>
      <button className="button" onClick={restart} style={{ float: "none" }}>
        Play Again
      </button>
    </div>
  );
}

export default Result;
