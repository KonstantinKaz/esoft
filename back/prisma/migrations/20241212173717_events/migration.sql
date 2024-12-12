-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('CLIENT_MEETING', 'SHOWING', 'SCHEDULED_CALL');

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER,
    "type" "EventType" NOT NULL,
    "comment" TEXT,
    "realtor_id" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_realtor_id_fkey" FOREIGN KEY ("realtor_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
