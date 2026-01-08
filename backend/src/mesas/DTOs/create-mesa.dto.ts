import { StatusMesa } from "@prisma/client";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateMesaDTO {
    @IsNumber()
    mesa: number;

    @IsString()
    cliente?: string;

    @IsEnum(StatusMesa)
    status?: StatusMesa;
}