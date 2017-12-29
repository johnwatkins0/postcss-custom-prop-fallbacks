/**
 * Retrieves all the custom prop declarations from a CSS rule.
 * @param {Rule} rule A PostCSS Rule object.
 * @return {object} A key: value collection of custom props found.
 */
export function collectCustomProps(rule) {
    const customProps = {};

    rule.walkDecls(/^--/, decl => {
        customProps[decl.prop] = decl.value.trim();
    });

    return customProps;
}
