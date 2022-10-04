import * as Yup from 'yup';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {login} from "../api/loginApi";
import {addUserState} from "../../store/slice/userSlice";
import {Form, Formik} from "formik";
import {Alert, Button, CircularProgress, Stack} from "@mui/material";
import FormTextInput from "../utils/FormTextInput";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

const loginValidationSchema = Yup.object().shape(
    {
        username: Yup.string().required(),
        password: Yup.string().required()
    }
);

export default () => {

    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation('login');

    const onLogin = (data, helpers) => {
        login(data)
            .then(({data, headers}) => {
                dispatch(addUserState(
                    {
                        user: data,
                        jwtToken: headers.authorization
                    }));
                navigate('/');
            })
            .catch((error) => setError(true))
            .finally(() => helpers.setSubmitting(false));
    }

    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}

            validationSchema={loginValidationSchema}
            onSubmit={onLogin}>

            {
                props => (
                    <Form>
                        <Stack spacing={1}
                               sx={{
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   height: '80vh',
                                   border: (theme) => `5px solid ${theme.palette.divider}`,
                                   background: '#212121',
                               }}>
                            {error && <Alert severity="error">Bad credentials</Alert>}
                            <FormTextInput name="username"
                                           label={t('username')}
                                           placeholder={t('username')}
                                           error={props.touched.username && !!props.errors.username}>
                            </FormTextInput>
                            <FormTextInput name="password"
                                           label={t('password')}
                                           placeholder={t('password')}
                                           error={props.touched.username && !!props.errors.username}>
                            </FormTextInput>
                            <Typography sx={{textAlign: 'right', mt: 2}}>
                                {props.isSubmitting ? <CircularProgress size={40}/> : <Button variant="outlined"
                                                                                              type="submit"
                                                                                              color="primary">{t('submit')}</Button>}
                            </Typography>
                        </Stack>
                    </Form>
                )
            }
        </Formik>
    );
}

