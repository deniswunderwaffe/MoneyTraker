import type {AppProps} from 'next/app'
import '../styles/globals.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import {AppWrapper} from "../utils/globalState";
import Layout from "../layout/Layout";

const queryClient = new QueryClient()

function MyApp({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <AppWrapper>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AppWrapper>
        </QueryClientProvider>)
}

export default MyApp
