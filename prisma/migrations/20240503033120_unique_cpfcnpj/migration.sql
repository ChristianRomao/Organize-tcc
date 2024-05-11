/*
  Warnings:

  - A unique constraint covering the columns `[cd_cpfcnpj]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Usuario_cd_cpfcnpj_key` ON `Usuario`(`cd_cpfcnpj`);
