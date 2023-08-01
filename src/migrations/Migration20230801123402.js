'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230801123402 extends Migration {

  async up() {
    this.addSql('create table "trial" ("id" varchar(255) not null, "official_title" text not null, "brief_title" text not null, "status" varchar(255) not null, constraint "trial_pkey" primary key ("id"));');

    this.addSql('create table "location" ("id" uuid not null, "country" varchar(255) not null default \'undefined\', "zip" varchar(255) not null default \'undefined\', "city" varchar(255) not null default \'undefined\', "trial_id" varchar(255) not null, constraint "location_pkey" primary key ("id"));');

    this.addSql('create table "icdcode" ("id" uuid not null, "value" varchar(255) not null, "trial_id" varchar(255) not null, constraint "icdcode_pkey" primary key ("id"));');

    this.addSql('alter table "location" add constraint "location_trial_id_foreign" foreign key ("trial_id") references "trial" ("id") on update cascade;');

    this.addSql('alter table "icdcode" add constraint "icdcode_trial_id_foreign" foreign key ("trial_id") references "trial" ("id") on update cascade;');
  }

  async down() {
    this.addSql('alter table "location" drop constraint "location_trial_id_foreign";');

    this.addSql('alter table "icdcode" drop constraint "icdcode_trial_id_foreign";');

    this.addSql('drop table if exists "trial" cascade;');

    this.addSql('drop table if exists "location" cascade;');

    this.addSql('drop table if exists "icdcode" cascade;');
  }

}
exports.Migration20230801123402 = Migration20230801123402;
