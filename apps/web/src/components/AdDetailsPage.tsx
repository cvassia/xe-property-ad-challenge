import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ContactPhoneModal } from "./ContactPhoneModal";
import { MediaLightbox } from "./MediaLightbox";
import { PropertyMediaGallery } from "./PropertyMediaGallery";
import { PropertyDetailsGrid } from "./PropertyDetailsGrid";
import { AdDetailsSidebar } from "./AdDetailsSidebar";
import {
  BackLink,
  BrandMark,
  Breadcrumb,
  Layout,
  ListingHero,
  LocationText,
  MainCard,
  Message,
  Page,
  Price,
  Title,
  TopBar
} from "../styles";
import {
  formatPrice,
  formatPropertyType
} from "../helpers/helpers";
import { useMediaLightbox } from "../hooks/useMediaLightbox";
import { usePropertyAd } from "../hooks/usePropertyAd";


export function AdDetailsPage() {

  const { adId } = useParams<{ adId: string }>();
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const {
    ad,
    isLoading,
    error
  } = usePropertyAd(adId)

  const mediaItems = ad?.media ?? [];

  const {
    activeMediaIndex,
    openMedia,
    closeMedia,
    showPreviousMedia,
    showNextMedia
  } = useMediaLightbox(mediaItems.length);

  return (
    <Page>
      <TopBar>
        <BrandMark to="/">
          xe<span>.gr</span>
        </BrandMark>
        <BackLink to="/">← Create another property ad</BackLink>
      </TopBar>

      {isLoading && <Message>Loading property ad...</Message>}

      {!isLoading && error && <Message $variant="error">{error}</Message>}

      {!isLoading && !error && ad && (
        <Layout>
          <MainCard>
            <ListingHero>
              <Breadcrumb aria-label="Breadcrumb">
                <Link to="/">Property</Link> / {formatPropertyType(ad.type)}
              </Breadcrumb>

              <Title>{ad.title}</Title>

              <LocationText>
                📍 {ad.area.mainText}, {ad.area.secondaryText}
              </LocationText>

              <Price>{formatPrice(ad.price)}</Price>
            </ListingHero>

            <PropertyMediaGallery
              media={ad.media}
              title={ad.title}
              onOpenMedia={openMedia}
            />
            <PropertyDetailsGrid ad={ad} />
          </MainCard>

          <AdDetailsSidebar
            ad={ad}
            onShowPhone={() => setIsPhoneModalOpen(true)}
          />
        </Layout>
      )}
      {activeMediaIndex !== null && ad && (
        <MediaLightbox
          mediaItems={ad.media}
          activeMediaIndex={activeMediaIndex}
          title={ad.title}
          onClose={closeMedia}
          onPrevious={showPreviousMedia}
          onNext={showNextMedia}
        />
      )}
      {isPhoneModalOpen && ad && (
        <ContactPhoneModal
          contactPhone={ad.contactPhone}
          onClose={() => setIsPhoneModalOpen(false)}
        />
      )}
    </Page>
  );
}