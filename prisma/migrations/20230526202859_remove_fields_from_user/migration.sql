/*
  Warnings:

  - You are about to drop the column `date_joined` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `is_staff` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `is_superuser` on the `auth_user` table. All the data in the column will be lost.
  - You are about to drop the column `last_login` on the `auth_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auth_user" DROP COLUMN "date_joined",
DROP COLUMN "is_active",
DROP COLUMN "is_staff",
DROP COLUMN "is_superuser",
DROP COLUMN "last_login";
