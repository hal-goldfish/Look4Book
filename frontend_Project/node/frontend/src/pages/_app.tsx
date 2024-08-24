import { AppProps } from 'next/app'
import { Provider } from '../providers/Providers'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Provider>
                <Component {...pageProps}/>
            </Provider>
        </>
    )
}

export default App
