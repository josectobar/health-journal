CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(100) NOT NULL,
	"username" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "entries" (
	"id" serial NOT NULL,
	"date" DATE NOT NULL,
	"content" TEXT NOT NULL,
	"user_id" int NOT NULL,
	"private" bool NOT NULL DEFAULT 'true',
	CONSTRAINT entries_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "files" (
	"id" serial NOT NULL,
	"file_path" varchar(200) NOT NULL,
	"user_id" serial NOT NULL,
	CONSTRAINT files_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tags" (
	"id" serial NOT NULL,
	"tag_name" varchar(50) NOT NULL,
	CONSTRAINT tags_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tag_entries" (
	"tag_id" int NOT NULL,
	"entry_id" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "indicators" (
	"indicator_name" varchar(50) NOT NULL,
	"id" serial NOT NULL,
	CONSTRAINT indicators_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "indicator_users" (
	"user_id" int NOT NULL,
	"indicator_id" int NOT NULL,
	"reading" numeric NOT NULL,
	"date" DATE NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "conditions" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"condition_name" varchar(100) NOT NULL,
	CONSTRAINT conditions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "medication" (
	"id" serial NOT NULL,
	"medication_name" varchar(100) NOT NULL,
	CONSTRAINT medication_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "medication_users" (
	"user_id" int NOT NULL,
	"medication_id" int NOT NULL
) WITH (
  OIDS=FALSE
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);



ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
ALTER TABLE "entries" ADD CONSTRAINT "entries_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "files" ADD CONSTRAINT "files_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");


ALTER TABLE "tag_entries" ADD CONSTRAINT "tag_entries_fk0" FOREIGN KEY ("tag_id") REFERENCES "tags"("id");
ALTER TABLE "tag_entries" ADD CONSTRAINT "tag_entries_fk1" FOREIGN KEY ("entry_id") REFERENCES "entries"("id");


ALTER TABLE "indicator_users" ADD CONSTRAINT "indicator_users_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "indicator_users" ADD CONSTRAINT "indicator_users_fk1" FOREIGN KEY ("indicator_id") REFERENCES "indicators"("id");

ALTER TABLE "conditions" ADD CONSTRAINT "conditions_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "medication_users" ADD CONSTRAINT "medication_users_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "medication_users" ADD CONSTRAINT "medication_users_fk1" FOREIGN KEY ("medication_id") REFERENCES "medication"("id");


