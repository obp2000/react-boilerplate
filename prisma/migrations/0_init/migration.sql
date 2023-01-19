-- CreateTable
CREATE TABLE "account_emailaddress" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "primary" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "account_emailaddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_emailconfirmation" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL,
    "sent" TIMESTAMPTZ(6),
    "key" VARCHAR(64) NOT NULL,
    "email_address_id" INTEGER NOT NULL,

    CONSTRAINT "account_emailconfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_group" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "auth_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_group_permissions" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "auth_group_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_permission" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content_type_id" INTEGER NOT NULL,
    "codename" VARCHAR(100) NOT NULL,

    CONSTRAINT "auth_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_user" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "last_login" TIMESTAMPTZ(6),
    "is_superuser" BOOLEAN NOT NULL,
    "username" VARCHAR(150) NOT NULL,
    "first_name" VARCHAR(150) NOT NULL,
    "last_name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "is_staff" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "date_joined" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "auth_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_user_groups" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "auth_user_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_user_user_permissions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "auth_user_user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authtoken_token" (
    "key" VARCHAR(40) NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "authtoken_token_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "city_city" (
    "pindex" VARCHAR(6) NOT NULL,
    "city" VARCHAR(80) NOT NULL,

    CONSTRAINT "city_city_pkey" PRIMARY KEY ("pindex")
);

