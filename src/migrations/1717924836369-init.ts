import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1717924836369 implements MigrationInterface {
    name = 'Init1717924836369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."doctor_specialization_enum" AS ENUM('Anesthesia', 'Cardiovascular', 'CommunityHealth', 'Dentistry', 'Dermatologic', 'DietNutrition', 'Emergency', 'Endocrine', 'Gastroenterologic', 'Genetic', 'Geriatric', 'Gynecologic', 'Hematologic', 'Infectious', 'LaboratoryScience', 'Midwifery', 'Musculoskeletal', 'Neurologic', 'Nursing', 'Obstetric', 'OccupationalTherapy', 'Oncologic', 'Optometic', 'Otolaryngologic', 'Pathology', 'Pediatric', 'PharmacySpecialty', 'Physiotherapy', 'PlasticSurgery', 'Podiatric', 'PrimaryCare', 'Psychiatric', 'PublicHealth', 'Pulmonary', 'Radiograpy', 'Renal', 'RespiratoryTherapy', 'Rheumatologic', 'SpeechPathology', 'Surgical', 'Toxicologic', 'Urologic')`);
        await queryRunner.query(`CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "specialization" "public"."doctor_specialization_enum" NOT NULL, CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birthDate" date NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "startTime" TIMESTAMP NOT NULL, "reason" character varying NOT NULL, "doctorId" integer, "patientId" integer, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_5ce4c3130796367c93cd817948e"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "doctor"`);
        await queryRunner.query(`DROP TYPE "public"."doctor_specialization_enum"`);
    }

}
