import React from "react";
import "../style/questions.css";
import { nanoid } from "nanoid";

export default function Questions(props) {
	const styles = {
		backgroundColor: "#D6DBF5",
	};
	const trivia = props.trivia;

	const triviaElements = trivia.map((element) => {
		return (
			<div key={element.id}>
				<h2 className="question--title">{b64_to_utf8(element.question)}</h2>
				<div className="question--answers">{options(element.answers)}</div>
				<hr />
			</div>
		);
	});

	function options(optionArr) {
		return optionArr.map((opt) => {
			return (
				<div key={nanoid()} className="question--option" style={styles}>
					{b64_to_utf8(opt)}
				</div>
			);
		});
	}

	function b64_to_utf8(str) {
		return decodeURIComponent(escape(window.atob(str)));
	}

	return <div className="container">{triviaElements}</div>;
}
