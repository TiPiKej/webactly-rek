import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class RainingResponse {
    @IsBoolean()
    isRaining: boolean;

    @IsNumber()
    @IsOptional()
    hourRainingMm?: number;
}
