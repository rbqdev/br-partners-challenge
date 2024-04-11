import { Customer } from "@/schema";

export const customersStorageKey = "customersStorageKey";

class CustomersMap extends Map<string | readonly string[], Customer> {
  constructor() {
    super();
    const sessionStorageItems = sessionStorage.getItem(customersStorageKey);
    const sessionStorageItemsParsed = JSON.parse(sessionStorageItems!) || {};
    for (const key in sessionStorageItemsParsed) {
      this.set(key, sessionStorageItemsParsed[key]);
    }
  }

  set(key: string, value: Customer) {
    super.set(key, value);
    sessionStorage.setItem(
      customersStorageKey,
      JSON.stringify(Object.fromEntries(this))
    );
    return this;
  }

  delete(key: string) {
    const result = super.delete(key);
    sessionStorage.setItem(
      customersStorageKey,
      JSON.stringify(Object.fromEntries(this))
    );
    return result;
  }
}

export const customersMap = new CustomersMap();
