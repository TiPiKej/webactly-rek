import { IsIn, IsInt, IsNumber, IsOptional, IsString, IsUrl, Length, Max, Min } from "class-validator";

export type ActivityTypes = "education" | "recreational" | "social" | "diy" | "charity" | "cooking" | "relaxation" | "music" | "busywork";

export class ActivityResponse {
    @IsString()
    activity: string;

    @IsNumber()
    @Min(0)
    @Max(1)
    accessibility: number;

    @IsIn(["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"])
    type: ActivityTypes;

    @IsInt()
    @Min(0)
    participants: number;

    @IsNumber()
    @Min(0)
    price: number;

    @IsUrl()
    link: string;

    @IsString()
    @Length(5, 10)
    key: string;
}

export class ActivityShortResponse {
    @IsString()
    activity: string;

    @IsIn(["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"])
    type: ActivityTypes;
}
