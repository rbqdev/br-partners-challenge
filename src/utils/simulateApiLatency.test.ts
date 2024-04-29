import { simulateApiLatency } from "./simulateApiLatency";

describe("simulateApiLatency", () => {
  it("should resolve promise as true after 1 second", async () => {
    await simulateApiLatency().then((data) => {
      expect(data).toBe(true);
    });
  });
});
