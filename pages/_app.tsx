import type {AppProps} from 'next/app'
import '../styles/globals.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import {AppWrapper} from "../utils/globalState";
import Layout from "../layout/Layout";
import {orange} from '@mui/material/colors';
import {createTheme, ThemeOptions, ThemeProvider} from '@mui/material';


const queryClient = new QueryClient();
export const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#c7cbe2',
        },
        secondary: {
            main: '#f50057',
        },
    },
};
const theme = createTheme(themeOptions);

function MyApp({Component, pageProps}: AppProps) {

    return (
        <QueryClientProvider client={queryClient}>
            <AppWrapper>
                <ThemeProvider theme={theme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </AppWrapper>
        </QueryClientProvider>)
}

export default MyApp
