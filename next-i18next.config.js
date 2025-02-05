// const { i18n } = require('./next-i18next.config');
// const NextI18Next = require('next-i18next').default;

module.exports = {
  i18n: {
    locales: ['es', 'en', 'pt'],
      defaultLocale: 'en',
   
   //  namespaces: ['landing', 'navbar', 'common', 'menu'],
  },
      ns: ['landing', 'navbar', 'common', 'menu',
           'aboutus','index', 'footer',
           'register','contactus',
           'form','form2','form3', 'form4'],  
      react: {
        useSuspense: false, // Intenta cambiar a true
      },
}

