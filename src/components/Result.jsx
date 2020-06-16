import React from 'react';
import { useHistory } from 'react-router-dom';


function Result(props) {
    // const params = useParams();
    const history = useHistory();
    // console.log(params.score);
    let restart = () => {
        props.resetState();
        history.push('/');
    }
    return <div className="result">
        <h2>Congratulations! You have scored</h2>
        <h1>{props.score} out of 10</h1>
        <button className="button" onClick={restart}>Play Again</button>
    </div>
}

export default Result;