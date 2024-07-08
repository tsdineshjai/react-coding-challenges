/* eslint-disable react/prop-types */
import "./Box.css";

function Box({ number, index, solvedList, handleClick, opened }) {
	const getClassNames = () => {
		if (solvedList.includes(number)) {
			return "remove";
		}
		if (opened.includes(index)) {
			return "show";
		}
	};

	return (
		<div
			className={`boxContainer ${getClassNames()}`}
			onClick={() => handleClick(index)}
		>
			<span> {number}</span>
		</div>
	);
}

export default Box;
