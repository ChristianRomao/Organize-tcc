/*
  Warnings:

  - A unique constraint covering the columns `[ds_email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Usuario_ds_email_key` ON `Usuario`(`ds_email`);
