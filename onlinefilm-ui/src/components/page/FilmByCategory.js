import {NavLink, useParams} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import {searchFilmByTitleOrCategory} from "../api/filmApi";
import Loading from "../utils/Loading";
import MainImageList from "../utils/MainImageList";
import Container from "@mui/material/Container";
import SelectBar from "../utils/SelectBar";
import {Card, CardContent, CardMedia, createTheme, Grid, Stack, ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

const FilmByCategory = () => {
    const {query} = useParams();
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation('films');

    const fontSize = createTheme({
        typography: {
            fontSize: 12,
            color: "#616161"
        }
    })

    useEffect(() => {
        searchFilmByTitleOrCategory(query)
            .then(({data}) => setFilms(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <MainImageList/>
            {
                loading ? <Loading size={90}/> :
                    <Container sx={{
                        display: 'flex',
                        alignContent: 'left'
                    }}>
                        <SelectBar/>
                        <Stack spacing={4} ml={1}
                               sx={{
                                   width: '100%',
                                   alignContent: 'left',
                                   border: (theme) => `5px solid ${theme.palette.divider}`,
                               }}>
                            {films.map((film) => (
                                <Grid item key={film.id} md={8}>
                                    <Card
                                        sx={{width: '100%', display: 'flex', alignContent: 'center'}}
                                    >
                                        <NavLink to={`/film/${film.id}/details`}>
                                            <CardMedia
                                                sx={{
                                                    height: '300px',
                                                    width: '200px',
                                                    float: 'left',
                                                    pr: '20px',
                                                    pt: '3px',
                                                    position: 'relative'
                                                }}
                                                image={film.filmPic}
                                                alt="random"/>
                                        </NavLink>
                                        <CardContent sx={{flexGrow: 1}}>
                                            <Typography variant="h5" mb={2}>
                                                {film.title}
                                            </Typography>
                                            <ThemeProvider theme={fontSize}>
                                                <Typography mb={2}>{t('description')}: {film.description}</Typography>
                                                <Typography mb={2}>{t('category')}: {film.category}</Typography>
                                                <Typography mb={2}>{t('country')}: {film.country}</Typography>
                                                <Typography mb={2}>{t('date')}:{film.releaseDate}</Typography>
                                            </ThemeProvider>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Stack>
                    </Container>
            }
        </>
    );
}
export default FilmByCategory;