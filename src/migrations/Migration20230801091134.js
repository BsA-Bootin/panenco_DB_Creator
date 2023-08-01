'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230801091134 extends Migration {

  async up() {
    this.addSql('alter table "icdcode" rename column "icd_code" to "value";');
  }

  async down() {
    this.addSql('alter table "icdcode" rename column "value" to "icd_code";');
  }

}
exports.Migration20230801091134 = Migration20230801091134;
