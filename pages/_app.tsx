import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/authContext';
import Navbar from '../components/ui/navbar';


function MyApp({ Component, pageProps }: AppProps) {
  return <AuthContextProvider><Navbar><Component {...pageProps} /></Navbar></AuthContextProvider>
}

export default MyApp
