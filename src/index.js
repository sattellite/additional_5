module.exports = function check(str, bracketsConfig) {
  const openBrackets = {};
  const closeBrackets = {};
  const identicalBrackets = [];
  bracketsConfig.forEach(part => {
    if (part[0] === part[1]) {
      identicalBrackets.push(part[0]);
    } else {
      openBrackets[part[0]] = part[1];
      closeBrackets[part[1]] = part[0];
    }
  });

  const stack = [];
  const strArray = str.split('');

  for (let i = 0, len = strArray.length; i < len; i += 1) {
    const bracket = strArray[i];
    if (openBrackets[bracket]) {
      stack.push(bracket);
      continue;
    }

    if (closeBrackets[bracket]) {
      if (stack.pop() === closeBrackets[bracket]) {
        continue;
      }
      return false;
    }

    if (identicalBrackets.indexOf(bracket) > -1) {
      if (stack.slice(-1).pop() === bracket) {
        stack.pop();
        continue;
      }
      stack.push(bracket);
    }
  }

  if (stack.length) return false;
  return true;
}
