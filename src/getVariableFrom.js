/**
 * Extracts a CSS custom property value from a string.
 * @param {string} value A CSS declaration value.
 * @return {string} The extracted value.
 */
export function getVariableFrom(value) {
    const extractedValue = value.substring(value.indexOf('var(') + 4);
    return extractedValue.substring(0, extractedValue.indexOf(')'));
}
