import Container from '@mui/material/Container';
import {Route, Routes} from "react-router-dom";
import Films from "../page/Films";
import Registration from "../forms/Registration";
import AddNewFilm from "../forms/AddNewFilm";
import FilmDetails from "../page/FilmDetails";
import Login from "../forms/Login";
import SecuredRoute from "../security/SecuredRoute";
import AddComment from "../forms/AddComment";
import Comments from "../utils/Comments";
import FilmByCategory from "../page/FilmByCategory";
import UploadFile from "../forms/UploadFile";

export default () => {
    return (
        <Container maxWidth="lg" component="main" sx={{minHeight: 'min', mt: 8}}>
            <Routes>
                <Route path="/" element={<Films/>}/>
                <Route path="/user/registration" element={<Registration/>}/>

                <Route path="/film/create" element={<SecuredRoute roles={['ADMIN']}/>}>
                    <Route path="/film/create" element={<AddNewFilm/>}/>
                </Route>

                <Route path="/login" element={<Login/>}/>
                <Route path="/film/:filmId/details" element={<FilmDetails/>}/>

                <Route path="/film/:filmId/comment" element={<Comments/>}/>

                <Route path="/film/:filmId/comment" element={<SecuredRoute roles={['USER', 'ADMIN']}/>}>
                    <Route path="/film/:filmId/comment" element={<AddComment/>}/>
                </Route>

                <Route path="/film/search/:query" element={<FilmByCategory/>}></Route>
                <Route path="/file/upload" element={<UploadFile/>}/>

            </Routes>
        </Container>
    );
}