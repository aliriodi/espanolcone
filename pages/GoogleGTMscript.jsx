"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { useEffect } from "react"

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const GTM_ID = 'GTM-K4B69KPW';
  const pageview = (url) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "pageview",
        page: url,
      });
    } else {
      console.log({
        event: "pageview",
        page: url,
      });
    }
  };


  useEffect(() => {
    if (pathname) {
      pageview(pathname)
    }
  }, [pathname, searchParams])

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());
  gtag('config', 'AW-11324663584');

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11324663584"></script>
   

      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${GTM_ID}');
  `,
        }}
      />
    </>
  )
}

// import Script from 'next/script';

// export default function GTMscript() {
//   <>



//    {/* <Script
//                 strategy="afterInteractive"
//                 src={"https://www.googletagmanager.com/ns.html?id=GTM-K4B69KPW"}
//             /> */}
//    {/* <Script id='iframe'><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4B69KPW" height="0" width="0" style={{ visibility: 'hidden' }}></iframe></Script> */}
   

//     {/* <Script id="google-tag-manager" strategy="afterInteractive"
//       dangerouslySetInnerHTML={{
//         __html:
//           `  window.dataLayer = window.dataLayer || [];
//            function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// }(window,document,'script','dataLayer','GTM-K4B69KPW');`}}
//     /> */}
//       {/* <Script id="google-tag-manager" strategy="afterInteractive">
//       {`
//         window.dataLayer = window.dataLayer || [];
//         (function(w,d,s,l,i) {
//           w[l]=w[l]||[];
//           w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
//           var f=d.getElementsByTagName(s)[0],
//           j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
//           j.async=true;
//           j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
//           f.parentNode.insertBefore(j,f);
//         })(window,document,'script','dataLayer','GTM-K4B69KPW');
//       `}
//     </Script> */}
//   </>
// };
