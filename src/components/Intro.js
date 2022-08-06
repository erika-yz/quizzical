export default function Intro(props) {
	return (
		<div className="quiz--intro">
			<h1 className="quiz--title">Quizzical</h1>
			<h2 className="quiz--description">
				Trivia Game wher you can challange yourself
			</h2>
			<button className="quiz--start-button" onClick={props.startGame}>
				Start Quiz
			</button>
		</div>
	);
}
