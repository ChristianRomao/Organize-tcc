const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tcc'
};

async function popularTabelas() {
    try {
        const connection = await mysql.createConnection(config);

        let totalInsertEstado = 0;
        let totalInsertStatus = 0;
''
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

        const status = [
            { cd_status: 'A', ds_status: 'Ativo' },
            { cd_status: 'C', ds_status: 'Cancelado' },
            { cd_status: 'P', ds_status: 'Pendente' },
        ];

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

        await verificarEInserirRegistros(estados, 'estado');
        
         await verificarEInserirRegistros(status, 'status');
        
        if(totalInsertEstado === 0 && totalInsertStatus === 0) console.log('Nenhum dado foi inserido nas tabelas Estado e Status.');

        await connection.end();
        
        if(totalInsertEstado > 0 ) console.log(`${totalInsertEstado} dado(s) inserido(s) na tabela Estado com sucesso.`)
        if(totalInsertStatus > 0 ) console.log(`${totalInsertStatus} dado(s) inserido(s) na tabela Status com sucesso.`)
    } catch (error) {
        console.error('Erro ao popular as tabelas:', error);
    }
}

module.exports = popularTabelas
