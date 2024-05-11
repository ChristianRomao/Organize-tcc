-- AlterTable
ALTER TABLE `log` MODIFY `dt_log` DATE NOT NULL;

-- AlterTable
ALTER TABLE `reserva` MODIFY `dt_reserva` DATE NOT NULL,
    MODIFY `hr_inicio` TIME NOT NULL,
    MODIFY `hr_fim` TIME NOT NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `dt_nascimento` DATE NOT NULL;
