/* Money helpers. Prices are stored in minor units (cents/kopiykas). */

const SYMBOLS = { USD: '$', EUR: '€', GBP: '£', UAH: '₴' };

export function formatPrice(minorUnits, currency = 'USD') {
    if (minorUnits == null) return null;
    const symbol = SYMBOLS[currency] ?? '';
    const amount = minorUnits / 100;
    const formatted = Number.isInteger(amount)
        ? amount.toLocaleString('en-US')
        : amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${symbol}${formatted}`;
}
