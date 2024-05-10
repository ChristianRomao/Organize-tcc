/*
  Warnings:

  - You are about to alter the column `dt_fim` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_inicio` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `status_cd` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reserva` ADD COLUMN `status_cd` VARCHAR(191) NOT NULL,
    MODIFY `dt_fim` DATETIME NOT NULL,
    MODIFY `dt_inicio` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Status` (
    `cd_status` VARCHAR(191) NOT NULL,
    `ds_status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cd_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_status_cd_fkey` FOREIGN KEY (`status_cd`) REFERENCES `Status`(`cd_status`) ON DELETE RESTRICT ON UPDATE CASCADE;
