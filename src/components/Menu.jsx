import React from 'react';
// import Select from 'react-select';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: '',
            difficulty: '',
        }
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
            selectedCategory: categories[0].id,
        })
    }

    /**
     * Directing to '/quiz'  
     */
    startQuiz = () => {
        this.props.history.push(`/quiz/${this.state.selectedCategory}`);
    }

    selectCategory = (event) => {
        const category = event.target.value;
        this.setState({
            selectedCategory: category,
        })
    }
    render() {
        return <div className="menu">
            <div>
                <label htmlFor="category">Category</label>
                <select name="category" className="dropdown category" value={this.state.selectedCategory} onChange={this.selectCategory}>
                    {this.state.categories.length && this.state.categories.map(element => {
                        return <option value={element.id} key={element.id}>{element.name}</option>
                    })}
                </select>
            </div>
            <div>
                <label htmlFor="difficulty">Difficulty</label>
                <select name="difficulty" className="dropdown difficulty" onChange={this.props.changeDifficulty}>
                    <option value="">All</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <button type="button" className="button" onClick={this.startQuiz}>Start</button>
        </div>
    }
}
export default withRouter(Menu);