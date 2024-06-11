CREATE OR REPLACE PROCEDURE public.crear_roles_y_admin()
 LANGUAGE plpgsql
AS $procedure$
DECLARE 
    admin_role_id INT;
    admin_person_id INT;
BEGIN
    INSERT INTO "public"."roles" ("rolid", "rolname") VALUES (1, 'administrador'), (2, 'usuario');
    INSERT INTO "public"."personas" ("personaid", "nombres", "apellidos", "identificacion", "fecha_nacimiento")
    VALUES (1, 'Admin', 'Admin', '1234567890', '2024-06-11 00:00:00');
    SELECT "rolid" INTO admin_role_id FROM "public"."roles" WHERE "rolname" = 'administrador';
    SELECT "personaid" INTO admin_person_id FROM "public"."personas" WHERE "identificacion" = '1234567890';

    -- Crear usuario administrador password=Contraseña123!
    INSERT INTO "public"."usuarios" ("usuarioid", "username", "correo", "contrasena", "estado", "rolid", "personaid")
    VALUES (1, 'admin', 'jesusmald.23@gmail.com', '$2a$08$7lSAoMmlNxp3GVFH6kziT.IrEQpQM0suXh.5yXwho6GR6j.OONAQS', TRUE, admin_role_id, admin_person_id);
END;
$procedure$
