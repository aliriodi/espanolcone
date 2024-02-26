import '../styles/globals.css'
import { store } from "../redux/store";
import { Provider } from "react-redux";
import ReactGA, { initialize } from "react-ga";
import { useSession, SessionProvider } from "next-auth/react";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config';
import Head from 'next/head';
import GoogleAnalytics from './GoogleAnalytics'
import GoogleADS from './GoogleADS';
import LoadScreen from '../components/LoadScreen';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('XXXXXXXXXXXXXXXXXXXXX') // facebookPixelId
        ReactPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
  }, [router.events])
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      </Head>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          {/* <LoadScreen/> */}
          <GoogleADS>
            <Component {...pageProps} />
          </GoogleADS>
          <GoogleAnalytics />
        </Provider>
      </SessionProvider>
    </>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
