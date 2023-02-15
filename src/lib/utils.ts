/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-prototype-builtins */
import { common } from "replugged";
const { React } = common;
export const removeDuplicate = (item, pos, self) => {
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

const findInTree = (tree, searchFilter, { walkable = null, ignore = [] } = {}) => {
  if (typeof searchFilter === "string") {
    if (tree.hasOwnProperty(searchFilter)) return tree[searchFilter];
  } else if (searchFilter(tree)) {
    return tree;
  }
  // eslint-disable-next-line no-undefined
  if (typeof tree !== "object" || tree == null) return undefined;

  let tempReturn;
  if (Array.isArray(tree)) {
    for (const value of tree) {
      tempReturn = findInTree(value, searchFilter, { walkable, ignore });
      if (typeof tempReturn !== "undefined") return tempReturn;
    }
  } else {
    const toWalk = walkable == null ? Object.keys(tree) : walkable;
    for (const key of toWalk) {
      if (!tree.hasOwnProperty(key) || ignore.includes(key)) continue;
      tempReturn = findInTree(tree[key], searchFilter, { walkable, ignore });
      if (typeof tempReturn !== "undefined") return tempReturn;
    }
  }
  return tempReturn;
};

export const findInReactTree = (tree, searchFilter) => {
  return findInTree(tree, searchFilter, { walkable: ["props", "children", "child", "sibling"] });
};

export const isObject = (testMaterial) =>
  typeof testMaterial === "object" && !Array.isArray(testMaterial) && testMaterial != null;

export const hasProps = (mod, props) => isObject(mod) && props.every((prop) => prop in mod);

export const clearObject = (obj) => {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  for (const key in obj) delete obj[key];
};

const stringify = (component) =>
  JSON.stringify(component, (_, symbol) =>
    typeof symbol === "symbol" ? `$$Symbol:${Symbol.keyFor(symbol)}` : symbol,
  );

export const prase = (component) =>
  JSON.parse(component, (_, symbol) => {
    const matches = symbol?.match?.(/^\$\$Symbol:(.*)$/);
    return matches ? Symbol.for(matches[1]) : symbol;
  });
export const deepCloneReactComponent = (component) => prase(stringify(component));

export const addStyle = (component, style) => {
  if (!component || !style) return;
  component = React.cloneElement(component);
  component.props.style = component.props.style ? { ...component.props.style, ...style } : style;
  return component;
};

export const addChilds = (component, childrens) => {
  if (!component || !childrens) return;
  component = React.cloneElement(component);
  if (!Array.isArray(component.props.children))
    component.props.children = [component.props.children];
  if (Array.isArray(childrens)) component.props.children.push(...childrens);
  else component.props.children.push(childrens);
  return component;
};

export const prototypeChecker = (ModuleExports, Protos) =>
  isObject(ModuleExports) &&
  Protos.every((p) =>
    Object.values(ModuleExports).some((m) => (m as { prototype: () => void })?.prototype?.[p]),
  );
