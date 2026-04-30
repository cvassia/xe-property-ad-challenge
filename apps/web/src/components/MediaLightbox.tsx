import type { PropertyAdMedia } from "../types/ad";
import {
    LightboxArrowButton,
    LightboxCloseButton,
    LightboxContent,
    LightboxCounter,
    LightboxMediaFrame,
    LightboxOverlay
} from "../styles";

type MediaLightboxProps = {
    mediaItems: PropertyAdMedia[];
    activeMediaIndex: number;
    title: string;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
};

export function MediaLightbox({
    mediaItems,
    activeMediaIndex,
    title,
    onClose,
    onPrevious,
    onNext
}: MediaLightboxProps) {
    const activeMedia = mediaItems[activeMediaIndex];

    if (!activeMedia) {
        return null;
    }

    return (
        <LightboxOverlay onClick={onClose}>
            <LightboxContent onClick={(event) => event.stopPropagation()}>
                <LightboxCloseButton type="button" onClick={onClose}>
                    ×
                </LightboxCloseButton>

                {mediaItems.length > 1 && (
                    <>
                        <LightboxArrowButton type="button" $left onClick={onPrevious}>
                            ←
                        </LightboxArrowButton>

                        <LightboxArrowButton type="button" $right onClick={onNext}>
                            →
                        </LightboxArrowButton>
                    </>
                )}

                <LightboxMediaFrame>
                    {activeMedia.type === "video" ? (
                        <video src={activeMedia.url} controls autoPlay />
                    ) : (
                        <img
                            src={activeMedia.url}
                            alt={`${title} media ${activeMediaIndex + 1}`}
                        />
                    )}
                </LightboxMediaFrame>

                <LightboxCounter>
                    {activeMediaIndex + 1} / {mediaItems.length}
                </LightboxCounter>
            </LightboxContent>
        </LightboxOverlay>
    );
}