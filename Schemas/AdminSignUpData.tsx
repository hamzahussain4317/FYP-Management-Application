import {z} from 'zod'
export const AdminSignInSchema=z.object({
    name:z.string().min(1).max(50),
    email:z.string().email(),
    password:z.string().min(8)

});
