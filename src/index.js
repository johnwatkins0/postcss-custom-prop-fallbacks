import postcss from 'postcss';

import { addCustomPropFallbacks } from './addCustomPropFallbacks';

module.exports = postcss.plugin(
    'custom-prop-fallbacks',
    () => addCustomPropFallbacks,
);
