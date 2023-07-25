'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230725114901 extends Migration {

  async up() {
    this.addSql('alter table "trial" alter column "icd_code" drop default;');
    this.addSql('alter table "trial" alter column "icd_code" type varchar(255) using ("icd_code"::varchar(255));');
  }

  async down() {
    this.addSql('alter table "trial" alter column "icd_code" type varchar(255) using ("icd_code"::varchar(255));');
    this.addSql('alter table "trial" alter column "icd_code" set default \'not yet generated\';');
  }

}
exports.Migration20230725114901 = Migration20230725114901;
