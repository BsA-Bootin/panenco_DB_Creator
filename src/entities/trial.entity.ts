import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Trial extends BaseEntity<Trial, 'nctId'> {
  @PrimaryKey()
  public nctId: string;

  @Property({type: 'text'})
  public title: string;

  @Property()
  public ICD_code: string = "not yet generated";
}