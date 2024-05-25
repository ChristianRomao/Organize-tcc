/*
  Warnings:

  - You are about to alter the column `dt_log` on the `log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `nm_resera` on the `reserva` table. All the data in the column will be lost.
  - You are about to alter the column `dt_fim` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_inicio` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `nm_reserva` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `log` MODIFY `dt_log` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `reserva` DROP COLUMN `nm_resera`,
    ADD COLUMN `nm_reserva` VARCHAR(191) NOT NULL,
    MODIFY `dt_fim` DATETIME NOT NULL,
    MODIFY `dt_inicio` DATETIME NOT NULL;
