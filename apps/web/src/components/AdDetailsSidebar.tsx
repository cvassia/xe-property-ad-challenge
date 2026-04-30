import type { PropertyAd } from "../types/ad";
import {
    ContactCard,
    LocationMeta,
    MapCard,
    MapContent,
    MapPin,
    MapPreview,
    MapRoad,
    ShowPhoneButton,
    Sidebar
} from "../styles";

type AdDetailsSidebarProps = {
    ad: PropertyAd;
    onShowPhone: () => void;
};

export function AdDetailsSidebar({ ad, onShowPhone }: AdDetailsSidebarProps) {
    return (
        <Sidebar>
            <ContactCard aria-label="Contact advertiser">
                <h2>Interested in this property?</h2>
                <p>Contact the advertiser directly to ask for more information.</p>

                <ShowPhoneButton type="button" onClick={onShowPhone}>
                    Show phone
                </ShowPhoneButton>
            </ContactCard>

            <MapCard aria-label="Property location">
                <MapPreview>
                    <MapRoad />
                    <MapRoad />
                    <MapRoad />
                    <MapPin aria-hidden="true">📍</MapPin>
                </MapPreview>

                <MapContent>
                    <h2>Location</h2>
                    <p>
                        The property is listed in {ad.area.mainText}, {ad.area.secondaryText}.
                    </p>

                    <LocationMeta>
                        <div>
                            <dt>Area</dt>
                            <dd>{ad.area.mainText}</dd>
                        </div>

                        <div>
                            <dt>Region</dt>
                            <dd>{ad.area.secondaryText}</dd>
                        </div>
                    </LocationMeta>
                </MapContent>
            </MapCard>
        </Sidebar>
    );
}