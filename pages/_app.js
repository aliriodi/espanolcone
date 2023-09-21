import '../styles/globals.css'
import { store } from "../redux/store";
import { Provider } from "react-redux";
import ReactGA, { initialize } from "react-ga";
import { useSession, SessionProvider } from "next-auth/react";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config';
import Head from 'next/head';

const TRAKING_ID ='G-DVGE2GBTSL';
ReactGA,initialize(TRAKING_ID);
function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </>
    )
}

export default appWithTranslation(App, nextI18NextConfig)
