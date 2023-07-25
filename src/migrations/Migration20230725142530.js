'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230725142530 extends Migration {

  async up() {
    this.addSql('alter table "trial" alter column "title" type text using ("title"::text);');
  }

  async down() {
    this.addSql('alter table "trial" alter column "title" type varchar(255) using ("title"::varchar(255));');
  }

}
exports.Migration20230725142530 = Migration20230725142530;
