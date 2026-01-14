import { PartialType } from "@nestjs/mapped-types";
import { CreateMesaDTO } from "./create-mesa.dto";
import { IsEnum } from "class-validator";
import { mesa_status } from "@prisma/client";

export class UpdateMesaDTO extends PartialType(CreateMesaDTO) {
    @IsEnum(mesa_status)
    status?: mesa_status
}