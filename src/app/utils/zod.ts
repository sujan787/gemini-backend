import { z, ZodError, ZodObject } from 'zod';

type ErrorType = Array<{ path: string, message: string }> | [];
type ValidateReturnTye<T> = { input: T, errors: ErrorType }

const validate = <T extends z.infer<S>, S extends ZodObject<any, any>>(
    schemaCallBack: (zod: typeof z) => S,
    input: unknown,
): ValidateReturnTye<T> => {
    try {
        return { input: schemaCallBack(z).parse(input) as T, errors: [] };
    } catch (err) {
        if (err instanceof ZodError) {
            const validationErrors = err.errors.map(error => ({
                path: error.path.join('.'),
                message: error.message
            }));
            return { input: input as T, errors: validationErrors }
        } else {
            throw err;
        }
    }
};

const zod = { validate }
export default zod;

