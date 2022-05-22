import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  IsBoolean,
  ValidateNested,
} from 'class-validator';

export class SongCompareDto {
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => SongEntryDto)
  songList!: SongEntryDto[];
}

export class SongImportDto {
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => SongEntryDto)
  songList!: SongEntryDto[];
}

export class SongUpdateDto {
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => SongEntryDto)
  songList!: SongEntryDto[];

  @IsBoolean()
  @IsNotEmpty()
  deleteSong!: boolean;
}

export class SongMetaDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  genre!: string;

  @IsString()
  @IsNotEmpty()
  release!: string;

  @IsNumber()
  @IsNotEmpty()
  bpm!: number;
}

export class SongDifficultyDto {
  @IsNumber()
  @IsNotEmpty()
  level!: number;

  @IsNumber()
  @IsNotEmpty()
  const!: number;

  @IsNumber()
  @IsNotEmpty()
  maxcombo!: number;

  @IsNumber()
  @IsNotEmpty()
  is_const_unknown!: number;
}

export class SongDataDto {
  @ValidateNested()
  @Type(() => SongDifficultyDto)
  BAS?: SongDifficultyDto;

  @ValidateNested()
  @Type(() => SongDifficultyDto)
  ADV?: SongDifficultyDto;

  @ValidateNested()
  @Type(() => SongDifficultyDto)
  EXP?: SongDifficultyDto;

  @ValidateNested()
  @Type(() => SongDifficultyDto)
  MAS?: SongDifficultyDto;

  @ValidateNested()
  @Type(() => SongDifficultyDto)
  ULT?: SongDifficultyDto;

  @ValidateNested()
  @Type(() => SongDifficultyDto)
  WE?: SongDifficultyDto;
}

export class SongEntryDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SongMetaDto)
  meta!: SongMetaDto;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SongDataDto)
  data!: SongDataDto;
}

export class SongModeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
