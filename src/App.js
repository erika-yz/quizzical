import React from "react";
import { nanoid } from "nanoid";
import "./style/common.css";

import Intro from './components/Intro';
import Questions from './components/Questions';
import Quiz from './components/Quiz'

function App() {

	const [newGame, setNewGame] = React.useState(false);
	const [trivia, setTrivia] = React.useState([])
	const [data, setData] = React.useState([]);
	const [totalScore, setTotalScore] = React.useState(0)
	const [answersChecked, setAnswersChecked] = React.useState(false);

	/*NEW GAME*/
	function startGame() {
		setNewGame(true)
		setData(newTrivia(trivia))
		
	}

	function endGame() {
		setNewGame(false)
		setTotalScore(0)
		setAnswersChecked(false)
		startGame()
	}

	React.useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
			.then((res) => res.json())
			.then((data) => setTrivia(data.results));
	}, [newGame]);

	function newTrivia (rowData){ 
		return rowData.map((item)=>{
			return{
				triviaId: nanoid(),
				category:item.category,
				correct_answer:item.correct_answer,
				difficulty:item.difficulty,
				question:item.question,
				answers:shuffleItems([...item.incorrect_answers, item.correct_answer]), 
				score: 0			}
		})
		
	}

	function shuffleItems(items){
		let randomItems = items.sort((a, b) => 0.5 - Math.random())

		return randomItems.map((item)=>{
			return {
				id: nanoid(),
				selected:false,
				value: item

			}
		})
	}

	function checkAnswer() {
		setAnswersChecked(true)
		setData(oldData => oldData.map((element)=>{
			const correct_answer = element.correct_answer
			let points = 0
			let answersArray = element.answers.map((asnwer)=>{
				if(asnwer.selected && asnwer.value === correct_answer){
					setTotalScore(oldScore => oldScore + 1)
					points = 1
				}
				return asnwer
			})
			return{
				...element,
				answersChecked:true,
				score:points
			}
		}))


	}

	function selectAnswer(triviaId, answerId){
			setData(oldTrivia=>oldTrivia.map((element)=>{
			if(element.triviaId === triviaId){
				let newAnswersArray = element.answers.map((answer)=>{
					return answer.id === answerId ? {...answer,selected:true} : {...answer, selected:false}
				});
				return{
					...element,
					answers:newAnswersArray
				};
			}
			else{
				return element
			}
		}))
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
				<Quiz 
					trivia={data}
					selectAnswer={selectAnswer}
					checkAnswer={checkAnswer}
					answersChecked={answersChecked}
					totalScore ={totalScore}
					endGame = {endGame}
				/>
			
			)
			}

			<div className="bottom-blob"></div>
		</main>
	);
}

export default App;
