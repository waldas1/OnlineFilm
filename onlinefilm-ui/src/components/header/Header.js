import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {
    alpha,
    Avatar,
    Divider,
    IconButton,
    InputBase,
    ListItemIcon,
    Menu,
    MenuItem,
    styled,
    Tooltip
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import {useDispatch, useSelector} from "react-redux";
import {Logout} from "@mui/icons-material";
import {removeUser} from "../../store/slice/userSlice";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import LanguageSwither from "../utils/LanguageSwither";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation('header');

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        dispatch(removeUser());
        navigate("/");
    }
    const [query, setQuery] = useState("");


    return (
        <>
            <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
            <CssBaseline/>
            <AppBar
                position="sticky"
                color="default"
                elevation={0}
                sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
            >
                <Toolbar sx={{flexWrap: 'wrap'}}>
                    <Typography variant="h6"
                                color="white"
                                noWrap sx={{flexGrow: 1, textDecoration: 'unset'}}
                                to="/"
                                component={NavLink}>
                        <CameraRollIcon/>
                        Online Films
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            type="text"
                            name="query"
                            className="input"
                            placeholder={t('search')}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />

                        <Button to={`/film/search/${query}`}
                                component={NavLink}>Go
                        </Button>
                    </Search>
                    <nav>
                        {
                            user?.roles.includes('ADMIN') &&
                            <Link
                                variant="button"
                                color="text.primary"
                                to="/film/create"
                                component={NavLink}
                                sx={{my: 1, mx: 1.5, textDecoration: 'unset'}}>
                                {t('addNewFilm')}
                            </Link>
                        }
                        <Link
                            variant="button"
                            color="text.primary"
                            to="/user/registration"
                            component={NavLink}
                            sx={{my: 1, mx: 1.5, textDecoration: 'unset'}}>
                            {t('registration')}
                        </Link>
                    </nav>
                    <LanguageSwither/>
                    {
                        user ?
                            <>
                                <Tooltip title="User account">
                                    <IconButton
                                        size="small"
                                        onClick={handleClick}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}>
                                        <Avatar sx={{width: 32, height: 32}}/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                >
                                    <MenuItem>
                                        <Avatar/> {user.fullName}
                                    </MenuItem>
                                    <Divider/>
                                    <MenuItem onClick={onLogout}>
                                        <ListItemIcon>
                                            <Logout fontSize="small"/>
                                        </ListItemIcon>
                                        {t('logout')}
                                    </MenuItem>
                                </Menu>
                            </> :
                            <Button to="/login"
                                    component={NavLink}
                                    variant="outlined" sx={{my: 1, mx: 1.5}}>
                                {t('login')}
                            </Button>
                    }
                </Toolbar>
            </AppBar>
        </>
    );
}