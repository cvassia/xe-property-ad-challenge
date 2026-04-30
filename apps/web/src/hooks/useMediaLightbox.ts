import { useEffect, useState } from "react";

export function useMediaLightbox(mediaCount: number) {
    const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);

    function openMedia(index: number) {
        setActiveMediaIndex(index);
    }

    function closeMedia() {
        setActiveMediaIndex(null);
    }

    function showPreviousMedia() {
        setActiveMediaIndex((currentIndex) => {
            if (currentIndex === null || mediaCount === 0) {
                return currentIndex;
            }

            return (currentIndex - 1 + mediaCount) % mediaCount;
        });
    }

    function showNextMedia() {
        setActiveMediaIndex((currentIndex) => {
            if (currentIndex === null || mediaCount === 0) {
                return currentIndex;
            }

            return (currentIndex + 1) % mediaCount;
        });
    }


    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (activeMediaIndex === null) {
                return;
            }

            if (event.key === "Escape") {
                closeMedia();
            }

            if (event.key === "ArrowLeft") {
                showPreviousMedia();
            }

            if (event.key === "ArrowRight") {
                showNextMedia();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeMediaIndex, mediaCount]);

    return {
        activeMediaIndex,
        openMedia,
        closeMedia,
        showPreviousMedia,
        showNextMedia,
    };
}

