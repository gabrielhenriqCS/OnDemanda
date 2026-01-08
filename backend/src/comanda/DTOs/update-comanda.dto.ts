import { IsEnum, IsOptional } from 'class-validator';
import { StatusComanda } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { CreateComandaDTO } from './create-comanda.dto';

export class UpdateComandaDTO extends PartialType(CreateComandaDTO) {
    @IsOptional()
    @IsEnum(StatusComanda)
    status?: StatusComanda;
}
