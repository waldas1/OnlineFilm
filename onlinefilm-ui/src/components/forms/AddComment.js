import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import {addComment} from "../api/commentApi";
import {Button, CircularProgress, Stack} from "@mui/material";
import {Form, Formik} from "formik";
import {useParams} from "react-router-dom";
import FormTextInput from "../utils/FormTextInput";
import {useTranslation} from "react-i18next";

const commentValidation = Yup.object().shape(
    {
        comment: Yup.string().required(),
    }
);

export default () => {
    const {filmId} = useParams();
    const {t} = useTranslation('addComment');

    const onAddNewComment = (values, helpers) => {
        console.log(values);
        helpers.setSubmitting(true);

        addComment(filmId, values)
            .then((response) => helpers.resetForm())
            .catch((error) => console.log(error))
            .finally(() => helpers.setSubmitting(false));
    }

    return (
        <Formik
            initialValues={
                {
                    comment: ''
                }
            }
            onSubmit={onAddNewComment}
            validationSchema={commentValidation}>
            {props => (
                <Form>
                    <Box spacing={1}>
                        <FormTextInput name="comment"
                                       label={t('name')}
                                       placeholder={t('name')}
                                       error={props.touched.comment && !!props.errors.comment}
                                       rows={2}
                                       multiline/>
                        <Typography sx={{textAlign: 'right', mt: 2}}>
                            {props.isSubmitting ? <CircularProgress size={40}/> : <Button variant="outlined"
                                                                                          type="submit"
                                                                                          color="primary">{t('submit')}</Button>}
                        </Typography>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
