/*
  Warnings:

  - You are about to drop the column `turma_id` on the `reserva` table. All the data in the column will be lost.
  - You are about to alter the column `dt_fim` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_inicio` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `grade_id` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reserva` DROP FOREIGN KEY `Reserva_turma_id_fkey`;

-- AlterTable
ALTER TABLE `reserva` DROP COLUMN `turma_id`,
    ADD COLUMN `grade_id` INTEGER NOT NULL,
    MODIFY `dt_fim` DATETIME NOT NULL,
    MODIFY `dt_inicio` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_grade_id_fkey` FOREIGN KEY (`grade_id`) REFERENCES `Grade`(`id_grade`) ON DELETE RESTRICT ON UPDATE CASCADE;
