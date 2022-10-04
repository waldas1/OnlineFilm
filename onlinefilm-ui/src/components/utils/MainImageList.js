import ImageListItem from "@mui/material/ImageListItem";
import {NavLink} from "react-router-dom";
import {CardMedia, ImageList} from "@mui/material";
import {useEffect, useState} from "react";
import {getFilms} from "../api/filmApi";

export default () => {

    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFilms()
            .then(({data}) => setFilms(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);


    return (
        <>
            <ImageList align="center" sx={{
                height: 270,
                mb: 5,
                border: (theme) => `2px solid ${theme.palette.divider}`,
                background: '#212121'
            }}
                       cols={6}
                       rowHeight={100}>
                {films.slice(0, 6).map((film) => (
                    <ImageListItem key={film.id}>
                        <NavLink to={`/film/${film.id}/details`}>
                            <CardMedia
                                sx={{height: 240, width: 150, m: 1}}
                                image={film.filmPic}
                                alt="random"/>
                        </NavLink>
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )
}
