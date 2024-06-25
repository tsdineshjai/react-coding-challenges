import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContextProvider";

export const useThemeProvider = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return {
		theme,
		toggleTheme,
	};
};
