import { BaseEntity, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Trial } from './trial.entity';

@Entity()
export class Location extends BaseEntity<Location, 'id'> {
  @PrimaryKey({ columnType: 'uuid' })
  public id: string = v4();

  @Property()
  public country: string = 'undefined';

  @Property()
  public zip: string = 'undefined';

  @Property()
  public city: string = 'undefined';

  @ManyToOne()
  public trial: Trial;
}
