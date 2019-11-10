// @ts-nocheck
// copied and slightly modified from:
// https://github.com/facebook/react/blob/e02086bfcc698d02a41a7785a1027a94dbc88eea/packages/react-reconciler/src/ReactFiberHooks.js#L763-L791

export default function inputsAreEqual(arr1, arr2) {
  // Don't bother comparing lengths in prod because these arrays should be
  // passed inline.
  if (process.env.NODE_ENV !== "production") {
    if (arr1.length !== arr2.length) {
      // eslint-disable-next-line no-console
      console.error(
        "react-id-generator: Detected a variable number of hook dependencies. The length of the " +
          "dependencies array should be constant between renders.\n\n" +
          "Previous: %s\n" +
          "Incoming: %s",
        arr1.join(", "),
        arr2.join(", ")
      );
    }
  }
  for (let i = 0; i < arr1.length; i++) {
    // Inlined Object.is polyfill.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    const val1 = arr1[i];
    const val2 = arr2[i];
    if (
      (val1 === val2 && (val1 !== 0 || 1 / val1 === 1 / val2)) ||
      (val1 !== val1 && val2 !== val2) // eslint-disable-line no-self-compare
    ) {
      continue;
    }
    return false;
  }
  return true;
}
