import { IsLatitude, IsLongitude } from "class-validator";

export class CoordinateParameters {
    @IsLatitude()
    lat: number;

    @IsLongitude()
    lon: number;
}
