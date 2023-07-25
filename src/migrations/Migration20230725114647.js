'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230725114647 extends Migration {

  async up() {
    this.addSql('alter table "trial" add column "title" varchar(255) not null, add column "data" varchar(255) not null;');
    this.addSql('alter table "trial" alter column "icd_code" type varchar(255) using ("icd_code"::varchar(255));');
    this.addSql('alter table "trial" alter column "icd_code" set default \'not yet generated\';');
    this.addSql('alter table "trial" drop constraint "trial_pkey";');
    this.addSql('alter table "trial" drop column "name";');
    this.addSql('alter table "trial" rename column "id" to "nct_id";');
    this.addSql('alter table "trial" add constraint "trial_pkey" primary key ("nct_id");');
  }

  async down() {
    this.addSql('alter table "trial" add column "name" varchar(255) not null default \'\';');
    this.addSql('alter table "trial" alter column "icd_code" type varchar(255) using ("icd_code"::varchar(255));');
    this.addSql('alter table "trial" alter column "icd_code" set default \'\';');
    this.addSql('alter table "trial" drop constraint "trial_pkey";');
    this.addSql('alter table "trial" drop column "title";');
    this.addSql('alter table "trial" drop column "data";');
    this.addSql('alter table "trial" rename column "nct_id" to "id";');
    this.addSql('alter table "trial" add constraint "trial_pkey" primary key ("id");');
  }

}
exports.Migration20230725114647 = Migration20230725114647;
