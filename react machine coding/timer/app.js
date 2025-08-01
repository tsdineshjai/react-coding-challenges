import React from "react";
import "./styles.css";

export default function App() {
	const [date, setDate] = React.useState(null);

	React.useEffect(() => {
		const timerID = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => {
			clearInterval(timerID);
		};
	}, []);

	const formatTime = (time) => (time < 10 ? `0${time}` : time);

	const hours = formatTime(date.getHours());
	const minutes = formatTime(date.getMinutes());
	const seconds = formatTime(date.getSeconds());

	if (date == null) return null;

	return <div className="App">{`${hours}: ${minutes}: ${seconds}`}</div>;
}
