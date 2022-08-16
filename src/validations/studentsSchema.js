const yup = require('./yup');

const studentsSchema = yup.object().shape({
  nome: yup.string().required(),
  situacao: yup.string().required(),
  observacao: yup.string(),
  serie: yup.number().required(),
  turma: yup.string().required(),
  modalidade: yup.string().required()
});

module.exports = { studentsSchema };
