import {
    Field,
    FieldHint,
    FieldLabel,
    FieldMessageArea,
    FileInput,
    MediaPreviewItem,
    MediaPreviewList
} from "../styles";

type MediaUploadFieldProps = {
    selectedMediaFiles: File[];
    onMediaChange: (files: FileList | null) => void;
};

export function MediaUploadField({
    selectedMediaFiles,
    onMediaChange
}: MediaUploadFieldProps) {
    return (
        <Field $full>
            <FieldLabel>Photos or videos</FieldLabel>
            <FileInput
                type="file"
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                multiple
                onChange={(event) => onMediaChange(event.target.files)}
            />
            <FieldMessageArea>
                <FieldHint>
                    Upload photos or videos. Supported formats: JPG, PNG, WEBP, MP4, WEBM.
                </FieldHint>
            </FieldMessageArea>

            {selectedMediaFiles.length > 0 && (
                <MediaPreviewList>
                    {selectedMediaFiles.map((file) => (
                        <MediaPreviewItem key={`${file.name}-${file.size}`}>
                            {file.name}
                        </MediaPreviewItem>
                    ))}
                </MediaPreviewList>
            )}
        </Field>
    );
}