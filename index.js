import postcss from 'postcss';

class CustomPropsFallbacks {
  static setsCustomProp(decl) {
    return decl.prop.indexOf('--') === 0;
  }

  static usesCustomProp(value) {
    return value.indexOf('var(--') !== -1;
  }

  static getVariableFrom(value) {
    if (!CustomPropsFallbacks.usesCustomProp(value)) {
      return null;
    }

    const extractedValue = value.substring(value.indexOf('var(') + 4);

    if (extractedValue.indexOf(')') === -1) {
      return null;
    }

    return extractedValue.substring(0, extractedValue.indexOf(')'));
  }

  constructor(root) {
    this.root = root;
    this.customProps = {};

    this.addFallback = this.addFallback.bind(this);
    this.collectCustomProps = this.collectCustomProps.bind(this);

    this.collectCustomProps();
  }

  shouldRun() {
    return !!Object.keys(this.customProps).length;
  }

  collectCustomProps() {
    this.root.walkDecls((decl) => {
      if (CustomPropsFallbacks.setsCustomProp(decl)) {
        this.customProps[decl.prop] = decl.value.trim();
      }
    });
  }

  addFallback(decl) {
    const originalValue = decl.value.trim();
    const value = CustomPropsFallbacks.getVariableFrom(originalValue);

    if (value === null || !(value in this.customProps)) {
      return;
    }

    const newValue = originalValue.replace(`var(${value})`, this.customProps[value]);
    const newRule = `\n\t${decl.prop}: ${newValue}`;
    decl.before(newRule);
  }

  run() {
    this.root.walkDecls(this.addFallback);
  }
}

module.exports = postcss.plugin('custom-prop-fallbacks', () => (root) => {
  const customPropsFallbacks = new CustomPropsFallbacks(root);
  if (customPropsFallbacks.shouldRun()) {
    customPropsFallbacks.run();
  }
});