-- CreateTable
CREATE TABLE "customer_city" (
    "pindex" VARCHAR(6),
    "city" VARCHAR(80) NOT NULL,
    "id" SERIAL NOT NULL,
    "address" VARCHAR(512),
    "opsname" VARCHAR(60),

    CONSTRAINT "customer_city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_customer" (
    "id" SERIAL NOT NULL,
    "nick" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "city_id" INTEGER,

    CONSTRAINT "customer_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "django_admin_log" (
    "id" SERIAL NOT NULL,
    "action_time" TIMESTAMPTZ(6) NOT NULL,
    "object_id" TEXT,
    "object_repr" VARCHAR(200) NOT NULL,
    "action_flag" SMALLINT NOT NULL,
    "change_message" TEXT NOT NULL,
    "content_type_id" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "django_admin_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "django_content_type" (
    "id" SERIAL NOT NULL,
    "app_label" VARCHAR(100) NOT NULL,
    "model" VARCHAR(100) NOT NULL,

    CONSTRAINT "django_content_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "django_migrations" (
    "id" SERIAL NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "applied" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "django_migrations_pkey2" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "django_migrations1" (
    "id" SERIAL NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "applied" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "django_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "django_migrations2" (
    "id" SERIAL NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "applied" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "django_migrations_pkey1" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "django_session" (
    "session_key" VARCHAR(40) NOT NULL,
    "session_data" TEXT NOT NULL,
    "expire_date" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "django_session_pkey" PRIMARY KEY ("session_key")
);

-- CreateTable
CREATE TABLE "django_site" (
    "id" SERIAL NOT NULL,
    "domain" VARCHAR(100) NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "django_site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knox_authtoken" (
    "digest" VARCHAR(128) NOT NULL,
    "salt" VARCHAR(16) NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expiry" TIMESTAMPTZ(6),
    "token_key" VARCHAR(8) NOT NULL,

    CONSTRAINT "knox_authtoken_pkey" PRIMARY KEY ("digest")
);

-- CreateTable
CREATE TABLE "order_item_orderitem" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(5,2) NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "order_id" INTEGER,
    "product_id" INTEGER,

    CONSTRAINT "order_item_orderitem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_order" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "post_cost" INTEGER NOT NULL,
    "packet" INTEGER,
    "delivery_type" INTEGER,
    "address" VARCHAR(255) NOT NULL,
    "gift" VARCHAR(255) NOT NULL,
    "customer_id" INTEGER,

    CONSTRAINT "order_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "threads" INTEGER,
    "contents" INTEGER,
    "price" INTEGER NOT NULL,
    "weight" DECIMAL(4,2),
    "width" INTEGER,
    "density" INTEGER,
    "dollar_price" DECIMAL(4,2),
    "dollar_rate" DECIMAL(5,2),
    "width_shop" INTEGER,
    "density_shop" INTEGER,
    "weight_for_count" INTEGER,
    "length_for_count" DECIMAL(5,2),
    "price_pre" INTEGER,
    "image" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "product_type_id" INTEGER,
    "fleece" BOOLEAN,

    CONSTRAINT "product_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_producttype" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "product_producttype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialaccount_socialaccount" (
    "id" SERIAL NOT NULL,
    "provider" VARCHAR(30) NOT NULL,
    "uid" VARCHAR(191) NOT NULL,
    "last_login" TIMESTAMPTZ(6) NOT NULL,
    "date_joined" TIMESTAMPTZ(6) NOT NULL,
    "extra_data" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "socialaccount_socialaccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialaccount_socialapp" (
    "id" SERIAL NOT NULL,
    "provider" VARCHAR(30) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "client_id" VARCHAR(191) NOT NULL,
    "secret" VARCHAR(191) NOT NULL,
    "key" VARCHAR(191) NOT NULL,

    CONSTRAINT "socialaccount_socialapp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialaccount_socialapp_sites" (
    "id" SERIAL NOT NULL,
    "socialapp_id" INTEGER NOT NULL,
    "site_id" INTEGER NOT NULL,

    CONSTRAINT "socialaccount_socialapp_sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialaccount_socialtoken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "token_secret" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(6),
    "account_id" INTEGER NOT NULL,
    "app_id" INTEGER NOT NULL,

    CONSTRAINT "socialaccount_socialtoken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_emailaddress_email_key" ON "account_emailaddress"("email");

-- CreateIndex
CREATE INDEX "account_emailaddress_email_03be32b2_like" ON "account_emailaddress"("email");

-- CreateIndex
CREATE INDEX "account_emailaddress_user_id_2c513194" ON "account_emailaddress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "account_emailconfirmation_key_key" ON "account_emailconfirmation"("key");

-- CreateIndex
CREATE INDEX "account_emailconfirmation_email_address_id_5b7f8c58" ON "account_emailconfirmation"("email_address_id");

-- CreateIndex
CREATE INDEX "account_emailconfirmation_key_f43612bd_like" ON "account_emailconfirmation"("key");

-- CreateIndex
CREATE UNIQUE INDEX "auth_group_name_key" ON "auth_group"("name");

-- CreateIndex
CREATE INDEX "auth_group_name_a6ea08ec_like" ON "auth_group"("name");

-- CreateIndex
CREATE INDEX "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions"("group_id");

-- CreateIndex
CREATE INDEX "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions"("permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions"("group_id", "permission_id");

-- CreateIndex
CREATE INDEX "auth_permission_content_type_id_2f476e4b" ON "auth_permission"("content_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission"("content_type_id", "codename");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_username_key" ON "auth_user"("username");

-- CreateIndex
CREATE INDEX "auth_user_username_6821ab7c_like" ON "auth_user"("username");

-- CreateIndex
CREATE INDEX "auth_user_groups_group_id_97559544" ON "auth_user_groups"("group_id");

-- CreateIndex
CREATE INDEX "auth_user_groups_user_id_6a12ed8b" ON "auth_user_groups"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_groups_user_id_group_id_94350c0c_uniq" ON "auth_user_groups"("user_id", "group_id");

-- CreateIndex
CREATE INDEX "auth_user_user_permissions_permission_id_1fbb5f2c" ON "auth_user_user_permissions"("permission_id");

-- CreateIndex
CREATE INDEX "auth_user_user_permissions_user_id_a95ead1b" ON "auth_user_user_permissions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq" ON "auth_user_user_permissions"("user_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "authtoken_token_user_id_key" ON "authtoken_token"("user_id");

-- CreateIndex
CREATE INDEX "authtoken_token_key_10f0b77e_like" ON "authtoken_token"("key");

-- CreateIndex
CREATE UNIQUE INDEX "city_city_city_key" ON "city_city"("city");

-- CreateIndex
CREATE INDEX "city_city_city_3a729809_like" ON "city_city"("city");

-- CreateIndex
CREATE INDEX "city_city_pindex_e0664d6f_like" ON "city_city"("pindex");

-- CreateIndex
CREATE INDEX "customer_city_city_pindex_fe14c5dd_idx" ON "customer_city"("city", "pindex");

-- CreateIndex
CREATE INDEX "customer_customer_city_id_f38aa8fc" ON "customer_customer"("city_id");

-- CreateIndex
CREATE INDEX "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log"("content_type_id");

-- CreateIndex
CREATE INDEX "django_admin_log_user_id_c564eba6" ON "django_admin_log"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type"("app_label", "model");

-- CreateIndex
CREATE INDEX "django_session_expire_date_a5c62663" ON "django_session"("expire_date");

-- CreateIndex
CREATE INDEX "django_session_session_key_c0390e0f_like" ON "django_session"("session_key");

-- CreateIndex
CREATE UNIQUE INDEX "django_site_domain_a2e37b91_uniq" ON "django_site"("domain");

-- CreateIndex
CREATE INDEX "django_site_domain_a2e37b91_like" ON "django_site"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "knox_authtoken_salt_key" ON "knox_authtoken"("salt");

-- CreateIndex
CREATE INDEX "knox_authtoken_digest_188c7e77_like" ON "knox_authtoken"("digest");

-- CreateIndex
CREATE INDEX "knox_authtoken_salt_3d9f48ac_like" ON "knox_authtoken"("salt");

-- CreateIndex
CREATE INDEX "knox_authtoken_token_key_8f4f7d47" ON "knox_authtoken"("token_key");

-- CreateIndex
CREATE INDEX "knox_authtoken_token_key_8f4f7d47_like" ON "knox_authtoken"("token_key");

-- CreateIndex
CREATE INDEX "knox_authtoken_user_id_e5a5d899" ON "knox_authtoken"("user_id");

-- CreateIndex
CREATE INDEX "order_item_orderitem_order_id_51e755c8" ON "order_item_orderitem"("order_id");

-- CreateIndex
CREATE INDEX "order_item_orderitem_product_id_0a6a03af" ON "order_item_orderitem"("product_id");

-- CreateIndex
CREATE INDEX "order_order_customer_id_5bbbd957" ON "order_order"("customer_id");

-- CreateIndex
CREATE INDEX "product_product_product_type_id_4bfbbfda" ON "product_product"("product_type_id");

-- CreateIndex
CREATE INDEX "socialaccount_socialaccount_user_id_8146e70c" ON "socialaccount_socialaccount"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "socialaccount_socialaccount_provider_uid_fc810c6e_uniq" ON "socialaccount_socialaccount"("provider", "uid");

-- CreateIndex
CREATE INDEX "socialaccount_socialapp_sites_site_id_2579dee5" ON "socialaccount_socialapp_sites"("site_id");

-- CreateIndex
CREATE INDEX "socialaccount_socialapp_sites_socialapp_id_97fb6e7d" ON "socialaccount_socialapp_sites"("socialapp_id");

-- CreateIndex
CREATE UNIQUE INDEX "socialaccount_socialapp__socialapp_id_site_id_71a9a768_uniq" ON "socialaccount_socialapp_sites"("socialapp_id", "site_id");

-- CreateIndex
CREATE INDEX "socialaccount_socialtoken_account_id_951f210e" ON "socialaccount_socialtoken"("account_id");

-- CreateIndex
CREATE INDEX "socialaccount_socialtoken_app_id_636a42d7" ON "socialaccount_socialtoken"("app_id");

-- CreateIndex
CREATE UNIQUE INDEX "socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq" ON "socialaccount_socialtoken"("app_id", "account_id");

-- AddForeignKey
ALTER TABLE "account_emailaddress" ADD CONSTRAINT "account_emailaddress_user_id_2c513194_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "account_emailconfirmation" ADD CONSTRAINT "account_emailconfirm_email_address_id_5b7f8c58_fk_account_e" FOREIGN KEY ("email_address_id") REFERENCES "account_emailaddress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_group_permissions" ADD CONSTRAINT "auth_group_permissio_permission_id_84c5c92e_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_group_permissions" ADD CONSTRAINT "auth_group_permissions_group_id_b120cbf9_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_permission" ADD CONSTRAINT "auth_permission_content_type_id_2f476e4b_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_user_groups" ADD CONSTRAINT "auth_user_groups_group_id_97559544_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_user_groups" ADD CONSTRAINT "auth_user_groups_user_id_6a12ed8b_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_user_user_permissions" ADD CONSTRAINT "auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_user_user_permissions" ADD CONSTRAINT "auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "authtoken_token" ADD CONSTRAINT "authtoken_token_user_id_35299eff_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_customer" ADD CONSTRAINT "customer_customer_city_id_f38aa8fc_fk_customer_city_id" FOREIGN KEY ("city_id") REFERENCES "customer_city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "django_admin_log" ADD CONSTRAINT "django_admin_log_content_type_id_c4bce8eb_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "django_admin_log" ADD CONSTRAINT "django_admin_log_user_id_c564eba6_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "knox_authtoken" ADD CONSTRAINT "knox_authtoken_user_id_e5a5d899_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item_orderitem" ADD CONSTRAINT "order_item_orderitem_order_id_51e755c8_fk_order_order_id" FOREIGN KEY ("order_id") REFERENCES "order_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item_orderitem" ADD CONSTRAINT "order_item_orderitem_product_id_0a6a03af_fk_product_product_id" FOREIGN KEY ("product_id") REFERENCES "product_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_order" ADD CONSTRAINT "order_order_customer_id_5bbbd957_fk_customer_customer_id" FOREIGN KEY ("customer_id") REFERENCES "customer_customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_product" ADD CONSTRAINT "product_product_product_type_id_4bfbbfda_fk_product_p" FOREIGN KEY ("product_type_id") REFERENCES "product_producttype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "socialaccount_socialaccount" ADD CONSTRAINT "socialaccount_socialaccount_user_id_8146e70c_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "socialaccount_socialapp_sites" ADD CONSTRAINT "socialaccount_social_site_id_2579dee5_fk_django_si" FOREIGN KEY ("site_id") REFERENCES "django_site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "socialaccount_socialapp_sites" ADD CONSTRAINT "socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc" FOREIGN KEY ("socialapp_id") REFERENCES "socialaccount_socialapp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "socialaccount_socialtoken" ADD CONSTRAINT "socialaccount_social_account_id_951f210e_fk_socialacc" FOREIGN KEY ("account_id") REFERENCES "socialaccount_socialaccount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "socialaccount_socialtoken" ADD CONSTRAINT "socialaccount_social_app_id_636a42d7_fk_socialacc" FOREIGN KEY ("app_id") REFERENCES "socialaccount_socialapp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

