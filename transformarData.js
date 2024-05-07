function formatarDataISO(data) {
    // Substituir "/" por "-"
    const dataFormatada = data.replace(/\//g, '-');

    // Separar a data e a hora
    const [dataParte, horaParte] = dataFormatada.split(' ');

    // Separar ano, mês e dia
    const [ano, mes, dia] = dataParte.split('-');

    // Separar hora, minuto e segundo
    const [hora, minuto, segundo] = horaParte.split(':');

    // Criar uma nova data no formato ISO
    const dataISO = new Date(`${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}.000Z`);

    return dataISO.toISOString();
}


module.exports = {
    formatarDataISO
}