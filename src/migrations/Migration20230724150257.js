'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230724150257 extends Migration {

  async up() {
    this.addSql('create table "trial" ("id" uuid not null, "name" varchar(255) not null default \'\', "icd_code" varchar(255) not null default \'\', constraint "trial_pkey" primary key ("id"));');
  }

  async down() {
    this.addSql('drop table if exists "trial" cascade;');
  }

}
exports.Migration20230724150257 = Migration20230724150257;
