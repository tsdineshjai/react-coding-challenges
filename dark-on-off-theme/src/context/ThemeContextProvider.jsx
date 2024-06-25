/* eslint-disable react/prop-types */
import React from "react";

export const ThemeContext = React.createContext(null);

function ThemeContextProvider({ children }) {
	const [theme, setTheme] = React.useState(false);

	const toggleTheme = () => {
		setTheme(!theme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export default ThemeContextProvider;
