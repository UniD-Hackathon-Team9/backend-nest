import {IsString, IsArray} from "class-validator";

export class RecommendPayload {
    @IsString()
    personality!: string

    @IsArray()
    preferences: number[]
}