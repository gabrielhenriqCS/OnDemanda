import { IsEnum, IsOptional } from 'class-validator';
import { comanda_status } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { CreateComandaDTO } from './create-comanda.dto';

export class UpdateComandaDTO extends PartialType(CreateComandaDTO) {
    @IsOptional()
    @IsEnum(comanda_status)
    status?: comanda_status;
}
