import { MigrationInterface, QueryRunner } from "typeorm";

export class TBLListing1714988577367 implements MigrationInterface {
    name = 'TBLListing1714988577367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "listings" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subTitle" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addedById" integer, CONSTRAINT "PK_520ecac6c99ec90bcf5a603cdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_08308cf30f859d287daa0be7e63" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_08308cf30f859d287daa0be7e63"`);
        await queryRunner.query(`DROP TABLE "listings"`);
    }

}
