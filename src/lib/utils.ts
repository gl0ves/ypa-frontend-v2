import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const formatPrice = (price: number): string => {
	const formattedPrice = price.toLocaleString('en-GB', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2
	});
	return '€' + formattedPrice;
};

export function debounce(func: (event: Event) => void, delay: number): (event: Event) => void {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (event: Event) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func(event);
		}, delay);
	};
}
