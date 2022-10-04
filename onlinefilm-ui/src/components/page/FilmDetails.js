import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getFilm} from "../api/filmApi";
import Loading from "../utils/Loading";
import Container from "@mui/material/Container";
import {Card, CardContent, CardMedia, createTheme, Grid, Stack, ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";
import MainImageList from "../utils/MainImageList";
import AddComment from "../forms/AddComment";
import {useSelector} from "react-redux";
import Comments from "../utils/Comments";
import SelectBar from "../utils/SelectBar";
import {useTranslation} from "react-i18next";

export default () => {
    const user = useSelector(state => state.user.user);
    const {filmId} = useParams();
    const [film, setFilm] = useState({});
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation('films');
    const fontSize = createTheme({
        typography: {
            fontSize: 12,
        }
    });

    useEffect(() => {
        getFilm(filmId)
            .then(({data}) => setFilm(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <MainImageList/>
            {
                loading ? <Loading size={50}/> :
                    <Container sx={{display: 'flex', alignContent: 'left'}}>
                        <SelectBar/>
                        <Container>
                            <Container spacing={4} mt={4}
                                       sx={{
                                           width: '100%',
                                           alignContent: 'left',
                                           border: (theme) => `5px solid ${theme.palette.divider}`,
                                           margin: '4px',
                                       }}>
                                <Grid>
                                    <Card sx={{width: '100%', display: 'flex', alignContent: 'center'}}>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                height: '400px',
                                                width: '300px',
                                                float: 'left',
                                                pr: '20px',
                                                pt: '3px',
                                                position: 'relative'
                                            }}
                                            image={film.filmPic}
                                            alt="random"/>
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
                            </Container>
                            <Container>
                                <Container sx={{height: '300px'}}>
                                    <div className="box">
                                        <iframe src={film.filmVideo} allowFullScreen></iframe>
                                    </div>
                                </Container>
                                <Grid sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    flexDirection: 'column',
                                    marginTop: 10
                                }}>
                                    <Comments/>
                                    {
                                        user &&
                                        <AddComment/>
                                    }
                                </Grid>
                            </Container>
                        </Container>
                    </Container>
            }
        </>
    );
}
