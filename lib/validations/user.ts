import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url("Please upload your image").nonempty(),
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  phone:z.string(),
});
export const AdminValidation = z.object({
  profile_photo: z.string().url("Please upload your image").nonempty(), // Assuming profile_photo will be a base64 encoded string after image upload
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  username: z.string().min(4, { message: 'Username must be at least 4 characters long' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit' }),
  ConfirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 8 characters long' }),
  phone: z.string().min(6, { message: 'Phone number must be at least 6 characters long' }).regex(/^\+[1-9]\d{1,14}$/, { message: 'Invalid phone number format' }), 
  type: z.enum(['employee', 'admin']) // Assuming type can only be 'employee' or 'admin'
}).refine(data => data.password === data.ConfirmPassword, {
  message: 'Passwords do not match',
  path: ['ConfirmPassword']
});

