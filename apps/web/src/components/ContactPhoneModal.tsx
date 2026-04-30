import {
    CloseButton,
    ModalActions,
    ModalCard,
    ModalOverlay,
    PhoneNumber
} from "../styles";

type ContactPhoneModalProps = {
    contactPhone: string;
    onClose: () => void;
};

export function ContactPhoneModal({
    contactPhone,
    onClose
}: ContactPhoneModalProps) {
    return (
        <ModalOverlay role="presentation" onClick={onClose}>
            <ModalCard
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-phone-title"
                onClick={(event) => event.stopPropagation()}
            >
                <h2 id="contact-phone-title">Contact phone</h2>
                <p>Use this phone number to contact the advertiser about this property.</p>

                <PhoneNumber href={`tel:${contactPhone}`}>{contactPhone}</PhoneNumber>

                <ModalActions>
                    <CloseButton type="button" onClick={onClose}>
                        Close
                    </CloseButton>
                </ModalActions>
            </ModalCard>
        </ModalOverlay>
    );
}