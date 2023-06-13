import * as yup from "yup"

const createNoteSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required()
})

const updateNoteSchema = yup.object({
    id: yup.number().required(),
    title: yup.string(),
    description: yup.string(),
    status: yup.string()
})

const searchAndFilterNoteSchema = yup.object({
    title: yup.string(),
    status: yup.string(),
    createdBefore: yup.date(),
    createdAfter: yup.date(),
    updatedBefore: yup.date(),
    updatedAfter: yup.date()
})

export {
    createNoteSchema,
    updateNoteSchema,
    searchAndFilterNoteSchema
}