require('dotenv').config();
const express = require('express');
const studentsRoutes = require('./routes/studentsRoutes');
const loginRoutes = require('./routes/loginRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use('/aluno', studentsRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000!');
});
