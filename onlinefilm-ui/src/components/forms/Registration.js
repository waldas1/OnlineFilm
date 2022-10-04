import {Form, Formik} from "formik";
import {Alert, Button, CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import FormTextInput from "../utils/FormTextInput";
import {useState} from "react";
import {createNewUser} from "../api/userApi";
import {useTranslation} from "react-i18next";

export default () => {

    const [notification, setNotification] = useState({isVisible: false});
    const {t} = useTranslation('registration');

    const userValidation = Yup.object().shape(
        {
            name: Yup.string()
                .min(5, t('nameMin'))
                .max(10, t('nameMax'))
                .required(t('nameRequired')),
            surname: Yup.string()
                .min(5, t('surnameMin'))
                .max(20, t('surnameMax'))
                .required(t('surnameRequired')),
            username: Yup.string()
                .min(5, t('usernameMin'))
                .max(20, t('usernameMax'))
                .required(t('usernameRequired')),
            password: Yup.string()
                .min(8, t('passwordMin'))
                .max(12, t('passwordMax'))
                .required(t('passwordRequired')),
            repeatPassword: Yup.string()
                .min(8, t('repeatPasswordMin'))
                .max(12, t('repeatPasswordMax'))
                .required(t('repeatPasswordRequired'))
                .oneOf([Yup.ref('password'), null], t('repeatPasswordOneOf')),
        });


    const onAddNewUser = (values, helpers) => {
        helpers.setSubmitting(true);

        createNewUser(values)
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
        <Formik
            initialValues={
                {
                    name: '',
                    surname: '',
                    username: '',
                    password: '',
                    repeatPassword: ''
                }
            }
            onSubmit={onAddNewUser}

            validationSchema={userValidation}>

            {props => (
                <Form>
                    <Stack spacing={1}>
                        <Typography variant="5">Register user</Typography>
                        <FormTextInput name="name"
                                       label={t('labelName')}
                                       placeholder={t('name')}
                                       error={props.touched.name && !!props.errors.name}/>
                        <FormTextInput name="surname"
                                       label={t('labelSurname')}
                                       placeholder={t('surname')}
                                       error={props.touched.surname && !!props.errors.surname}/>
                        <FormTextInput name="username"
                                       label={t('labelUsername')}
                                       placeholder={t('username')}
                                       error={props.touched.username && !!props.errors.username}/>
                        <FormTextInput name="password"
                                       label={t('labelPassword')}
                                       placeholder={t('password')}
                                       error={props.touched.password && !!props.errors.password}/>
                        <FormTextInput name="repeatPassword"
                                       label={t('labelRpassword')}
                                       placeholder={t('rpassword')}
                                       error={props.touched.repeatPassword && !!props.errors.repeatPassword}/>
                    </Stack>
                    <Typography sx={{textAlign: 'right', mt: 2}}>
                        {
                            props.isSubmitting ? <CircularProgress size={40}/> : <Button variant="outlined"
                                                                                         type="submit"
                                                                                         color="primary">{t('register')}</Button>
                        }
                    </Typography>
                    {
                        notification.isVisible &&
                        <Alert severity={notification.severity}>{notification.message}</Alert>
                    }
                </Form>
            )}
        </Formik>
    );
}