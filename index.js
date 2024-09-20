const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { salvarCooperado, verificarLogin, obterCooperadoPorEmail } = require('./db/database'); // Importa a função correta do database.js

// Definir EJS como o motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Paginas'));

// Servir arquivos estáticos da pasta 'Public'
app.use('/public', express.static(path.join(__dirname, 'Public')));

// Body Parser para tratar os dados de formulários enviados via POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para a página inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Rota para processar o registro de cooperado via modal
app.post('/registro', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await salvarCooperado(nome, email, senha); 
        res.redirect('/?success=true');  
    } catch (error) {
        console.error('Erro ao registrar cooperado:', error);
        res.status(500).send('Erro ao registrar cooperado');
    }
});

// Rota para processar o login via modal
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const loginValido = await verificarLogin(email, senha);  // Chama a função verificarLogin
        if (loginValido) {
            const cooperado = await obterCooperadoPorEmail(email); // Busca o nome do cooperado pelo email no banco de dados
            res.render('cooperadohome', { cooperadoNome: cooperado.nome });  // Redireciona para cooperadohome.ejs com o nome do cooperado
        } else {
            res.redirect('/?login=false');  // Se falhar, redireciona com mensagem de erro
        }
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        res.status(500).send('Erro ao fazer login');
    }
});

// Rota de logout
app.get('/logout', (req, res) => {
    // Aqui você pode limpar qualquer sessão ou cookie que tenha criado
    res.redirect('/');  // Redireciona para a página inicial (index.ejs)
});

// Definindo a porta do servidor
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
