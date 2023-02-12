export const removeDuplicate = (item, pos, self) => {
  // eslint-disable-next-line eqeqeq
  return self.indexOf(item) == pos;
};
export const ascending = (a, b) => {
  return a - b;
};
export const filterOutObjectKey = (object, keys) =>
  Object.keys(object)
    .filter((key) => !keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
export const clearObject = (obj) => {
  for (const key in obj) delete obj[key];
};
const stringify = (component) => {
  return JSON.stringify(component, (_, symbol) =>
    typeof symbol === "symbol" ? `$$Symbol:${Symbol.keyFor(symbol)}` : symbol,
  );
};
export const prase = (component) => {
  return JSON.parse(component, (_, symbol) => {
    const matches = symbol?.match?.(/^\$\$Symbol:(.*)$/);
    return matches ? Symbol.for(matches[1]) : symbol;
  });
};
export const deepCloneReactComponent = (component) => prase(stringify(component));
export const addStyle = (component, style) => {
  if (!component || !style) return;
  component = deepCloneReactComponent(component);
  component.props.style = component.props.style ? { ...component.props.style, ...style } : style;
  return component;
};
export const addChilds = (component, childrens) => {
  if (!component || !childrens) return;
  component = deepCloneReactComponent(component);
  if (!Array.isArray(component.props.children))
    component.props.children = [component.props.children];
  if (Array.isArray(childrens)) component.props.children.push(...childrens);
  else component.props.children.push(childrens);
  return component;
};
export const isObject = (testMaterial) =>
  typeof testMaterial === "object" && !Array.isArray(testMaterial) && testMaterial != null;
