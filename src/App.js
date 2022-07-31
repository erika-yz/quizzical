import React from "react";
import { nanoid } from "nanoid";
import "./style/common.css";
import Questions from './components/Questions';

function App() {
	const [newGame, setNewGame] = React.useState(false);
	const [data, setData] = React.useState([]);
	const [trivia, setTrivia] = React.useState([]);


	
	function toggle() {
		setNewGame(true);
		setTrivia(newTrivia());
	}

	React.useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=base64")
			.then((res) => res.json())
			.then((data) => setData(data.results));
	}, [0]);

	function newTrivia (){ 
		    return data.map((d)=>{
		        let answers =  d.incorrect_answers
		        answers.push(d.correct_answer)
		        return {
		            question:d.question,
		            answers: answers,
		            correct_answer: d.correct_answer,
		            id: nanoid(),
		            selected: false
		        }
		    })
		}


	return (
		<main>
			<div className="top-blob"></div>
			{!newGame 
			? (
				<div className="quiz--intro">
					<h1 className="quiz--title">Quizzical</h1>
					<h2 className="quiz--description">
						Trivia Game wher you can challange yourself
					</h2>
					<button className="quiz--start-button" onClick={toggle}>
						Start Quiz
					</button>
				</div>
			) 
			: 
			(
				<Questions 
					newGame={newGame}
					trivia={trivia}
					key={trivia.id}
				/>
			)}

			<div className="bottom-blob"></div>
		</main>
	);
}

export default App;
