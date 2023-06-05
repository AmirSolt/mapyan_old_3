import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const searchedProducts: Writable<{[key: string]:Product[]}> = writable({});
export const productInfos: Writable<{[key: string]:ProductInfo}> = writable({});

