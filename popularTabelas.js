const mysql = require('mysql2/promise');

// Configurações de conexão com o banco de dados MySQL
const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tcc'
};

/*async function verificarTabelasVazias() {
    try {
        // Cria uma conexão com o banco de dados
        const connection = await mysql.createConnection(config);

        // SQL para contar o número de registros na tabela estado
        const sqlEstado = 'SELECT COUNT(*) AS total FROM estado';
        const [estadoRows] = await connection.query(sqlEstado);

        // SQL para contar o número de registros na tabela status
        // const sqlStatus = 'SELECT COUNT(*) AS total FROM status';
        // const [statusRows] = await connection.query(sqlStatus);

        // Fechar a conexão com o banco de dados
        await connection.end();

        // Verificar se ambas as tabelas estão vazias
        const estadoVazio = estadoRows[0].total === 0;
        // const statusVazio = statusRows[0].total === 0;

        return { estadoVazio };
        // return { estadoVazio, statusVazio };
    } catch (error) {
        console.error('Erro ao verificar as tabelas:', error);
        throw error;
    }
}

async function popularTabelas() {
    try {
        // Verificar se as tabelas estão vazias
        const { estadoVazio } = await verificarTabelasVazias();
        // const { estadoVazio, statusVazio } = await verificarTabelasVazias();

        if (!estadoVazio) {
        // if (!estadoVazio || !statusVazio) {
            console.log('As tabelas não estão vazias. Os dados não serão inseridos.');
            return;
        }

        // Cria uma conexão com o banco de dados
        const connection = await mysql.createConnection(config);

        // SQL para inserir os dados na tabela estado
        const sqlEstado = `
            INSERT INTO estado (cd_estado, nm_estado) VALUES
            ('AC', 'ACRE'),
            ('DF', 'DISTRITO FEDERAL'),
            ('PA', 'PARÁ'),
            ('RO', 'RONDÔNIA'),
            ('RR', 'RORAIMA'),
            ('TO', 'TOCANTINS'),
            ('MA', 'MARANHÃO'),
            ('PB', 'PARAÍBA'),
            ('PE', 'PERNAMBUCO'),
            ('PI', 'PIAUÍ'),
            ('RN', 'RIO GRANDE DO NORTE'),
            ('SE', 'SERGIPE'),
            ('GO', 'GOIÁS'),
            ('MS', 'MATO GROSSO DO SUL'),
            ('MT', 'MATO GROSSO'),
            ('ES', 'ESPÍRITO SANTO'),
            ('MG', 'MINAS GERAIS'),
            ('RJ', 'RIO DE JANEIRO'),
            ('SP', 'SÃO PAULO'),
            ('RS', 'RIO GRANDE DO SUL'),
            ('SC', 'SANTA CATARINA'),
            ('AM', 'AMAZONAS'),
            ('AP', 'AMAPÁ'),
            ('AL', 'ALAGOAS'),
            ('BA', 'BAHIA'),
            ('CE', 'CEARÁ'),
            ('PR', 'PARANÁ');
        `;

        // SQL para inserir os dados na tabela status
        // const sqlStatus = `
        //     INSERT INTO status (cd_status, ds_status) VALUES
        //     ('A', 'Ativo'),
        //     ('C', 'Cancelado'),
        //     ('P', 'Pendente');
        // `;

        // Executar as consultas SQL em uma transação para garantir consistência
        await connection.beginTransaction();

        await connection.query(sqlEstado);
        // await connection.query(sqlStatus);

        // Commit da transação
        await connection.commit();

        console.log('Dados inseridos nas tabelas estado e status com sucesso.');

        // Fechar a conexão com o banco de dados
        await connection.end();
    } catch (error) {
        // Se houver um erro, rollback da transação
        await connection.rollback();
        console.error('Erro ao popular as tabelas:', error);
    }
}*/

