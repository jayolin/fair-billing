const FairBilling = require("./FairBilling");

const fairBilling = new FairBilling();

test("correctly computes original data", function () {
  const result = fairBilling.compute("./logs/originalData.txt");
  const expected = ["ALICE99 4 240", "CHARLIE 3 37"];

  expect(result).toStrictEqual(expected);
});

test("correctly computes when data contains invalid timestamp", function () {
  const result = fairBilling.compute("./logs/containsInvalidTimestamp.txt");
  const expected = ["ALICE99 4 240", "CHARLIE 3 37"];

  expect(result).toStrictEqual(expected);
});

test("correctly computes when data contains invalid username", function () {
  const result = fairBilling.compute("./logs/containsInvalidUsername.txt");
  const expected = ["ALICE99 4 240", "CHARLIE 3 37"];

  expect(result).toStrictEqual(expected);
});

test("correctly computes when data contains invalid start/stop indicator", function () {
  const result = fairBilling.compute("./logs/containsInvalidIndicator.txt");
  const expected = ["ALICE99 4 240", "CHARLIE 3 37"];

  expect(result).toStrictEqual(expected);
});