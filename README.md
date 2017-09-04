# postcss-custom-prop-fallbacks

Provides fallbacks for custom properties set in :root.

## Install

```Shell
npm install --save-dev postcss-custom-prop-fallbacks
```

## Usage

### postcss.config.js

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
