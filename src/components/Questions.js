import React from "react";
import "../style/questions.css";
import { nanoid } from "nanoid";

import Option from './Option'




export default function Questions(props) {
	const he = require('he')

	function styles(selected){
		return{
			backgroundColor: selected ? "#D6DBF5" : "#FFFFFF",
		}
	}
	const trivia = props.trivia;
	
	const triviaElements = trivia.map((element) => {
		return (
			<div key={element.id}>
				<h2 className="question--title">{he.decode(element.question)}</h2>
				{/* <Option 

				/> */}
				{/* <div className="question--answers">{options(element.answers, element.id)}</div> */}
				<hr />
			</div>
		);
	});

	function options(optionArr, triviaId) {
		return optionArr.map((opt) => {
			return (
				<div key={opt.id}
					className="question--option" 
					style={styles(opt.selected)} 
					onClick={(event)=>props.selectAnswer(event, triviaId, opt.id)}
					>
						{opt.value}
				</div>
			);
		});
	}


	return (
		<div className="question--trivia">
			<div className="container">
				{triviaElements}
			</div>
			<button className="question--chek-answers">Check Answers</button>
		</div>
	);
}
