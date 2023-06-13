import * as yup from "yup"

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
})

const signupSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
})

const updateUserSchema = yup.object({
    firstName: yup.string(),
    lastName: yup.string()
})

export {
    loginSchema,
    signupSchema,
    updateUserSchema
}