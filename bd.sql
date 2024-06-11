DROP TABLE IF EXISTS "public"."personas";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."personas" (
    "personaid" int4 NOT NULL,
    "nombres" varchar NOT NULL,
    "apellidos" varchar NOT NULL,
    "identificacion" varchar NOT NULL,
    "fecha_nacimiento" timestamp NOT NULL,
    PRIMARY KEY ("personaid")
);

DROP TABLE IF EXISTS "public"."roles";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."roles" (
    "rolid" int4 NOT NULL,
    "rolname" varchar NOT NULL,
    PRIMARY KEY ("rolid")
);

DROP TABLE IF EXISTS "public"."sesiones";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."sesiones" (
    "sesionid" int4 NOT NULL,
    "fecha_ingreso" timestamp NOT NULL,
    "fecha_cierre" timestamp,
    "usuarioid" int4 NOT NULL,
    CONSTRAINT "FK_6f2be4d03fb6d5e541663e1f2c7" FOREIGN KEY ("usuarioid") REFERENCES "public"."usuarios"("usuarioid"),
    PRIMARY KEY ("sesionid")
);

DROP TABLE IF EXISTS "public"."usuarios";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."usuarios" (
    "usuarioid" int4 NOT NULL,
    "username" varchar NOT NULL,
    "correo" varchar NOT NULL,
    "contrasena" varchar NOT NULL,
    "estado" bool NOT NULL,
    "codigo" varchar,
    "intentos" int4,
    "rolid" int4 NOT NULL,
    "personaid" int4 NOT NULL,
    CONSTRAINT "FK_dad4e151ed59462355fa5794a58" FOREIGN KEY ("rolid") REFERENCES "public"."roles"("rolid"),
    CONSTRAINT "FK_68be5233c49b8d3c9636cc170a2" FOREIGN KEY ("personaid") REFERENCES "public"."personas"("personaid"),
    PRIMARY KEY ("usuarioid")
);








