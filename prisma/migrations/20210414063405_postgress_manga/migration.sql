-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

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
    "volumes" INTEGER,
    "chapters" INTEGER,
    "ongoing" BOOLEAN NOT NULL,
    "publishedFrom" TIMESTAMP(3) NOT NULL,
    "publishedTo" TIMESTAMP(3),
    "authorId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Manga" ADD FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;
