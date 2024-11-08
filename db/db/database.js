const mariadb = require('mariadb');

// Criando a pool de conexão com o MariaDB
const pool = mariadb.createPool({
    host: 'localhost',  // Endereço do banco de dados
    user: 'root',       // Usuário do banco de dados
    password: '',       // Senha do usuário
    database: 'institutocredteste',  // Nome do banco de dados
    connectionLimit: 5  // Limite de conexões
});

// Função para obter conexão
async function getConnection() {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('Erro ao conectar no banco de dados:', error);
        throw error;
    }
}

// Função para salvar um cooperado no banco de dados (saldo não é especificado aqui)
async function salvarCooperado(nome, email, senha) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'INSERT INTO cooperados (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );
        return result;
    } catch (error) {
        console.error('Erro ao salvar cooperado:', error);
        throw error;
    } finally {
        if (conn) conn.release(); // Libera a conexão de volta para o pool
    }
}

// Função para verificar login
async function verificarLogin(email, senha) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'SELECT * FROM cooperados WHERE email = ? AND senha = ?',
            [email, senha]
        );
        return result.length > 0; // Retorna true se encontrar um usuário
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

// Função para obter o nome do cooperado pelo email
async function obterCooperadoPorEmail(email) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'SELECT nome FROM cooperados WHERE email = ?',
            [email]
        );
        return result[0] ? result[0] : null; // Retorna o nome do primeiro resultado encontrado ou null se não existir
    } catch (error) {
        console.error('Erro ao buscar cooperado:', error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

// Função para obter o saldo do cooperado pelo email
async function obterSaldoPorEmail(email) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'SELECT saldo FROM cooperados WHERE email = ?',
            [email]
        );
        return result[0] ? parseFloat(result[0].saldo) : 0.00; // Retorna o saldo ou 0.00 se não existir
    } catch (error) {
        console.error('Erro ao buscar saldo:', error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

// Função para atualizar o saldo do cooperado
async function atualizarSaldo(email, amount) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'UPDATE cooperados SET saldo = saldo + ? WHERE email = ?',
            [amount, email]
        );
        return result;
    } catch (error) {
        console.error('Erro ao atualizar saldo:', error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

// Exportando as funções
module.exports = {
    salvarCooperado,
    verificarLogin,
    obterCooperadoPorEmail,
    obterSaldoPorEmail,
    atualizarSaldo
};
