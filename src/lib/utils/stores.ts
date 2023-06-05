import { writable } from "svelte/store";
import type { Writable } from "svelte/store";



export const userCountry:Writable<string> = writable("");
export const selectedProducts: Writable<Product[]> = writable([]);


