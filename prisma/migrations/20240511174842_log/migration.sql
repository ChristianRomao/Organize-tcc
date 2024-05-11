/*
  Warnings:

  - You are about to alter the column `dt_fim` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_inicio` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `log` MODIFY `dt_log` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `reserva` MODIFY `dt_fim` DATETIME NOT NULL,
    MODIFY `dt_inicio` DATETIME NOT NULL;
