'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230725135951 extends Migration {

  async up() {
    this.addSql('alter table "trial" alter column "icd_code" type varchar(255) using ("icd_code"::varchar(255));');
    this.addSql('alter table "trial" alter column "icd_code" set default \'not yet generated\';');
    this.addSql('alter table "trial" drop column "data";');
  }

  async down() {
    this.addSql('alter table "trial" add column "data" varchar(255) not null;');
    this.addSql('alter table "trial" alter column "icd_code" drop default;');
    this.addSql('alter table "trial" alter column "icd_code" type varchar(255) using ("icd_code"::varchar(255));');
  }

}
exports.Migration20230725135951 = Migration20230725135951;
