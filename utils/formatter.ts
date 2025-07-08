const currentLocale = window ?window.navigator.languages[0] : "en-US";
export const formatter = Intl.NumberFormat(currentLocale, {
    style: 'currency',
    currency: 'EUR', // Currency for data points
})