import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class TrialView {
  @Expose()
  @IsString()
  public id: string;

  @Expose()
  @IsString()
  public officialTitle: string;

  @Expose()
  @IsString()
  public briefTitle: string;

  @Expose()
  @IsString()
  public status: string;
}
