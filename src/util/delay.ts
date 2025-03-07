export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("delay end...");
    }, ms);
  });
}
