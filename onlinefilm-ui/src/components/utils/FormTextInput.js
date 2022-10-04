import {ErrorMessage, Field} from "formik";
import {FormControl, FormHelperText, TextField} from "@mui/material";

export default ({name, label, error, placeholder = 'Type here...', ...props}) => (
    <FormControl error={error}>
        <Field id={name}
               name={name}
               label={label}
               placeholder={placeholder}
               as={TextField}
               error={error}
               {...props}/>
        <ErrorMessage name={name}
                      component={FormHelperText}/>
    </FormControl>
)