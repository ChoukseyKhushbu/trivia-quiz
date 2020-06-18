import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { shuffle } from "underscore";
import axios from "axios";
import classNames from "classnames";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
      response_code: "",
      number: 0,
      answer: null,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { numOfQues, difficulty } = this.props;
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${numOfQues}&category=${
        this.props.match.params.categoryID
      }&difficulty=${difficulty || ""}`
    );

    let { results, response_code } = response.data;
    results = results.map((question) => {
      const optionList = shuffle([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);
      question["optionList"] = optionList;
      return question;
    });
    this.setState({
      loading: false,
      questions: results,
      response_code: response_code,
    });

    // console.log(response);
  };

  nextQuestion = () => {
    this.setState({
      number: this.state.number + 1,
      answer: null,
    });
  };

  checkAnswer = (event) => {
    const { questions, number } = this.state;
    const ind = event.target.value;
    const answer = questions[number].optionList[ind];
    this.setState({
      answer: answer,
    });
    if (answer === questions[number].correct_answer)
      this.props.changeScore(this.props.score + 1);
  };

  showResults = () => {
    this.props.history.push(`/result`);
  };

  render() {
    const { response_code, loading, questions, number, answer } = this.state;

    return loading ? (
      <h1>loading...</h1>
    ) : response_code === 0 ? (
      <div className="quiz">
        <h1
          dangerouslySetInnerHTML={{ __html: `${questions[number].question}` }}
        ></h1>

        <ul>
          {questions[number].optionList.map((option, index) => (
            <div
              key={index}
              className={classNames("option", {
                hoverEffectEnable: answer === null,
                hoverEffectDisable: answer !== null,
                correct: answer && questions[number].correct_answer === option,
                wrong:
                  answer &&
                  option === answer &&
                  questions[number].correct_answer !== option,
              })}
            >
              <li
                onClick={answer === null ? this.checkAnswer : undefined}
                value={index}
                dangerouslySetInnerHTML={{ __html: `${option} ` }}
              ></li>
              {answer && questions[number].correct_answer === option ? (
                <i className="fas fa-check-circle"></i>
              ) : option === answer ? (
                <i className="fas fa-times-circle"></i>
              ) : (
                ""
              )}
            </div>
          ))}
        </ul>

        {number < questions.length - 1 ? (
          <button className="button" onClick={this.nextQuestion}>
            Next Question
          </button>
        ) : (
          <button className="button" onClick={this.showResults}>
            Results
          </button>
        )}
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default withRouter(Questions);
