import { getVariableFrom } from './getVariableFrom';

/**
 * Builds the fallbabck string for a declaration using a custom prop.
 * @param {Declaration} decl A PostCSS declaration object.
 * @param {object} customProps The key: value set of custom properties found.
 * @return {string} A string representation of the fallback declaration.
 */
export function getFallback({ decl, customProps }) {
    const originalValue = decl.value.trim();
    const value = getVariableFrom(originalValue);

    if (value === null || !(value in customProps)) {
        return '';
    }

    const newValue = originalValue.replace(`var(${value})`, customProps[value]);
    return `\n  ${decl.prop}: ${newValue}`;
}
