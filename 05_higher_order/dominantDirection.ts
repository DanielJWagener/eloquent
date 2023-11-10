// eslint-disable-next-line @typescript-eslint/no-var-requires
const SCRIPTS = require("./scripts");

function dominantDirection(text: string): string {
  const directions = countBy(text, (char: string): string => {
    const script = characterScript(char.codePointAt(0));
    return script?.direction;
  }).filter(x => x.name);

  return directions.reduce((acc, val) => {
    if (!acc) return val;
    return val.count > acc.count ? val : acc;
  }).name;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl

function characterScript(code) {
  for (const script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

function countBy(items, groupName) {
  const counts = [];
  for (const item of items) {
    const name = groupName(item);
    const known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}
