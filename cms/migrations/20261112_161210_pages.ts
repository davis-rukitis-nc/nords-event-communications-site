import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'About Us' NOT NULL,
  	"subtitle" varchar DEFAULT 'Nords Event Communications (NECom) is an event production, marketing and sponsorship agency creating experiences that are moving Riga and Latvia - literally and figuratively! Can you keep up?',
  	"header_image_id" integer,
  	"mission_heading" varchar DEFAULT 'Our Mission' NOT NULL,
  	"mission_text" varchar DEFAULT 'Events that move, inspire, elevate Riga and Latvia.' NOT NULL,
  	"mission_tagline" varchar DEFAULT 'Notikumi, kas (ie)kustina Rīgu!',
  	"what_we_do_heading" varchar DEFAULT 'What We Do' NOT NULL,
  	"what_we_do_text" varchar DEFAULT '26 years in the business of creating, shaping, selling, packaging, re-inventing the Baltic region''s most celebrated events.' NOT NULL,
  	"approach_heading" varchar DEFAULT 'Our Approach' NOT NULL,
  	"approach_text" varchar DEFAULT 'We know our way with the sponsors. We help them grow once they join our events. No bullshit. A proven track record. Wanna try us out?' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Contact Us' NOT NULL,
  	"subtitle" varchar DEFAULT 'Get in touch with NECom for inquiries about event marketing, sponsorship opportunities, or general questions. We''re here to help.',
  	"header_image_id" integer,
  	"heading" varchar DEFAULT 'Reach out if you dream big!' NOT NULL,
  	"intro" varchar DEFAULT 'Feel free to reach out with your ideas, interests in creating a partnership with our events, fine-tuning your sponsorship portfolio, generating impactful ideas to activate your sponsorship & charity initiatives, launching a product with a bang, or maybe finding a way to appear cool with your audiences!
  
  In doubt? No worries, we’ll find a way to help you. For a budget, of course. Or just for the sake of it and fun ... if we like you too much.' NOT NULL,
  	"email" varchar DEFAULT 'info@necom.lv' NOT NULL,
  	"office" varchar DEFAULT 'Nords Event Communications SIA
  Brīvības iela 40–24, Rīga, LV-1050, Latvia
  Reg. No. 50003981501' NOT NULL,
  	"expertise_heading" varchar DEFAULT 'Our Expertise' NOT NULL,
  	"cta_heading" varchar DEFAULT 'Get in touch' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "privacy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Privacy Policy' NOT NULL,
  	"subtitle" varchar DEFAULT 'How we collect, use, and protect information',
  	"header_image_id" integer,
  	"last_updated" timestamp(3) with time zone NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "terms_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Terms of Service' NOT NULL,
  	"subtitle" varchar DEFAULT 'The rules for using this website',
  	"header_image_id" integer,
  	"last_updated" timestamp(3) with time zone NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_header_image_id_media_id_fk" FOREIGN KEY ("header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_expertise" ADD CONSTRAINT "contact_page_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_header_image_id_media_id_fk" FOREIGN KEY ("header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_page" ADD CONSTRAINT "privacy_page_header_image_id_media_id_fk" FOREIGN KEY ("header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "terms_page" ADD CONSTRAINT "terms_page_header_image_id_media_id_fk" FOREIGN KEY ("header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "about_page_header_image_idx" ON "about_page" USING btree ("header_image_id");
  CREATE INDEX "contact_page_expertise_order_idx" ON "contact_page_expertise" USING btree ("_order");
  CREATE INDEX "contact_page_expertise_parent_id_idx" ON "contact_page_expertise" USING btree ("_parent_id");
  CREATE INDEX "contact_page_header_image_idx" ON "contact_page" USING btree ("header_image_id");
  CREATE INDEX "privacy_page_header_image_idx" ON "privacy_page" USING btree ("header_image_id");
  CREATE INDEX "terms_page_header_image_idx" ON "terms_page" USING btree ("header_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "about_page" CASCADE;
  DROP TABLE "contact_page_expertise" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "privacy_page" CASCADE;
  DROP TABLE "terms_page" CASCADE;`)
}
