-- CreateTable
CREATE TABLE "Manga" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title_english" TEXT,
    "title_japanese" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT,
    "image_url" TEXT NOT NULL,
    "genres" TEXT[],
    "volumes" INTEGER,
    "chapters" INTEGER,
    "ongoing" BOOLEAN NOT NULL,
    "publishedFrom" TIMESTAMP(3) NOT NULL,
    "publishedTo" TIMESTAMP(3),
    "author" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
