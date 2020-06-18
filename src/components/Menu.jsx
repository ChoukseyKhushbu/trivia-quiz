import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: "",
      categoryQuestions: { all: 0, easy: 0, medium: 0, hard: 0 },
    };
  }

  componentDidMount() {
    this.getCategories();
  }
  getCategories = async () => {
    const response = await axios.get(`https://opentdb.com/api_category.php`);
    let categories = response.data.trivia_categories;
    // console.log(categories);
    this.setState({
      categories: [...categories],
    });
  };

  /**
   * Directing to '/quiz'
   */
  startQuiz = () => {
    this.props.history.push(`/quiz/${this.state.selectedCategory.value}`);
  };

  selectCategory = async (option) => {
    const { difficulty, numOfQues } = this.props;
    this.setState(
      {
        selectedCategory: option,
      },
      async () => {
        const response = await axios.get(
          `https://opentdb.com/api_count.php?category=${this.state.selectedCategory.value}`
        );
        let categoryQuestions = response.data.category_question_count;
        const {
          total_question_count,
          total_easy_question_count,
          total_medium_question_count,
          total_hard_question_count,
        } = categoryQuestions;

        this.setState({
          categoryQuestions: {
            all: total_question_count,
            easy: total_easy_question_count,
            medium: total_medium_question_count,
            hard: total_hard_question_count,
          },
        });
        let newMax =
          categoryQuestions[
            `total_${difficulty ? difficulty + "_" : ""}question_count`
          ];
        if (newMax < numOfQues) this.props.setnumOfQues(newMax);
      }
    );
  };
  handleChange = (option, action) => {
    // console.log(option);
    const { categoryQuestions } = this.state;
    const { numOfQues } = this.props;
    if (action.name === "difficulty") {
      this.props.changeDifficulty(option.value);
      let newMax = categoryQuestions[option.value || "all"];
      console.log(newMax);
      if (newMax < numOfQues) this.props.setnumOfQues(newMax);
    } else {
      this.props.setnumOfQues(option.value);
    }
  };
  handleInputChange = (inputValue, actionMeta) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    const { difficulty, numOfQues } = this.props;
    let options = [];
    let maxQuestions = this.state.categoryQuestions[difficulty || "all"];
    for (let i = 5; i <= maxQuestions; i += 5) {
      options.push({ value: i, label: i });
    }
    if (maxQuestions % 5 !== 0) {
      options.push({ value: maxQuestions, label: maxQuestions });
    }
    return (
      <div className="menu">
        <div className="select-option">
          <label htmlFor="category">Category</label>
          <Select
            className="dropdown"
            isSearchable
            value={this.state.selectedCategory}
            defaultValue={{ value: "", label: "All" }}
            name="category"
            options={
              this.state.categories.length
                ? this.state.categories.map((element) => {
                    return { value: element.id, label: element.name };
                  })
                : []
            }
            onChange={this.selectCategory}
          />
        </div>
        <div className="select-option">
          <label htmlFor="difficulty">Difficulty</label>
          <Select
            className="dropdown"
            isSearchable
            defaultValue={{ value: "", label: "All" }}
            name="difficulty"
            options={[
              { value: "", label: "All" },
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
            onChange={this.handleChange}
          />
        </div>
        <div className="select-option">
          <label htmlFor="questions">No. of Questions</label>
          <CreatableSelect
            className="dropdown"
            isSearchable
            value={{ value: numOfQues, label: numOfQues }}
            name="questions"
            options={options}
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
          />
        </div>
        <button
          type="button"
          className="button"
          onClick={this.startQuiz}
          disabled={!this.state.selectedCategory}
        >
          Start
        </button>
      </div>
    );
  }
}
export default withRouter(Menu);
