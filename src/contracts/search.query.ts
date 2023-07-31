import { Exclude, Expose } from 'class-transformer';
import { IsLowercase, IsOptional, IsString } from 'class-validator';

@Exclude()
export class SearchQuery {
  @Expose()
  @IsString()
  @IsOptional()
  @IsLowercase()
  public country?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @IsLowercase()
  public icdCode?: string;
}
