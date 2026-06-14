/* Money helpers. Prices are stored in minor units (kopiykas); UAH by default. */

export function formatPrice(minorUnits, currency = 'UAH') {
    if (minorUnits == null) return null;
    const symbol = currency === 'UAH' ? '₴' : '';
    const amount = Math.round(minorUnits / 100).toLocaleString('uk-UA');
    return `${symbol}${amount}`;
}
