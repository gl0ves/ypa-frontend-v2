import { z } from 'zod';

export const signupFormSchema = z
	.object({
		firstName: z.string().min(1).max(50),
		email: z.string().email().max(50),
		password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(50),
		passwordConfirmation: z.string().max(50)
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords don't match",
		path: ['passwordConfirmation']
	});

export type SignupFormSchema = typeof signupFormSchema;
