import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { styled, useTheme } from "@mui/material/styles";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import {
	Box,
	Toolbar,
	List,
	CssBaseline,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const DrawerButton = ({ text, icon, action }) => {
	const pathname = window.location.pathname.replace("/", "");
	const isSelected = pathname === text.toLowerCase();
	return (
		<ListItem
			selected={isSelected}
			key={text}
			disablePadding
			sx={{ display: "block" }}
		>
			<ListItemButton onClick={action}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={text} />
			</ListItemButton>
		</ListItem>
	);
};

const MainLayout = () => {
	const history = useNavigate();
	const { user, logout, isAuth } = useContext(AuthContext);

	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const handleDrawer = () => setOpen(!open);

	if (!isAuth()) {
		return <Navigate to="/" />;
	}

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<Stack
						sx={{
							width: "100%",
						}}
						direction="row"
						justifyContent="space-between"
					>
						<Typography variant="h6" noWrap component="div">
							AnyArtistApp
						</Typography>
					</Stack>
					<DrawerButton
						icon={<SearchIcon color="info"/>}
						text="Search"
						action={() => history("/search")}
					/>
					{/* Favorites */}
					<DrawerButton
						icon={<FavoriteIcon color="info"/>}
						text="Favorites"
						action={() => history("/favorites")}
					/>
					<DrawerButton
						icon={<LogoutIcon color="error" />}
						text="Logout"
						action={logout}
					/>
				</Toolbar>
			</AppBar>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default MainLayout;