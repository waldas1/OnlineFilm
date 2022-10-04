import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {Button, CircularProgress, Typography} from "@mui/material";
import {uploadFile} from "../api/fileApi";
import {useRef, useState} from "react";

const uploadValidationSchema = Yup.object().shape(
    {
        multipartFile: Yup.string().required()
    });

export default () => {

    const [fileName, setFileName] = useState('');
    const fileRef = useRef();

    const upload = (values, helpers) => {

        uploadFile(values)
            .then((response) => {
                console.log('success ', response);
                fileRef.current.value = null;
                setFileName('');
            })
            .catch((error) => console.log(error))
            .finally(() => helpers.setSubmitting(false));
    }

    const onChangeFle = (event, props) => {
        const file = event.target.files[0];
        props.setFieldValue('multipartFile', file);
        setFileName(file.name);
    }

    return (
        <Formik
            initialValues={{
                multipartFile: null
            }}

            onSubmit={upload}

            validationSchema={uploadValidationSchema}
        >
            {props => (
                <Form>

                    <Button variant="contained" component="label">
                        Select file
                        <input hidden accept="image/*" multiple
                               type="file"
                               name="multipartFile"
                               ref={fileRef}
                               onChange={(event) => onChangeFle(event, props)}/>
                    </Button> {fileName}

                    <Typography sx={{textAlign: 'right', mt: 2}}>
                        {
                            props.isSubmitting ? <CircularProgress size={40}/> : <Button variant="outlined"
                                                                                         type="submit"
                                                                                         color="primary">Upload
                                film</Button>
                        }

                    </Typography>
                </Form>
            )}
        </Formik>
    );
}