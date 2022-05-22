import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class RecordEntryDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsNumber()
  score!: number;

  @IsNotEmpty()
  @IsIn(['BAS', 'ADV', 'EXP', 'MAS', 'ULT'])
  difficulty!: string;

  @IsIn(['FC', 'AJ', ''])
  fullCombo!: string;
}

export class RecordSubmitDto {
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => RecordEntryDto)
  record!: RecordEntryDto[];
}
