-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `funcao` ENUM('ADMIN', 'GARCOM', 'ATENDENTE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comanda` (
    `id` VARCHAR(191) NOT NULL,
    `cliente` VARCHAR(191) NULL,
    `mesaId` VARCHAR(191) NOT NULL,
    `status` ENUM('ABERTA', 'FECHADA') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mesa` (
    `id` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `status` ENUM('OCUPADA', 'LIVRE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `cliente` VARCHAR(191) NULL,
    `mesas` INTEGER NOT NULL,

    UNIQUE INDEX `Mesa_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comandaId` VARCHAR(191) NOT NULL,
    `status` ENUM('PREPARANDO', 'PRONTO', 'ENTREGUE') NOT NULL DEFAULT 'PREPARANDO',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `preco` DOUBLE NOT NULL,
    `categoria` VARCHAR(191) NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `produtoId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `observacao` VARCHAR(191) NULL,
    `precoUnitario` DOUBLE NOT NULL,
    `precoTotal` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comanda` ADD CONSTRAINT `fk_comanda_mesa` FOREIGN KEY (`mesaId`) REFERENCES `Mesa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_comandaId_fkey` FOREIGN KEY (`comandaId`) REFERENCES `Comanda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Pedido` ADD CONSTRAINT `ItemPedido_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Pedido` ADD CONSTRAINT `ItemPedido_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
