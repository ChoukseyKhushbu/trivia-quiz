import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import Questions from './Questions';
import Result from './Result';


function App() {

    const [score, setScore] = useState(0);
    const [difficulty, setDifficulty] = useState('');

    let changeDifficulty = (e) => {
        setDifficulty(e.target.value)
    }
    let resetState = () => {
        setDifficulty('');
        setScore(0);
    }
    return <div className="container">
        <Header />
        <Switch>
            <Route path="/" exact><Menu difficulty={difficulty} changeDifficulty={changeDifficulty} /></Route>
            <Route path="/quiz/:categoryID"><Questions score={score} changeScore={(currScore) => setScore(currScore)} difficulty={difficulty} /></Route>
            <Route path="/result"><Result score={score} resetState={resetState} /></Route>
        </Switch>
        <Footer />
    </div>
}
export default App;