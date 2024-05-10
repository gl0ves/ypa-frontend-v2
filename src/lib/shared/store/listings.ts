import { writable } from 'svelte/store';
import type { Listing } from '$lib/ypaTypes';  

const listings = writable<Listing[]>([]);
  
export { listings as default };