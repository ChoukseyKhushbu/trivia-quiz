import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score,
      numOfQues: this.props.numOfQues,
    };
  }
  restart = () => {
    this.props.history.push("/");
  };
  // componentWillUnmount() {
  //   // this.props.resetState(); this will trigger race condition with the componentDidMount of Question component
  //   console.log("called results");
  // }
  componentDidMount() {
    this.props.resetState();
  }
  render() {
    return (
      <div className="result">
        <h2>Congratulations! You have scored</h2>
        <h1>
          {this.state.score} out of {this.state.numOfQues}
        </h1>
        <button
          className="button"
          onClick={this.restart}
          style={{ float: "none" }}
        >
          Play Again
        </button>
      </div>
    );
  }
}

export default withRouter(Results);
