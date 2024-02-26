

export default function  GTMnoscript  () {
  <noscript
   
    dangerouslySetInnerHTML={{
      __html: `<iframe id="google-tag-manager" src="https://www.googletagmanager.com/ns.html?id=GTM-K4B69KPW"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    }}
  />
  };
