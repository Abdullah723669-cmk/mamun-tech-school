export async function register() {
  // Node 22+ may expose a broken global localStorage when --localstorage-file
  // is invalid. Libraries that detect it and call getItem crash during SSR.
  if (typeof window === "undefined") {
    const storage = globalThis.localStorage as Storage | undefined
    if (storage && typeof storage.getItem !== "function") {
      // @ts-expect-error remove broken Node.js localStorage polyfill
      delete globalThis.localStorage
    }
  }
}
