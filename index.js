const FairBilling = require("./FairBilling");
const { lineBreak } = require("./utils")

try {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    throw new Error("App needs argument for log file path!")
  }

  const fairBilling = new FairBilling();
  const result = fairBilling.compute(args[0]);
  console.log(result.join(lineBreak));
} catch (error) {
  console.error(error);
}