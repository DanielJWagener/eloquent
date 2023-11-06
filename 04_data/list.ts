interface ListNode {
  value: any;
  rest: ListNode | null;
}

type NullableListNode = ListNode | null;

function arrayToList(arr: any[]): NullableListNode {
  if (arr.length === 0) {
    return null;
  }
  let node: ListNode = { value: null, rest: null };
  node.value = arr.shift();
  node.rest = arrayToList(arr);
  return node;
}

function listToArray(list: NullableListNode): any[] {
  let result: any[] = [];
  let currentNode: NullableListNode = list;
  while (currentNode) {
    result.push(currentNode.value);
    if (currentNode.rest === null) break;
    currentNode = currentNode.rest;
  }
  return result;
}

function prepend(valueToAdd: any, list: NullableListNode): ListNode {
  return { value: valueToAdd, rest: list };
}

function nth(list: NullableListNode, index: number): any {
  if (index === 0 || list === null) return list?.value;
  return nth(list.rest, index - 1);
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