async function popularTabelas() {
    try {
        // Cria uma conexão com o banco de dados
        const connection = await mysql.createConnection(config);

        let totalInsertEstado = 0;
        let totalInsertStatus = 0;
''
        // Dados a serem inseridos na tabela estado
        const estados = [
            {cd_estado:'AC', nm_estado:'ACRE'},
            {cd_estado:'DF', nm_estado:'DISTRITO FEDERAL'},
            {cd_estado:'PA', nm_estado:'PARÁ'},
            {cd_estado:'RO', nm_estado:'RONDÔNIA'},
            {cd_estado:'RR', nm_estado:'RORAIMA'},
            {cd_estado:'TO', nm_estado:'TOCANTINS'},
            {cd_estado:'MA', nm_estado:'MARANHÃO'},
            {cd_estado:'PB', nm_estado:'PARAÍBA'},
            {cd_estado:'PE', nm_estado:'PERNAMBUCO'},
            {cd_estado:'PI', nm_estado:'PIAUÍ'},
            {cd_estado:'RN', nm_estado:'RIO GRANDE DO NORTE'},
            {cd_estado:'SE', nm_estado:'SERGIPE'},
            {cd_estado:'GO', nm_estado:'GOIÁS'},
            {cd_estado:'MS', nm_estado:'MATO GROSSO DO SUL'},
            {cd_estado:'MT', nm_estado:'MATO GROSSO'},
            {cd_estado:'ES', nm_estado:'ESPÍRITO SANTO'},
            {cd_estado:'MG', nm_estado:'MINAS GERAIS'},
            {cd_estado:'RJ', nm_estado:'RIO DE JANEIRO'},
            {cd_estado:'SP', nm_estado:'SÃO PAULO'},
            {cd_estado:'RS', nm_estado:'RIO GRANDE DO SUL'},
            {cd_estado:'SC', nm_estado:'SANTA CATARINA'},
            {cd_estado:'AM', nm_estado:'AMAZONAS'},
            {cd_estado:'AP', nm_estado:'AMAPÁ'},
            {cd_estado:'AL', nm_estado:'ALAGOAS'},
            {cd_estado:'BA', nm_estado:'BAHIA'},
            {cd_estado:'CE', nm_estado:'CEARÁ'},
            {cd_estado:'PR', nm_estado:'PARANÁ'},
        ];

        // Dados a serem inseridos na tabela status
        const status = [
            { cd_status: 'A', ds_status: 'Ativo' },
            { cd_status: 'C', ds_status: 'Cancelado' },
            { cd_status: 'P', ds_status: 'Pendente' },
        ];

        // Função para verificar e inserir registros na tabela
        async function verificarEInserirRegistros(registros, tabela) {
            const insercoesPendentes = [];
            for (const registro of registros) {
                const [rows] = await connection.query(`SELECT COUNT(*) AS total FROM ${tabela} WHERE cd_${tabela} = ?`, [registro[`cd_${tabela}`]]);
                const registroExiste = rows[0].total > 0;
                if (!registroExiste) {
                    if(tabela === "estado") {
                        insercoesPendentes.push(connection.query(`INSERT INTO ${tabela} (cd_${tabela}, nm_${tabela}) VALUES (?, ?)`, [registro[`cd_${tabela}`], registro[`nm_${tabela}`]]));
                        totalInsertEstado++
                    };
                    if(tabela === "status") {
                        insercoesPendentes.push(connection.query(`INSERT INTO ${tabela} (cd_${tabela}, ds_${tabela}) VALUES (?, ?)`, [registro[`cd_${tabela}`], registro[`ds_${tabela}`]]));
                        totalInsertStatus++
                    };
                }
            }
            return Promise.all(insercoesPendentes);
        }

        // Verificar e inserir registros na tabela estado
        await verificarEInserirRegistros(estados, 'estado');
        
        // Verificar e inserir registros na tabela status
         await verificarEInserirRegistros(status, 'status');
        
        if(totalInsertEstado === 0 && totalInsertStatus === 0) console.log('Nenhum dado foi inserido nas tabelas Estado e Status.');
        // Fechar a conexão com o banco de dados
        await connection.end();
        
        if(totalInsertEstado > 0 ) console.log(`${totalInsertEstado} dado(s) inserido(s) na tabela Estado com sucesso.`)
        if(totalInsertStatus > 0 ) console.log(`${totalInsertStatus} dado(s) inserido(s) na tabela Status com sucesso.`)
    } catch (error) {
        console.error('Erro ao popular as tabelas:', error);
    }
}

module.exports = popularTabelas
