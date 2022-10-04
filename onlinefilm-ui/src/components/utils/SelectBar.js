import Container from "@mui/material/Container";
import {createTheme, ThemeProvider, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default () => {
    const {t} = useTranslation('selectBar');
    const fontSize = createTheme({
        typography: {
            fontSize: 18,
        }
    })
    return (
        <>

            <Container spacing={4} mt={4} mr={3}
                       sx={{
                           width: '50%',
                           alignContent: 'left',
                           border: (theme) => `5px solid ${theme.palette.divider}`,
                           display: 'flex',
                           flexDirection: 'column',
                           background: '#212121',
                           position: 'relative'
                       }}>

                <ThemeProvider theme={fontSize}>
                    <Typography m={3}
                                component={NavLink}
                                to={"/film/search/Action"}>{t('action')}</Typography>
                    <Typography m={3}
                                component={NavLink}
                                to={`/film/search/Comedy`}>{t('comedy')}</Typography>
                    <Typography m={3}
                                component={NavLink}
                                to={`/film/search/Drama`}>{t('drama')}</Typography>
                    <Typography m={3}
                                component={NavLink}
                                to={`/film/search/Fantasy`}>{t('fantasy')}</Typography>
                    <Typography m={3}
                                component={NavLink}
                                to={`/film/search/Horror`}>{t('horror')}</Typography>
                    <Typography m={3}
                                component={NavLink}
                                to={`/film/search/Mystery`}>{t('mystery')}</Typography>
                    <Typography m={3}
                                component={NavLink}
                                to={`/film/search/Romance`}>{t('romance')}</Typography>
                    <Typography m={3}
                                component={NavLink}
                                to={`/film/search/Thriller`}>{t('thriller')}</Typography>
                    <Typography m={3}
                                component={NavLink}
                                to={`/film/search/Western`}>{t('western')}</Typography>
                </ThemeProvider>
            </Container>

        </>
    )
}
