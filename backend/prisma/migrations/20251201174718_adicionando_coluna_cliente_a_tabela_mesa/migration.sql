-- DropIndex
DROP INDEX `Usuario_senha_key` ON `usuario`;

-- AlterTable
ALTER TABLE `mesa` ADD COLUMN `cliente` VARCHAR(191) NULL;
