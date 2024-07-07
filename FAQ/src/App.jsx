/* eslint-disable react/prop-types */
import React from "react";
import "./App.css";

const questions = [
	{
		question: "How many bones does a cat have?",
		answer: "A cat has 230 bones - 6 more than a human",
	},
	{
		question: "How much do cats sleep?",
		answer: "The average cat sleeps 12-16 hours per day",
	},
	{
		question: "How long do cats live",
		answer:
			"Outdoor cats live 5 years on average. Indoor\ncats live 15 years on average.",
	},
];
function App() {
	return (
		<section>
			<p className="header">FAQ Component</p>

			<div className="questionContainer">
				{questions.map((question, index) => (
					<Question key={question.question} {...question} ind={index} />
				))}
			</div>
		</section>
	);
}

export default App;

function Question({ question, answer, ind }) {
	const [showAnswer, setShowAnswer] = React.useState(false);

	function handleAnswer() {
		setShowAnswer((prev) => !prev);
	}
	return (
		<section className="faqWrapper">
			<p className="faq">
				<span
					className={showAnswer ? "animate" : "retract"}
					onClick={handleAnswer}
				>
					△
				</span>
				{question}
			</p>
			<p
				className={
					(ind == 0 ? !showAnswer : showAnswer) ? " showAnswer " : "answer"
				}
			>
				{answer}
			</p>
		</section>
	);
}
