'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230728092328 extends Migration {

  async up() {
    this.addSql('create table "location" ("id" uuid not null, "country" varchar(255) not null, "zip" varchar(255) not null, "city" varchar(255) not null, "trial_nct_id" varchar(255) not null, constraint "location_pkey" primary key ("id"));');

    this.addSql('create table "icdcode" ("id" uuid not null, "icd_code" varchar(255) not null, "trial_nct_id" varchar(255) not null, constraint "icdcode_pkey" primary key ("id"));');

    this.addSql('alter table "location" add constraint "location_trial_nct_id_foreign" foreign key ("trial_nct_id") references "trial" ("nct_id") on update cascade;');

    this.addSql('alter table "icdcode" add constraint "icdcode_trial_nct_id_foreign" foreign key ("trial_nct_id") references "trial" ("nct_id") on update cascade;');

    this.addSql('alter table "trial" add column "brief_title" text not null;');
    this.addSql('alter table "trial" drop column "icd_code";');
    this.addSql('alter table "trial" rename column "title" to "official_title";');
  }

  async down() {
    this.addSql('drop table if exists "location" cascade;');

    this.addSql('drop table if exists "icdcode" cascade;');

    this.addSql('alter table "trial" add column "title" text not null, add column "icd_code" varchar(255) not null default \'not yet generated\';');
    this.addSql('alter table "trial" drop column "official_title";');
    this.addSql('alter table "trial" drop column "brief_title";');
  }

}
exports.Migration20230728092328 = Migration20230728092328;
