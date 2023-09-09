import '../styles/globals.css'
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { useSession, SessionProvider } from "next-auth/react";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config';

function App({ Component, pageProps }) {

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>)
}

export default appWithTranslation(App, nextI18NextConfig)
