-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(500) NOT NULL,
    "name" VARCHAR(500) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "create_time" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_un" ON "users"("email");
