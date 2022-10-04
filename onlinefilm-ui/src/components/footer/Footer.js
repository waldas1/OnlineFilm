import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {NavLink} from "react-router-dom";

export default () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center"
                    sx={{
                        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                        py: [2, 4],
                        //position: "fixed",
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}>

            {'Copyright © '}
            <Link color="inherit"
                  to="/"
                  component={NavLink}>
                OnlineFilm
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}