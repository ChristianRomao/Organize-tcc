function formatarDataISO(data) {
    const dataFormatada = data.replace(/\//g, '-');

    const [dataParte, horaParte] = dataFormatada.split(' ');

    const [ano, mes, dia] = dataParte.split('-');

    const [hora, minuto, segundo] = horaParte.split(':');

    const dataISO = new Date(`${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}.000Z`);

    return dataISO.toISOString();
}


module.exports = {
    formatarDataISO
}