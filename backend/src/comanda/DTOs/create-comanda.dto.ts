import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateComandaDTO {
    @IsOptional()
    @IsString()
    cliente?: string;

    @IsInt()
    mesaId: number;
}
