import { Exclude, Expose, Type } from "class-transformer";
import { IsInt, IsLatitude, IsLongitude, IsNumber, IsOptional, IsTimeZone, ValidateNested } from "class-validator";

export class RainSnowResponse {
    @IsNumber()
    "1h": number;
}

export class CurrentResponse {
    @IsNumber()
    temp: number;

    @Type(() => CurrentResponse)
    @IsOptional()
    @ValidateNested()
    rain?: RainSnowResponse;

    @Type(() => CurrentResponse)
    @IsOptional()
    @ValidateNested()
    snow?: RainSnowResponse;
}

export class WeatherResponse {
    @IsLatitude()
    lat: number;

    @IsLongitude()
    lon: number;

    @IsTimeZone()
    timezone: string;

    @IsInt()
    timezone_offset: number;

    @Type(() => CurrentResponse)
    @ValidateNested()
    current: CurrentResponse;
}
