import 'unplugin-icons/types/svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			sessionToken?: string;
			user?: {
				id: string;
				email: string;
				firstName?: string;
			};
		}
	}
}

export {};
