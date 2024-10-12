import {z} from 'zod'
export const AdminSignInSchema=z.object({
    name:z.string().min(1,"Name is required").max(50,"Name must be less than 50 characters"),
    email:z.string().email("Invalid email address"),
    password:z.string().min(8,"Password must be at least 8 characters long")

});
