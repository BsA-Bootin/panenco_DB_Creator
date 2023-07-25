import { MikroORM } from "@mikro-orm/core";
import config from "./orm.config"

MikroORM.init(config).then(async (orm) => {

    const migrator = orm.getMigrator();
    const test = await migrator.createMigration();
    await migrator.up();

});