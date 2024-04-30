import * as z from 'zod';

const passwordErrorMessage = {
  required: 'Password is required.',
  minLength: 'Password should contain at least 8 characters.',
  maxLength: 'Password should contain at most 50 characters.',
  digit: 'Password should contain at least one digit.',
  uppercase: 'Password should contain at least one uppercase character.',
  specialSymbol: 'Password should contain at least one special symbol.',
  noSpaces: 'Password cannot contain spaces.',
};

export const emailValidation = z
  .string()
  .refine(email => email.trim() !== '', {
    message: 'Email is required.',
  })
  .refine(email => /\S+@\S+\.\S+/.test(email), {
    message: 'Invalid email format.',
  });

export const passwordValidation = z
  .string()
  .refine(value => value.trim() !== '', {
    message: passwordErrorMessage.required,
  })
  .refine(value => value.length >= 8, {
    message: passwordErrorMessage.minLength,
  })
  .refine(value => value.length <= 50, {
    message: passwordErrorMessage.maxLength,
  })
  .refine(value => /\d/.test(value), {message: passwordErrorMessage.digit})
  .refine(value => /[A-Z]/.test(value), {
    message: passwordErrorMessage.uppercase,
  })
  .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
    message: passwordErrorMessage.specialSymbol,
  })
  .refine(value => !/\s/.test(value), {
    message: passwordErrorMessage.noSpaces,
  });
