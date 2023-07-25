'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230725140114 extends Migration {

  async up() {
    this.addSql('alter table "trial" alter column "nct_id" type text using ("nct_id"::text);');

    this.addSql('alter table "trial" alter column "nct_id" type varchar(255) using ("nct_id"::varchar(255));');
  }

  async down() {
    this.addSql('alter table "trial" alter column "nct_id" drop default;');
    this.addSql('alter table "trial" alter column "nct_id" type uuid using ("nct_id"::text::uuid);');
  }

}
exports.Migration20230725140114 = Migration20230725140114;
