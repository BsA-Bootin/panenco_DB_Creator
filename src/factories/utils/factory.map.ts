import { EntityBaseType } from '../../utils/entities/base.entity';
import { FactoryConstructor } from './factories.types';

export declare type EntityConstructor<T> = Function & { prototype: T };
export const factoryMap = new Map<EntityConstructor<EntityBaseType>, FactoryConstructor>();
