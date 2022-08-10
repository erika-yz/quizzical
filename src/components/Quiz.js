import "../style/questions.css";
import Question from "../components/Question";

export default function Quiz(props) {
	const trivia = props.trivia;

	const triviaQuestions = trivia.map((item) => {
		return (
			<Question
				{...item}
				key={item.triviaId}
				selectAnswer={props.selectAnswer}
                answersChecked={props.answersChecked}
			/>
		);
	});

	return (
		<div className="question--trivia">
			<div className="container">{triviaQuestions}</div>
			{!props.answersChecked ? (
				<button 
                    className="question--chek-answers" 
                    onClick={props.checkAnswer}
                >
					Check Answers
				</button>
			) : (
				<div>
                    <span>You scored {props.totalScore} / 5 correct answers </span>
                    <button 
                        className="question--chek-answers"
                        onClick={props.endGame}
                    >
                        Play Again
                    </button>
                </div>
			)}
		</div>
	);
}
