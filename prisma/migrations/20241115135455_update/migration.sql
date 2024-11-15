-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "creditsCost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cron" TEXT,
ADD COLUMN     "executionPlan" TEXT;
