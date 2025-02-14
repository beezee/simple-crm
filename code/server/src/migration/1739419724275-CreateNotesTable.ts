import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotesTable1739419724275 implements MigrationInterface {
    name = 'CreateNotesTable1739419724275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL, "userId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_note" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_5b87d9d19127bd5d92026017a7b" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_note"("id", "content", "createdAt", "userId") SELECT "id", "content", "createdAt", "userId" FROM "note"`);
        await queryRunner.query(`DROP TABLE "note"`);
        await queryRunner.query(`ALTER TABLE "temporary_note" RENAME TO "note"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" RENAME TO "temporary_note"`);
        await queryRunner.query(`CREATE TABLE "note" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL, "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "note"("id", "content", "createdAt", "userId") SELECT "id", "content", "createdAt", "userId" FROM "temporary_note"`);
        await queryRunner.query(`DROP TABLE "temporary_note"`);
        await queryRunner.query(`DROP TABLE "note"`);
    }

}
