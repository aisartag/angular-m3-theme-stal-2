export const shallowEqual = (obj1: any, obj2: any): boolean => {
  const obj1Keys = Object.keys(obj1).sort();
  const obj2Keys = Object.keys(obj2).sort();

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  } else {
    const areEqual = obj1Keys.every((key, index) => {
      const objValue1 = obj1[key];
      const objValue2 = obj2[obj2Keys[index]];
      return objValue1 === objValue2;
    });
    return areEqual;
  }
};

export const rgbToHex = (rgba: {
  r: number;
  g: number;
  b: number;
  a: number;
}): string => {
  console.log(rgba);
  const red = rgba.r.toString(16).padStart(2, '0');
  const green = rgba.g.toString(16).padStart(2, '0');
  const blue = rgba.b.toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
};

export const isValidHexaCode = (str: string): boolean => {
  // Regex to check valid
  // hexadecimalColor_code
  let regex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

  // if str
  // is empty return false
  if (str == null) {
    return false;
  }

  // Return true if the str
  // matched the ReGex
  if (regex.test(str) == true) {
    return true;
  } else {
    return false;
  }
};
