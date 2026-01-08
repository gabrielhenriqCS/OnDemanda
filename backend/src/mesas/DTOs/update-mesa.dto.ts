import { PartialType } from "@nestjs/mapped-types";
import { CreateMesaDTO } from "./create-mesa.dto";
import { IsEnum } from "class-validator";
import { StatusMesa } from "@prisma/client";

export class UpdateMesaDTO extends PartialType(CreateMesaDTO) {
    @IsEnum(StatusMesa)
    status?: StatusMesa
}