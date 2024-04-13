export const simulateApiLatency = async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};
