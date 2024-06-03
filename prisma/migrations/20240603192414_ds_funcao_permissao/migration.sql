/*
  Warnings:

  - You are about to alter the column `dt_log` on the `log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_fim` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_inicio` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `ds_funcao` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `log` MODIFY `dt_log` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `reserva` MODIFY `dt_fim` DATETIME NOT NULL,
    MODIFY `dt_inicio` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `ds_funcao` VARCHAR(191) NOT NULL;
