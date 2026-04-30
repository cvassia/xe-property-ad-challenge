-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "propertyCategory" TEXT,
    "apartmentType" TEXT,
    "squareMeters" INTEGER NOT NULL DEFAULT 1,
    "energyClass" TEXT NOT NULL DEFAULT 'unknown',
    "floor" TEXT,
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "constructionYear" INTEGER,
    "renovationYear" INTEGER,
    "condition" TEXT,
    "contactPhone" TEXT NOT NULL DEFAULT '',
    "areaPlaceId" TEXT NOT NULL,
    "areaMainText" TEXT NOT NULL,
    "areaSecondaryText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Ad" ("apartmentType", "areaMainText", "areaPlaceId", "areaSecondaryText", "bathrooms", "bedrooms", "condition", "constructionYear", "contactPhone", "createdAt", "description", "energyClass", "floor", "id", "price", "propertyCategory", "renovationYear", "squareMeters", "title", "type", "updatedAt") SELECT "apartmentType", "areaMainText", "areaPlaceId", "areaSecondaryText", "bathrooms", "bedrooms", "condition", "constructionYear", "contactPhone", "createdAt", "description", "energyClass", "floor", "id", "price", "propertyCategory", "renovationYear", "squareMeters", "title", "type", "updatedAt" FROM "Ad";
DROP TABLE "Ad";
ALTER TABLE "new_Ad" RENAME TO "Ad";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
