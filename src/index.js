import postcss from 'postcss';

class CustomPropsFallbacks {
  static setsCustomProp(decl) {
    return decl.prop.indexOf('--') === 0;
  }

  static isCustomProp(value) {
    return value.indexOf('var(' === 0);
  }

  constructor(root) {
    this.root = root;
    this.customProps = this.collectCustomProps();
    this.addFallback = this.addFallback.bind(this);
  }

  shouldRun() {
    return !!Object.keys(this.customProps).length;
  }

  collectCustomProps() {
    this.root.walkDecls((decl) => {
      if (CustomPropsFallbacks.setsCustomProp(decl)) {
        this.customProps[`var(${decl.prop})`] = decl.value.trim();
      }
    });
  }

  addFallback(decl) {
    if (!CustomPropsFallbacks.isCustomProp(decl.value.trim())) {
      return;
    }

    if (!(decl.value.trim() in this.customProps)) {
      return;
    }

    const newProp = this.customProps[decl.value.trim()];
    const newRule = `\n\t${decl.prop}: ${newProp}`;
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
