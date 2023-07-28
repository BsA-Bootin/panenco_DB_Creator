import { BaseEntity, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Trial } from './trial.entity';

@Entity()
export class ICDCode extends BaseEntity<ICDCode, 'id'> {
  @PrimaryKey({ columnType: 'uuid' })
  public id: string = v4();

  @Property()
  public icdCode: string;

  @ManyToOne()
  public trial: Trial;
}
