export const usesCustomProp = decl =>
    decl.value.trim().indexOf('var(--') !== -1;
