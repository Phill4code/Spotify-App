/* eslint-disable prettier/prettier */
import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";

export class CreateSongDTO {
    @IsString()
    @IsNotEmpty()
    readonly title;

    @IsNotEmpty()
    @IsArray()
    @IsString({each: true})
    readonly artists;

    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date

    @IsString()
    lyrics: string;


}