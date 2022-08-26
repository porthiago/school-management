const yup = require('./yup');

const adminSchema = yup.object().shape({
  nome: yup.string().required(), 
  email: yup.string().required(),
  cargo: yup.string().required(), 
  senha: yup.string().required()
})

module.exports = {
  adminSchema
}