import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Avatar, Paper, Grid, Divider} from "@mui/material";
import {deleteComment, getComments} from "../api/commentApi";
import Loading from "./Loading";
import {useSelector} from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";

export default () => {
    const {filmId} = useParams();

    const user = useSelector(state => state.user.user);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation('comment');

    const onDeleteComment = (commentId) => {
        deleteComment(commentId)
            .then(() => {
                setComments(comments.filter(c => c.id !== commentId))
            })
            .catch((error) => console.log(error))
            .finally()
    }

    useEffect(() => {
        getComments(filmId)
            .then(({data}) => setComments(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div>Comments</div>
            {
                loading ? <Loading size={50}/> :
                    <Paper style={{padding: "40px 20px"}}>
                        <Grid wrap="nowrap"
                              spacing={2}
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column'
                              }}>

                            {comments.map((comment) => (
                                <Grid key={comment.id} item><Avatar/>
                                    <Grid justifyContent="left">
                                        <h4 sx={{
                                            margin: 0,
                                            textAlign: "left"
                                        }}>
                                            {comment.username}</h4>
                                        <p sx={{
                                            textAlign: 'left',
                                            border: '5px solid white'
                                        }}>
                                            {t('comment')}: {comment.comment}</p>
                                        {
                                            user ?.roles.includes('ADMIN') &&
                                            <div align="right">
                                                <Button variant="outlined" color="error"
                                                        onClick={() => onDeleteComment(comment.id)}>
                                                    <DeleteForeverIcon/>
                                                </Button>
                                            </div>
                                        }
                                        <p sx={{
                                            textAlign: 'left',
                                            color: 'gray',
                                            textSizeSmall: 2
                                        }}>
                                            {t('date')}: {comment.date}</p>
                                    </Grid>
                                    <Divider variant="fullWidth" style={{margin: "30px 0"}}/>
                                </Grid>
                            ))}
                        </Grid>

                    </Paper>
            }
        </>
    );
}