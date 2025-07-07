const currentLocale = window.navigator.languages[0];
export const formatter = Intl.NumberFormat(currentLocale, {
    style: 'currency',
    currency: 'EUR', // Currency for data points
})