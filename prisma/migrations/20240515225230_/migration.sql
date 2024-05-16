/*
  Warnings:

  - You are about to alter the column `dt_log` on the `log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `qt_material` on the `materialsala` table. All the data in the column will be lost.
  - You are about to alter the column `dt_fim` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dt_inicio` on the `reserva` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `qt_material` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qt_materialSala` to the `MaterialSala` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `log` MODIFY `dt_log` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `material` ADD COLUMN `qt_material` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `materialsala` DROP COLUMN `qt_material`,
    ADD COLUMN `qt_materialSala` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `reserva` MODIFY `dt_fim` DATETIME NOT NULL,
    MODIFY `dt_inicio` DATETIME NOT NULL;
