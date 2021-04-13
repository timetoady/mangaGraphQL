/*
  Warnings:

  - Added the required column `title` to the `Manga` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Manga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title_english" TEXT,
    "title_japanese" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT,
    "image_url" TEXT NOT NULL,
    "volumes" INTEGER,
    "chapters" INTEGER,
    "ongoing" BOOLEAN NOT NULL,
    "publishedFrom" DATETIME NOT NULL,
    "publishedTo" DATETIME,
    "authorId" INTEGER,
    FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Manga" ("id", "createdAt", "updatedAt", "title_english", "title_japanese", "synopsis", "image_url", "volumes", "chapters", "ongoing", "publishedFrom", "publishedTo", "authorId") SELECT "id", "createdAt", "updatedAt", "title_english", "title_japanese", "synopsis", "image_url", "volumes", "chapters", "ongoing", "publishedFrom", "publishedTo", "authorId" FROM "Manga";
DROP TABLE "Manga";
ALTER TABLE "new_Manga" RENAME TO "Manga";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
