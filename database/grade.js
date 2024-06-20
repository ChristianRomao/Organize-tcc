const prisma = require("./prisma");

const listarGrades = () => {
  return prisma.grade.findMany({
    include: {
      disciplina: true,
      turma: {
        include: {
          curso: true,
        },
      },
    },
    orderBy: [
      {
        disciplina: {
          nm_disciplina: 'asc',
        },
      },
      {
        turma: {
          curso: {
            ds_curso: 'asc',
          },
        },
      },
    ],
  });
};

const buscarGradeId = (id) => {
  return prisma.grade.findFirst({
    where: {
      id_grade: id,
    },
    include: {
      disciplina: true,
      turma: {
        include: {
          curso: true,
        },
      },
    },
  });
};

const buscarGradePorCurso = (cursoId) => {
  return prisma.grade.findMany({
    where: {
      turma: {
        curso: {
          id_curso: cursoId,
        },
      },
    },
    include: {
      disciplina: true,
      turma: {
        include: {
          curso: true,
        },
      },
    },
  });
};

const buscarGradePorAno = (nrAnoLetivo) => {
  return prisma.grade.findMany({
    where: {
      turma: {
        nr_anoletivo: nrAnoLetivo,
      },
    },
    include: {
      disciplina: true,
      turma: {
        include: {
          curso: true,
        },
      },
    },
  });
};

const buscarGradePorCursoAno = (cursoId, nrAnoLetivo) => {
  const whereClause = {};

  if (cursoId) {
    whereClause.turma = { ...whereClause.turma, curso: { id_curso: cursoId } };
  }

  if (nrAnoLetivo) {
    whereClause.turma = { ...whereClause.turma, nr_anoletivo: nrAnoLetivo };
  }

  return prisma.grade.findMany({
    where: whereClause,
    include: {
      disciplina: true,
      turma: {
        include: {
          curso: true,
        },
      },
    },
  });
};

const gravarGrade = (grade) => {
  return prisma.grade.create({
    data: {
      nm_professor: grade.nm_professor,
      nr_cargaHr: grade.nr_cargahr,
      qt_alunos: grade.qt_alunos,
      disciplina_id: grade.disciplina_id,
      turma_id: grade.turma_id,
    },
  });
};

const alterarGrade = (id, grade) => {
  return prisma.grade.update({
    where: {
      id_grade: id,
    },
    data: {
      nm_professor: grade.nm_professor,
      nr_cargaHr: grade.nr_cargahr,
      qt_alunos: grade.qt_alunos,
      disciplina_id: grade.disciplina_id,
      turma_id: grade.turma_id,
    },
  });
};

const deletarGrade = (id) => {
  return prisma.grade.delete({
    where: {
      id_grade: id,
    },
  });
};

module.exports = {
  listarGrades,
  buscarGradeId,
  buscarGradePorCurso,
  buscarGradePorAno,
  buscarGradePorCursoAno,
  gravarGrade,
  alterarGrade,
  deletarGrade,
};
