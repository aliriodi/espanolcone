import '../styles/globals.css'
import { store } from "../redux/store";
import { Analytics } from '@vercel/analytics/next';
import { Provider } from "react-redux";
import ReactGA, { initialize } from "react-ga";
import { useSession, SessionProvider } from "next-auth/react";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config';
import Head from 'next/head';
import GoogleAnalytics from './GoogleAnalytics'
import GTMscript from './GoogleGTM';
import LoadScreen from '../components/LoadScreen';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function App({ Component, pageProps }) {
  const router = useRouter()
  
  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init('1143667253742120') // facebookPixelId
        ReactPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
        })
      })
      !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1143667253742120');
fbq('track', 'PageView');

  }, [])
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      </Head>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>

          <Component {...pageProps} />

          {/* Section Google Tag manager */}
          <GTMscript />
          {/* Fin Section */}
          <GoogleAnalytics />
          <Analytics />
          <noscript><img height='1' width='1' style={{display:"none"}}
src="https://www.facebook.com/tr?id=1143667253742120&ev=PageView&noscript=1"
/></noscript>

        </Provider>
      </SessionProvider>
    </>
  )
}

export default appWithTranslation(App, nextI18NextConfig)
