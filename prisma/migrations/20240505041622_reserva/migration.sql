/*
  Warnings:

  - You are about to drop the column `dt_reserva` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `hr_fim` on the `reserva` table. All the data in the column will be lost.
  - You are about to drop the column `hr_inicio` on the `reserva` table. All the data in the column will be lost.
  - Added the required column `dt_fim` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dt_inicio` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reserva` DROP COLUMN `dt_reserva`,
    DROP COLUMN `hr_fim`,
    DROP COLUMN `hr_inicio`,
    ADD COLUMN `dt_fim` DATETIME(3) NOT NULL,
    ADD COLUMN `dt_inicio` DATETIME(3) NOT NULL;
