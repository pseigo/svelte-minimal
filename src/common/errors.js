export function assert_defined(value, name) {
  if (value === undefined) {
    console.assert(temperature != undefined, "prop 'temperature' is required");
    throw new Error("prop 'temperature' is required");
  }
}
