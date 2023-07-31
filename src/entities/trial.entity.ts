import { BaseEntity, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ICDCode } from './icdcodes.entity';
import { Location } from './locations.entity';

@Entity()
export class Trial extends BaseEntity<Trial, 'id'> {
  @PrimaryKey()
  public id: string;

  @Property({ type: 'text' })
  public officialTitle: string;

  @Property({ type: 'text' })
  public briefTitle: string;

  @Property()
  public status: string;

  @OneToMany(() => ICDCode, (t) => t.trial)
  public icdCodes = new Collection<ICDCode>(this);

  @OneToMany(() => Location, (t) => t.trial)
  public locations = new Collection<Location>(this);
}
