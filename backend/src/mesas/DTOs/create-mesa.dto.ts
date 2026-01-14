import { mesa_status } from "@prisma/client";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateMesaDTO {
    @IsNumber()
    mesa: number;

    @IsString()
    cliente?: string;

    @IsEnum(mesa_status)
    status?: mesa_status;
}