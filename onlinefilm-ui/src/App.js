import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import {BrowserRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import store from "./store/store";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Header/>
                    <Content/>
                    <Footer/>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
}

export default App;