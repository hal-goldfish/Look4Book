import { AppProps } from 'next/app'
import { Provider } from '../providers/Providers'
import { useDisclosure } from '@chakra-ui/react'

const App = ({ Component, pageProps }: AppProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <>
            <Provider>
                <Component {...pageProps}/>
            </Provider>
        </>
    )
}

export default App
