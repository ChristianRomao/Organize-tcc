-- CreateTable
CREATE TABLE `Instituicao` (
    `id_instituicao` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_razaosoc` VARCHAR(191) NOT NULL,
    `cd_cpfcnpj` VARCHAR(191) NOT NULL,
    `nm_fantasia` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_instituicao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bloco` (
    `id_bloco` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_bloco` VARCHAR(191) NOT NULL,
    `polo_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_bloco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Polo` (
    `id_polo` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_polo` VARCHAR(191) NOT NULL,
    `ds_endereco` VARCHAR(191) NOT NULL,
    `instituicao_id` INTEGER NOT NULL,
    `municipio_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_polo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipio` (
    `id_municipio` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_municipio` VARCHAR(191) NOT NULL,
    `estado_cd` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_municipio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estado` (
    `cd_estado` VARCHAR(191) NOT NULL,
    `nm_estado` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cd_estado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Material` (
    `id_material` INTEGER NOT NULL AUTO_INCREMENT,
    `ds_material` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_material`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MaterialSala` (
    `id_materialSala` INTEGER NOT NULL AUTO_INCREMENT,
    `qt_material` INTEGER NOT NULL,
    `ds_materialSala` VARCHAR(191) NOT NULL,
    `material_id` INTEGER NOT NULL,
    `sala_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_materialSala`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sala` (
    `id_sala` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_sala` VARCHAR(191) NOT NULL,
    `qt_capacvigilancia` INTEGER NOT NULL,
    `bloco_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_sala`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `id_reseva` INTEGER NOT NULL AUTO_INCREMENT,
    `dt_reserva` DATETIME(3) NOT NULL,
    `hr_inicio` DATETIME(3) NOT NULL,
    `hr_fim` DATETIME(3) NOT NULL,
    `ds_observacao` VARCHAR(191) NOT NULL,
    `st_reserva` VARCHAR(191) NOT NULL,
    `sala_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `turma_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_reseva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id_curso` INTEGER NOT NULL AUTO_INCREMENT,
    `ds_curso` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_curso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turma` (
    `id_turma` INTEGER NOT NULL AUTO_INCREMENT,
    `ds_turma` VARCHAR(191) NOT NULL,
    `curso_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_turma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grade` (
    `id_grade` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_professor` VARCHAR(191) NOT NULL,
    `nr_cargaHr` INTEGER NOT NULL,
    `qt_alunos` INTEGER NOT NULL,
    `turma_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_grade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disciplina` (
    `id_disciplina` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_disciplina` VARCHAR(191) NOT NULL,
    `grade_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_disciplina`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `cd_cpfcnpj` VARCHAR(191) NOT NULL,
    `nm_usuario` VARCHAR(191) NOT NULL,
    `dt_nascimento` DATETIME(3) NOT NULL,
    `ds_email` VARCHAR(191) NOT NULL,
    `ds_senha` VARCHAR(191) NOT NULL,
    `ds_funcao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `id_log` INTEGER NOT NULL AUTO_INCREMENT,
    `dt_log` DATETIME(3) NOT NULL,
    `nr_ip` VARCHAR(191) NOT NULL,
    `ds_acao` VARCHAR(191) NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_log`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bloco` ADD CONSTRAINT `Bloco_polo_id_fkey` FOREIGN KEY (`polo_id`) REFERENCES `Polo`(`id_polo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Polo` ADD CONSTRAINT `Polo_instituicao_id_fkey` FOREIGN KEY (`instituicao_id`) REFERENCES `Instituicao`(`id_instituicao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Polo` ADD CONSTRAINT `Polo_municipio_id_fkey` FOREIGN KEY (`municipio_id`) REFERENCES `Municipio`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Municipio` ADD CONSTRAINT `Municipio_estado_cd_fkey` FOREIGN KEY (`estado_cd`) REFERENCES `Estado`(`cd_estado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialSala` ADD CONSTRAINT `MaterialSala_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `Material`(`id_material`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MaterialSala` ADD CONSTRAINT `MaterialSala_sala_id_fkey` FOREIGN KEY (`sala_id`) REFERENCES `Sala`(`id_sala`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sala` ADD CONSTRAINT `Sala_bloco_id_fkey` FOREIGN KEY (`bloco_id`) REFERENCES `Bloco`(`id_bloco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_sala_id_fkey` FOREIGN KEY (`sala_id`) REFERENCES `Sala`(`id_sala`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `Turma`(`id_turma`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `Curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `Turma`(`id_turma`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Disciplina` ADD CONSTRAINT `Disciplina_grade_id_fkey` FOREIGN KEY (`grade_id`) REFERENCES `Grade`(`id_grade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
