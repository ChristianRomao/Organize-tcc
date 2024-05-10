/*
  Warnings:

  - The primary key for the `reserva` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_reseva` on the `reserva` table. All the data in the column will be lost.
  - You are about to alter the column `dt_fim` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_inicio` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `id_reserva` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reserva` DROP PRIMARY KEY,
    DROP COLUMN `id_reseva`,
    ADD COLUMN `id_reserva` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `dt_fim` DATETIME NOT NULL,
    MODIFY `dt_inicio` DATETIME NOT NULL,
    ADD PRIMARY KEY (`id_reserva`);
