import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#242424",
			contrastText: "#fff",
		},
		secondary:{
			main: "#B8B8B8",
		},
		info: {
			main: "#33B1A5"
		}
	},
});

export default theme;
