import type { PropertyAdMedia } from "../types/ad";
import {
    MainMediaButton,
    MediaGallery,
    MediaLayout,
    ThumbnailButton,
    ThumbnailGrid,
    ThumbnailOverlay
} from "../styles";

type PropertyMediaGalleryProps = {
    media: PropertyAdMedia[];
    title: string;
    onOpenMedia: (index: number) => void;
};

export function PropertyMediaGallery({
    media,
    title,
    onOpenMedia
}: PropertyMediaGalleryProps) {
    if (media.length === 0) {
        return null;
    }

    const mainMedia = media[0];
    const thumbnailItems = media.slice(1, 5);

    return (
        <MediaGallery aria-label="Property media">
            <MediaLayout>
                <MainMediaButton type="button" onClick={() => onOpenMedia(0)}>
                    {mainMedia.type === "video" ? (
                        <video src={mainMedia.url} muted />
                    ) : (
                        <img src={mainMedia.url} alt={`${title} media 1`} />
                    )}
                </MainMediaButton>

                <ThumbnailGrid>
                    {thumbnailItems.map((mediaItem, index) => {
                        const realIndex = index + 1;
                        const hiddenCount = media.length - 5;
                        const isLastVisibleThumbnail = index === 3 && media.length > 5;

                        return (
                            <ThumbnailButton
                                key={mediaItem.id}
                                type="button"
                                onClick={() => onOpenMedia(realIndex)}
                            >
                                {mediaItem.type === "video" ? (
                                    <video src={mediaItem.url} muted />
                                ) : (
                                    <img
                                        src={mediaItem.url}
                                        alt={`${title} media ${realIndex + 1}`}
                                    />
                                )}

                                {isLastVisibleThumbnail && (
                                    <ThumbnailOverlay>+{hiddenCount}</ThumbnailOverlay>
                                )}
                            </ThumbnailButton>
                        );
                    })}
                </ThumbnailGrid>
            </MediaLayout>
        </MediaGallery>
    );
}