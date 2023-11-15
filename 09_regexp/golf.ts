// Fill in the regular expressions

verify(/ca[rt]/, ["my car", "bad cats"], ["camper", "high art"]);

verify(/pr?op/, ["pop culture", "mad props"], ["plop", "prrrop"]);

verify(/ferr(et|y|ari)/, ["ferret", "ferry", "ferrari"], ["ferrum", "transfer A"]);

verify(/\w+ious\b/, ["how delicious", "spacious room"], ["ruinous", "consciousness"]);

verify(/\s[.,:;]/, ["bad punctuation ."], ["escape the period"]);

verify(/\w{6,}/, ["Siebentausenddreihundertzweiundzwanzig"], ["no", "three small words"]);

verify(/\b[^\We]+\b/i, ["red platypus", "wobbling nest"], ["earth bed", "learning ape", "BEET"]);

function verify(regexp: RegExp, yes: string[], no: string[]) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (const str of yes)
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  for (const str of no)
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
}
