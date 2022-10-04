import {Box, CircularProgress} from "@mui/material";

export default ({size}) => (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress size={80}/>
    </Box>
)