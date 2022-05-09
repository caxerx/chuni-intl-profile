import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  key!: string;

  @IsString()
  @IsNotEmpty()
  value!: string;
}

export class UpdateSettingDto {
  @IsString()
  @IsNotEmpty()
  value!: string;
}
