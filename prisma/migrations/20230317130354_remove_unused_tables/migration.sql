/*
  Warnings:

  - You are about to drop the `account_emailaddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `account_emailconfirmation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth_group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth_group_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth_permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth_user_groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth_user_user_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `authtoken_token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `city_city` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `django_admin_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `django_content_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `django_migrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `django_migrations1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `django_migrations2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `django_session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `django_site` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `knox_authtoken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `socialaccount_socialaccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `socialaccount_socialapp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `socialaccount_socialapp_sites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `socialaccount_socialtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "account_emailaddress" DROP CONSTRAINT "account_emailaddress_user_id_2c513194_fk_auth_user_id";

-- DropForeignKey
ALTER TABLE "account_emailconfirmation" DROP CONSTRAINT "account_emailconfirm_email_address_id_5b7f8c58_fk_account_e";

-- DropForeignKey
ALTER TABLE "auth_group_permissions" DROP CONSTRAINT "auth_group_permissio_permission_id_84c5c92e_fk_auth_perm";

-- DropForeignKey
ALTER TABLE "auth_group_permissions" DROP CONSTRAINT "auth_group_permissions_group_id_b120cbf9_fk_auth_group_id";

-- DropForeignKey
ALTER TABLE "auth_permission" DROP CONSTRAINT "auth_permission_content_type_id_2f476e4b_fk_django_co";

-- DropForeignKey
ALTER TABLE "auth_user_groups" DROP CONSTRAINT "auth_user_groups_group_id_97559544_fk_auth_group_id";

-- DropForeignKey
ALTER TABLE "auth_user_groups" DROP CONSTRAINT "auth_user_groups_user_id_6a12ed8b_fk_auth_user_id";

-- DropForeignKey
ALTER TABLE "auth_user_user_permissions" DROP CONSTRAINT "auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm";

-- DropForeignKey
ALTER TABLE "auth_user_user_permissions" DROP CONSTRAINT "auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id";

-- DropForeignKey
ALTER TABLE "authtoken_token" DROP CONSTRAINT "authtoken_token_user_id_35299eff_fk_auth_user_id";

-- DropForeignKey
ALTER TABLE "django_admin_log" DROP CONSTRAINT "django_admin_log_content_type_id_c4bce8eb_fk_django_co";

-- DropForeignKey
ALTER TABLE "django_admin_log" DROP CONSTRAINT "django_admin_log_user_id_c564eba6_fk_auth_user_id";

-- DropForeignKey
ALTER TABLE "knox_authtoken" DROP CONSTRAINT "knox_authtoken_user_id_e5a5d899_fk_auth_user_id";

-- DropForeignKey
ALTER TABLE "socialaccount_socialaccount" DROP CONSTRAINT "socialaccount_socialaccount_user_id_8146e70c_fk_auth_user_id";

-- DropForeignKey
ALTER TABLE "socialaccount_socialapp_sites" DROP CONSTRAINT "socialaccount_social_site_id_2579dee5_fk_django_si";

-- DropForeignKey
ALTER TABLE "socialaccount_socialapp_sites" DROP CONSTRAINT "socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc";

-- DropForeignKey
ALTER TABLE "socialaccount_socialtoken" DROP CONSTRAINT "socialaccount_social_account_id_951f210e_fk_socialacc";

-- DropForeignKey
ALTER TABLE "socialaccount_socialtoken" DROP CONSTRAINT "socialaccount_social_app_id_636a42d7_fk_socialacc";

-- DropTable
DROP TABLE "account_emailaddress";

-- DropTable
DROP TABLE "account_emailconfirmation";

-- DropTable
DROP TABLE "auth_group";

-- DropTable
DROP TABLE "auth_group_permissions";

-- DropTable
DROP TABLE "auth_permission";

-- DropTable
DROP TABLE "auth_user_groups";

-- DropTable
DROP TABLE "auth_user_user_permissions";

-- DropTable
DROP TABLE "authtoken_token";

-- DropTable
DROP TABLE "city_city";

-- DropTable
DROP TABLE "django_admin_log";

-- DropTable
DROP TABLE "django_content_type";

-- DropTable
DROP TABLE "django_migrations";

-- DropTable
DROP TABLE "django_migrations1";

-- DropTable
DROP TABLE "django_migrations2";

-- DropTable
DROP TABLE "django_session";

-- DropTable
DROP TABLE "django_site";

-- DropTable
DROP TABLE "knox_authtoken";

-- DropTable
DROP TABLE "socialaccount_socialaccount";

-- DropTable
DROP TABLE "socialaccount_socialapp";

-- DropTable
DROP TABLE "socialaccount_socialapp_sites";

-- DropTable
DROP TABLE "socialaccount_socialtoken";
