import { Html, Head, Main, NextScript } from 'next/document'
//import  GTMnoscript  from './GoogleGTMNoscript'
export default function Document() {
  return (
    <Html lang="en">
      <Head>
      </Head>
      <body className='bg-gray_light'>
        {/* <GTMnoscript /> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
