# postcss-custom-prop-fallbacks

Provides fallbacks for custom properties set in :root. The plugin **does not** remove the original rule that uses the custom property, but rather places a fallback on the line above for browsers that don't recognize the feature. See the example below.

## Install

```
npm install --save-dev postcss-custom-prop-fallbacks
```

## Usage

### Postcss.config.js

```Javascript
const customPropFallbacks = require('postcss-custom-prop-fallbacks');

module.exports = {
  plugins: [customPropFallbacks],
};
```

The following input:

```CSS
:root {
  --gutter: 1.5rem;
  --brand-primary: #002878;
}

.some-element {
  background-color: var(--brand-primary);
  margin-right: calc(var(--gutter) * 1.3333);
}
```

Will produce the following:

```CSS
:root {
  --gutter: 1.5rem;
  --brand-primary: #002878;
}

.some-element {
  background-color: #002878;
  background-color: var(--brand-primary);
  margin-right: calc(1.5rem * 1.3333);
  margin-right: calc(var(--gutter) * 1.3333);
}
```
