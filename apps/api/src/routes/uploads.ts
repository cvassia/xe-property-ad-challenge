import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";
import multer from "multer";
import { prisma } from "../db/prisma.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const uploadsDir = path.resolve(currentDir, "../../uploads");

fs.mkdirSync(uploadsDir, { recursive: true });

const allowedMimeTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/webm"
]);

const storage = multer.diskStorage({
    destination: (_request, _file, callback) => {
        callback(null, uploadsDir);
    },
    filename: (_request, file, callback) => {
        const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "-");
        const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        callback(null, `${uniquePrefix}-${safeOriginalName}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024
    },
    fileFilter: (_request, file, callback) => {
        if (!allowedMimeTypes.has(file.mimetype)) {
            callback(new Error("Only JPG, PNG, WEBP, MP4, and WEBM files are allowed."));
            return;
        }

        callback(null, true);
    }
});

export const uploadsRouter = Router();

uploadsRouter.post(
    "/ads/:adId/media",
    upload.array("media"),
    async (request, response) => {
        try {
            const adId = request.params.adId;

            if (typeof adId !== "string") {
                return response.status(400).json({
                    error: "Invalid property ad ID."
                });
            }

            const ad = await prisma.ad.findUnique({
                where: {
                    id: adId
                }
            });

            if (!ad) {
                return response.status(404).json({
                    error: "Property ad was not found."
                });
            }

            const files = request.files as Express.Multer.File[];

            if (!files || files.length === 0) {
                return response.status(400).json({
                    error: "At least one media file is required."
                });
            }

            const createdMedia = await prisma.$transaction(
                files.map((file) =>
                    prisma.adMedia.create({
                        data: {
                            adId: ad.id,
                            filename: file.filename,
                            url: `/uploads/${file.filename}`,
                            type: file.mimetype.startsWith("video/") ? "video" : "image"
                        }
                    })
                )
            );

            return response.status(201).json({
                data: createdMedia
            });
        } catch (error) {
            console.error("Upload media failed:", error);

            return response.status(500).json({
                error: "Could not upload media files."
            });
        }
    }
);