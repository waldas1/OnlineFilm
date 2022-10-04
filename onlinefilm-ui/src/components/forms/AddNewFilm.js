import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {
    Alert,
    Button,
    CircularProgress,
    FormControl, FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {addFilm} from "../api/filmApi";
import FormTextInput from "../utils/FormTextInput";
import Typography from "@mui/material/Typography";
import UploadFile from "./UploadFile";
import Container from "@mui/material/Container";
import {useTranslation} from "react-i18next";


export default () => {

    const [notification, setNotification] = useState({isVisible: false});

    const [category, setCategory] = useState('');
    const {t} = useTranslation('addNewFilm');

    const filmValidationSchema = Yup.object().shape({
        filmPic: Yup.string()
            .required(t('required')),
        filmVideo: Yup.string()
            .required(t('required')),
        category: Yup.string()
            .required(t('required')),
        country: Yup.string()
            .max(20, t('countryMax'))
            .required(t('required')),
        description: Yup.string()
            .required(t('required')),
        title: Yup.string()
            .required(t('required')),
        releaseDate: Yup.string()
            .typeError(t('dateError'))
            .required(t('required')),
    });

    const onAddNewFilm = (values, helpers) => {
        helpers.setSubmitting(true);

        addFilm(values)
            .then((response) => {
                helpers.resetForm();
                setNotification({
                    isVisible: true,
                    message: t('successes'),
                    severity: 'success'
                });
            })
            .catch((error) => setNotification({
                isVisible: true,
                message: t('error'),
                severity: 'error'
            }))
            .finally(() => helpers.setSubmitting(false))

    }

    return (
        <Formik initialValues={{
            filmPic: '',
            filmVideo: '',
            category: '',
            country: '',
            description: '',
            title: '',
            releaseDate: ''
        }}
                onSubmit={onAddNewFilm}
                validationSchema={filmValidationSchema}
        >
            {props => (

                <Form sx={{background: '#212121'}}>
                    {
                        notification.isVisible &&
                        <Alert severity={notification.severity}>{notification.message}</Alert>
                    }
                    <Container sx={{background: '#212121'}}>
                        <Stack spacing={1}>
                            <Typography variant="h5">Add film:</Typography>
                            <FormTextInput name="filmPic"
                                           label={t('filmPic')}
                                           placeholder={t('filmPicHolder')}
                                           error={props.touched.filmPic && !!props.errors.filmPic}/>
                            <FormTextInput name="filmVideo"
                                           label={t('filmVideo')}
                                           placeholder={t('filmPlaceHolder')}
                                           error={props.touched.filmVideo && !!props.errors.filmVideo}/>
                            <FormControl>
                                <InputLabel id="category">Category</InputLabel>
                                <Field id="category"
                                       name="category"
                                       labelId="category"
                                       label={t('category')}
                                       placeholder="demo-simple-select-label"
                                       as={Select}>
                                    <MenuItem value="Action">{t('action')}</MenuItem>
                                    <MenuItem value="Comedy">{t('comedy')}</MenuItem>
                                    <MenuItem value="Drama">{t('drama')}</MenuItem>
                                    <MenuItem value="Fantasy">{t('fantasy')}</MenuItem>
                                    <MenuItem value="Horror">{t('horror')}</MenuItem>
                                    <MenuItem value="Mystery">{t('mystery')}</MenuItem>
                                    <MenuItem value="Romance">{t('romance')}</MenuItem>
                                    <MenuItem value="Thriller">{t('thriller')}</MenuItem>
                                    <MenuItem value="Western">{t('western')}</MenuItem>
                                </Field>
                            </FormControl>
                            <FormTextInput name="country"
                                           label={t('country')}
                                           placeholder={t('country')}
                                           error={props.touched.country && !!props.errors.country}/>
                            <FormTextInput name="description"
                                           label={t('description')}
                                           placeholder={t('description')}
                                           error={props.touched.description && !!props.errors.description}
                                           rows={3}
                                           multiline/>
                            <FormTextInput name="title"
                                           label={t('title')}
                                           placeholder={t('title')}
                                           error={props.touched.title && !!props.errors.title}/>
                            <FormTextInput name="releaseDate"
                                           label={t('date')}
                                           placeholder="dd.MM.yyyy"
                                           error={props.touched.releaseDate && !!props.errors.releaseDate}/>
                        </Stack>
                        <Typography sx={{textAlign: 'right', mt: 2}}>
                            {props.isSubmitting ? <CircularProgress size={40}/> : <Button variant="outlined"
                                                                                          type="submit"
                                                                                          color="primary">{t('submit')}</Button>}
                        </Typography>
                    </Container>
                </Form>
            )}
        </Formik>
    );
}