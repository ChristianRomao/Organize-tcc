/*
  Warnings:

  - You are about to drop the column `grade_id` on the `disciplina` table. All the data in the column will be lost.
  - Added the required column `disciplina_id` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `disciplina` DROP FOREIGN KEY `Disciplina_grade_id_fkey`;

-- AlterTable
ALTER TABLE `disciplina` DROP COLUMN `grade_id`;

-- AlterTable
ALTER TABLE `grade` ADD COLUMN `disciplina_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_disciplina_id_fkey` FOREIGN KEY (`disciplina_id`) REFERENCES `Disciplina`(`id_disciplina`) ON DELETE RESTRICT ON UPDATE CASCADE;
