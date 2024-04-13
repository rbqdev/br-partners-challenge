import { isPhoneNumberValid } from "./isPhoneNumberValid";

describe("isPhoneNumberValid", () => {
  it.each([
    [false, "321321321312"],
    [true, "(77) 99999-0000"],
    [false, "(11) 89999-0000"],
    [true, "(11) 91121-0000"],
  ])("should return { %s } from input { %s }", (output, input) => {
    const result = isPhoneNumberValid(input);
    expect(result).toBe(output);
  });
});
