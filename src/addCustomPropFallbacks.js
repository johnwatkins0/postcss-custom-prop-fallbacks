import { collectCustomProps } from './collectCustomProps';
import { getFallback } from './getFallback';
import { usesCustomProp } from './usesCustomProp';

export const addCustomPropFallbacks = root => {
    let customProps = {};

    root.walkRules(':root', rule => {
        customProps = Object.assign({}, customProps, collectCustomProps(rule));
    });

    root.walkDecls(decl => {
        if (usesCustomProp(decl)) {
            const fallback = getFallback({ decl, customProps });
            decl.before(fallback);
        }
    });
};
