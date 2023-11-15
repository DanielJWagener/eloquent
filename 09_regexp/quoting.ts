const text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/^(\W)?'|'(\W)|(\W)'|'(\W)?$/g, '$1$3"$2$4'));
// → "I'm the cook," he said, "it's my job."
