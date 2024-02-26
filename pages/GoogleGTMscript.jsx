import Script from 'next/script';

export default function GTMscript() {
  <>
   
   {/* <Script
                strategy="afterInteractive"
                src={"https://www.googletagmanager.com/ns.html?id=GTM-K4B69KPW"}
            /> */}
   <Script id='iframe'><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4B69KPW" height="0" width="0" style={{ visibility: 'hidden' }}></iframe></Script>
    <Script id="data"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];`
      }} />

    <Script id="google-tag-manager" strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html:
          `  window.dataLayer = window.dataLayer || [];
           function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
}(window,document,'script','dataLayer','GTM-K4B69KPW');`}}
    />
  </>
};
