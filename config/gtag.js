export const GA_TRACKING_ID = 'G-XFKYF91HJE';//'G-DVGE2GBTSL';
export const GA_TRACKING_ID2 = 'GT-MR5D2QQ';

export const pageview = url => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  })
}
export const pageview2 = url => {
  
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11324663584');
}
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}