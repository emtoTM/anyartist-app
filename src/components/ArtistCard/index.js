import { useContext, useState, useEffect } from "react";
import { MovieFavoriteContext, ShoppingCartContext } from "../../context";
import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Chip,
	Rating,
	Stack,
	Button,
	ButtonGroup,
	IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ContactlessIcon from '@mui/icons-material/Contactless';
import AppleIcon from '@mui/icons-material/Apple';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const CardMovie = ({ movie }) => {
	const { addToFavorite, isIncludeInFavorites, removeFavorite } =
		useContext(MovieFavoriteContext);

	// sirve para saber si debemos pintar el corazon
	const [value, setValue] = useState(0);

	const StyledRating = styled(Rating)({
		"& .MuiRating-iconFilled": {
			color: "#ff6d75",
		},
		"& .MuiRating-iconHover": {
			color: "#ff3d47",
		},
	});

	const handleChangeFavorite = (event, newValue) => {
		if (newValue === 1) {
			addToFavorite(movie);
		} else {
			removeFavorite(movie.imdbID);
		}
		setValue(newValue);
	};

	useEffect(() => {
		const pintado = isIncludeInFavorites(movie.imdbID);
		setValue(pintado);
	}, [value]);

	return (
		<Grid item xs={12} md={4} my={2}>
			<Card
				sx={{
					height: 400,
					bgcolor: 'primary.main',
				}}
			>
				<CardMedia
					component="img"
					height="240"
					sx={{
						objectPosition: "top",
					}}
					image={movie.artist.avatar}
				/>
				<CardContent>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography
								variant="h6"
								color= "#33B1A5"
								sx={{ fontWeight: "bold"}}
							>
								{movie.artist.name}
							</Typography>
							<Typography variant="caption" color="white">
								Links:
								<IconButton target="_blank" color="info" href={movie.artist.weburl}>
                    				<AppleIcon fontSize="large"/>
                  				</IconButton>
                  				<IconButton target="_blank" color="info" href="https://www.spotify.com/">
                    				<ContactlessIcon fontSize="large"/>
                  				</IconButton>     
							</Typography>

						</Grid>
						<Grid item xs={12} mr={0}>
							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<StyledRating
									max={1}
									value={value}
									icon={<StarIcon color="info" fontSize="inherit" />}
									emptyIcon={
										<StarBorderIcon color="info" fontSize="inherit" />
									}
									onChange={(event, newValue) =>
										handleChangeFavorite(event, newValue)
									}
								/>
							</Stack>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default CardMovie;
