/*
  Warnings:

  - You are about to drop the column `produtoId` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the `produto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemId` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `Pedido_produtoId_fkey`;

-- DropIndex
DROP INDEX `Pedido_produtoId_fkey` ON `pedido`;

-- AlterTable
ALTER TABLE `pedido` DROP COLUMN `produtoId`,
    ADD COLUMN `itemId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `produto`;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `preco` DOUBLE NOT NULL,
    `categoria` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
