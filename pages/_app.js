import '../styles/globals.css'
import { store } from "../redux/store";
import { Provider } from "react-redux";
import ReactGA, { initialize } from "react-ga";
import { useSession, SessionProvider } from "next-auth/react";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config';
import Head from 'next/head';
import GoogleAnalytics from './GoogleAnalytics'
import GTMscript from './GoogleGTMscript';
import LoadScreen from '../components/LoadScreen';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function App({ Component, pageProps }) {
  const router = useRouter()

  //Google Tag Manager GTM

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Registra un evento de visualización de página en cada cambio de ruta
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K4B69KPW');
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
//fin GTM

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

          <Component {...pageProps} />

          {/* Section Google Tag manager */}
          <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4B69KPW" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
          {/* Fin Section */}

          <GoogleAnalytics />
        </Provider>
      </SessionProvider>
    </>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
