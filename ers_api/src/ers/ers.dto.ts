import { Transform } from 'class-transformer';
import {
  IsEmail,
  isEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  Length,
  max,
} from 'class-validator';
import { toNumber, trim } from './helper/ers.helper';

export class QueryDto {
  @Transform(({ value }) => trim(value))
  @IsOptional()
  public userName: string;

  @Transform(({ value }) => trim(value))
  @IsEmail()
  public userEmail: string;

  @Transform(({ value }) => toNumber(value, { default: 1234567890 }))
  @Length(10)
  @IsPhoneNumber('IN')
  @IsOptional()
  public userMobileNumber: number;
}
