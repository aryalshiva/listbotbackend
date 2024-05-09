import { MigrationInterface, QueryRunner } from "typeorm";

export class TBLListings1715244246998 implements MigrationInterface {
    name = 'TBLListings1715244246998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."listings_approvalStatus_enum" AS ENUM('notSent', 'pending', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TYPE "public"."listings_sendStatus_enum" AS ENUM('notYet', 'sendToAdmin')`);
        await queryRunner.query(`CREATE TABLE "listings" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "subTitle" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "image" character varying NOT NULL, "approvalStatus" "public"."listings_approvalstatus_enum" NOT NULL DEFAULT 'notSent', "sendStatus" "public"."listings_sendstatus_enum" NOT NULL DEFAULT 'notYet', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addedById" integer, CONSTRAINT "PK_520ecac6c99ec90bcf5a603cdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_08308cf30f859d287daa0be7e63" FOREIGN KEY ("addedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_08308cf30f859d287daa0be7e63"`);
        await queryRunner.query(`DROP TABLE "listings"`);
        await queryRunner.query(`DROP TYPE "public"."listings_sendStatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."listings_approvalStatus_enum"`);
    }

}
