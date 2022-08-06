import React from "react";
import { nanoid } from "nanoid";
import "./style/common.css";

import Intro from './components/Intro';
import Questions from './components/Questions';

function App() {

	const [newGame, setNewGame] = React.useState(false);
	const [data, setData] = React.useState([]);

	/*NEW GAME*/
	function startGame() {
		setNewGame(true);
	}

	React.useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=5&type=multiple")
			.then((res) => res.json())
			.then((data) => setData(newTrivia(data.results)));
	}, [0]);

	function newTrivia (rowData){ 
		return rowData.map((item)=>{
			return{
				id: nanoid(),
				category:item.category,
				correct_answer:item.correct_answer,
				difficulty:item.difficulty,
				question:item.question,
				answers:[...item.incorrect_answers, item.correct_answer].sort((a, b) => 0.5 - Math.random())
			}
		})
	}

		/*LOOP TRIVIA TO FIND THE RIGHT QUESTIONG AND LATER FIND THE RIGHT  ANSWER*/ 
		function selectAnswer (event, triviaId, optId){
			// setTrivia(oldTrivia=>oldTrivia.map((element)=>{
			// 	if(element.id === triviaId){
			// 		let newAnswersArray = element.answers.map((answer)=>{
			// 			return answer.id === optId ? {...answer,selected:true} : {...answer, selected:false}
			// 		});
			// 		return{
			// 			...element,
			// 			answers:newAnswersArray
			// 		};
			// 	}
			// 	else{
			// 		return element
			// 	}
			// }))
		}

	return (
		<main>
			<div className="top-blob"></div>
			{!newGame 
			? (
				<Intro 
					startGame ={startGame}
				/>
			) 
			: 
			(
				<Questions 
					newGame={newGame}
					trivia={data}
					key={data.id}
					selectAnswer={selectAnswer}
				/>
			)
			}

			<div className="bottom-blob"></div>
		</main>
	);
}

export default App;
