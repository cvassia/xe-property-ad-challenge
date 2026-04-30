import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { getPropertyAd } from "../api/ads";
import type { PropertyAd } from "../types/ad";


const Page = styled.section`
  display: grid;
  gap: 18px;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  border: 1px solid #dce4ef;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgb(18 38 63 / 6%);

  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const BrandMark = styled(Link)`
  color: #f5b400;
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  text-decoration: none;

  span {
    color: #1f4fbf;
  }
`;

const BackLink = styled(Link)`
  color: #3464d4;
  font-size: 0.95rem;
  font-weight: 800;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainCard = styled.article`
  overflow: hidden;
  border: 1px solid #dce4ef;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgb(18 38 63 / 8%);
  padding: 20px,
`;

const ListingHero = styled.div`
  display: grid;
  gap: 18px;
  padding: 28px;
  border-bottom: 1px solid #e7edf6;
  background:
    linear-gradient(135deg, rgb(52 100 212 / 10%), transparent 38%),
    #ffffff;

  @media (max-width: 720px) {
    padding: 22px;
  }
`;


const MediaLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(260px, 1fr);
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const MediaTile = styled.div`
  overflow: hidden;
  min-height: 220px;
  border-radius: 18px;
  background: #eef4ff;

  img,
  video {
    width: 100%;
    height: 100%;
    min-height: 220px;
    display: block;
    object-fit: cover;
  }
`;

const Breadcrumb = styled.nav`
  color: #667085;
  font-size: 0.9rem;

  a {
    color: #3464d4;
    font-weight: 800;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;


const Title = styled.h1`
  margin: 0;
  color: #111827;
  font-size: clamp(1.9rem, 4vw, 3.25rem);
  line-height: 1.05;
  letter-spacing: -0.045em;
`;

const LocationText = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #4d5a70;
  font-size: 1rem;
  font-weight: 700;
`;

const Price = styled.div`
  color: #1f4fbf;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 950;
  letter-spacing: -0.04em;
`;


const DetailsGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 15px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div<{ $full?: boolean }>`
  display: grid;
  gap: 6px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #f8fbff;
  grid-column: ${({ $full }) => ($full ? "1 / -1" : "auto")};

  dt {
    color: #667085;
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
    color: #172033;
    font-size: 1rem;
    font-weight: 800;
  }
`;

const MediaGallery = styled.section`
  padding: 20px;
  border-bottom: 1px solid #e7edf6;
  background: #ffffff;

  @media (max-width: 720px) {
    padding: 16px;
  }
`;

const MainMediaButton = styled.button`
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 520px;
  border: 0;
  border-radius: 18px;
  padding: 0;
  background: #eef4ff;
  cursor: pointer;

  img,
  video {
    width: 100%;
    height: 100%;
    min-height: 520px;
    display: block;
    object-fit: cover;
  }

  @media (max-width: 900px) {
    min-height: 320px;

    img,
    video {
      min-height: 320px;
    }
  }
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-content: start;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ThumbnailButton = styled.button`
  position: relative;
  overflow: hidden;
  min-height: 154px;
  border: 0;
  border-radius: 18px;
  padding: 0;
  background: #eef4ff;
  cursor: pointer;

  img,
  video {
    width: 100%;
    height: 100%;
    min-height: 154px;
    display: block;
    object-fit: cover;
  }
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgb(17 24 39 / 52%);
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 900;
`;

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(15 23 42 / 82%);
`;

const LightboxContent = styled.div`
  position: relative;
  width: min(1100px, 100%);
  max-height: 90vh;
  padding: 56px 72px;
  border-radius: 24px;
  background: #111827;

  @media (max-width: 720px) {
    padding: 56px 16px 24px;
  }
`;

const LightboxMediaFrame = styled.div`
  display: grid;
  place-items: center;

  img,
  video {
    max-width: 100%;
    max-height: 72vh;
    border-radius: 18px;
    display: block;
    object-fit: contain;
  }
`;

const LightboxCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 999px;
  background: rgb(255 255 255 / 12%);
  color: #ffffff;
  font-size: 1.4rem;
  cursor: pointer;
`;

const LightboxArrowButton = styled.button<{ $left?: boolean; $right?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ $left }) => ($left ? "left: 16px;" : "")}
  ${({ $right }) => ($right ? "right: 16px;" : "")}
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 999px;
  background: rgb(255 255 255 / 12%);
  color: #ffffff;
  font-size: 1.4rem;
  cursor: pointer;

  @media (max-width: 720px) {
    width: 40px;
    height: 40px;
  }
`;

const LightboxCounter = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  border-radius: 999px;
  background: rgb(255 255 255 / 12%);
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 800;
`;

const ContactCard = styled.section`
  display: grid;
  gap: 14px;
  padding: 22px;
  border: 1px solid #dce4ef;
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgb(18 38 63 / 8%);

  h2 {
    margin: 0;
    color: #111827;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    color: #5c667a;
    line-height: 1.6;
  }
`;

const ShowPhoneButton = styled.button`
  min-height: 48px;
  border: 0;
  border-radius: 14px;
  padding: 0 16px;
  color: #ffffff;
  background: #3464d4;
  font-weight: 900;

  &:hover {
    background: #284fad;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 50;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgb(17 24 39 / 55%);
`;

const ModalCard = styled.div`
  width: min(100%, 420px);
  display: grid;
  gap: 18px;
  padding: 24px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 24px 80px rgb(17 24 39 / 35%);

  h2 {
    margin: 0;
    color: #111827;
    font-size: 1.3rem;
  }

  p {
    margin: 0;
    color: #5c667a;
    line-height: 1.6;
  }
`;

const PhoneNumber = styled.a`
  display: block;
  padding: 16px;
  border: 1px solid #dce4ef;
  border-radius: 16px;
  color: #1f4fbf;
  background: #f8fbff;
  font-size: 1.35rem;
  font-weight: 950;
  text-align: center;
  text-decoration: none;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  min-height: 44px;
  border: 1px solid #cfd8e6;
  border-radius: 14px;
  padding: 0 16px;
  color: #172033;
  background: #ffffff;
  font-weight: 800;

  &:hover {
    background: #f8fbff;
  }
`;

const Sidebar = styled.aside`
  display: grid;
  gap: 16px;
  position: sticky;
  top: 24px;

  @media (max-width: 900px) {
    position: static;
  }
`;

const MapCard = styled.section`
  overflow: hidden;
  border: 1px solid #dce4ef;
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgb(18 38 63 / 8%);
`;

const MapPreview = styled.div`
  position: relative;
  min-height: 260px;
  background:
    linear-gradient(90deg, rgb(52 100 212 / 10%) 1px, transparent 1px),
    linear-gradient(rgb(52 100 212 / 10%) 1px, transparent 1px),
    linear-gradient(135deg, #eef4ff, #ffffff);
  background-size: 34px 34px;
`;

const MapRoad = styled.div`
  position: absolute;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 0 0 1px #dce4ef;

  &:nth-child(1) {
    width: 78%;
    height: 16px;
    top: 42%;
    left: 10%;
    transform: rotate(-18deg);
  }

  &:nth-child(2) {
    width: 64%;
    height: 14px;
    top: 58%;
    left: 22%;
    transform: rotate(24deg);
  }

  &:nth-child(3) {
    width: 14px;
    height: 78%;
    top: 10%;
    left: 52%;
    transform: rotate(12deg);
  }
`;

const MapPin = styled.div`
  position: absolute;
  left: 50%;
  top: 48%;
  display: grid;
  width: 54px;
  height: 54px;
  place-items: center;
  border: 4px solid #ffffff;
  border-radius: 999px;
  background: #3464d4;
  color: #ffffff;
  font-size: 1.5rem;
  box-shadow: 0 18px 34px rgb(52 100 212 / 30%);
  transform: translate(-50%, -50%);
`;

const MapContent = styled.div`
  display: grid;
  gap: 10px;
  padding: 20px;

  h2 {
    margin: 0;
    color: #111827;
    font-size: 1.05rem;
  }

  p {
    margin: 0;
    color: #5c667a;
    line-height: 1.6;
  }
`;

const LocationMeta = styled.dl`
  display: grid;
  gap: 10px;
  margin: 8px 0 0;

  div {
    display: grid;
    gap: 4px;
  }

  dt {
    color: #667085;
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
    color: #172033;
    font-weight: 800;
  }
`;



const Message = styled.div<{ $variant?: "error" }>`
  padding: 18px;
  border: 1px solid
    ${({ $variant }) => ($variant === "error" ? "#f3b4ae" : "#dce4ef")};
  border-radius: 18px;
  background: ${({ $variant }) => ($variant === "error" ? "#fff4f2" : "#ffffff")};
  color: ${({ $variant }) => ($variant === "error" ? "#b42318" : "#4d5a70")};
  font-weight: 800;
`;

function formatPrice(price: number) {
  return new Intl.NumberFormat("el-GR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(price);
}

function formatPropertyType(type: string) {
  const labels: Record<string, string> = {
    rent: "Rent",
    buy: "Buy",
    auction: "Auction",
    exchange: "Exchange",
  };

  return labels[type] ?? type;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function formatOptionalValue(value: string | number | null | undefined) {
  return value === null || value === undefined || value === ""
    ? "Not provided"
    : value;
}

function formatCondition(value: string | null | undefined) {
  const labels: Record<string, string> = {
    renovated: "Renovated",
    needs_renovation: "Needs renovation",
    under_construction: "Under construction",
    unfinished: "Unfinished"
  };

  if (!value) {
    return "Not provided";
  }

  return labels[value] ?? value;
}

function formatPropertyCategory(value: string) {
  const labels: Record<string, string> = {
    apartment: "Apartment",
    detached_house: "Detached house",
    maisonette: "Maisonette",
    studio: "Studio",
    loft: "Loft"
  };

  return labels[value] ?? value;
}

export function AdDetailsPage() {
  const { adId } = useParams<{ adId: string }>();

  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
  const [ad, setAd] = useState<PropertyAd | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadAd() {
      if (!adId) {
        setError("Could not load this property ad.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const loadedAd = await getPropertyAd(adId);

        if (isMounted) {
          setAd(loadedAd);
        }
      } catch {
        if (isMounted) {
          setError("Could not load this property ad.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadAd();

    return () => {
      isMounted = false;
    };
  }, [adId]);


  const mediaItems = ad?.media ?? [];

  function openMedia(index: number) {
    setActiveMediaIndex(index);
  }

  function closeMedia() {
    setActiveMediaIndex(null);
  }

  function showPreviousMedia() {
    if (activeMediaIndex === null || mediaItems.length === 0) {
      return;
    }

    setActiveMediaIndex((activeMediaIndex - 1 + mediaItems.length) % mediaItems.length);
  }

  function showNextMedia() {
    if (activeMediaIndex === null || mediaItems.length === 0) {
      return;
    }

    setActiveMediaIndex((activeMediaIndex + 1) % mediaItems.length);
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
  }, [activeMediaIndex, mediaItems.length]);

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

            {ad.media.length > 0 && (
              <MediaGallery aria-label="Property media">
                <MediaLayout>
                  <MainMediaButton type="button" onClick={() => openMedia(0)}>
                    {ad.media[0].type === "video" ? (
                      <video src={ad.media[0].url} muted />
                    ) : (
                      <img src={ad.media[0].url} alt={`${ad.title} media 1`} />
                    )}
                  </MainMediaButton>

                  <ThumbnailGrid>
                    {ad.media.slice(1, 5).map((media, index) => {
                      const realIndex = index + 1;
                      const hiddenCount = ad.media.length - 5;
                      const isLastVisibleThumbnail = index === 3 && ad.media.length > 5;

                      return (
                        <ThumbnailButton
                          key={media.id}
                          type="button"
                          onClick={() => openMedia(realIndex)}
                        >
                          {media.type === "video" ? (
                            <video src={media.url} muted />
                          ) : (
                            <img src={media.url} alt={`${ad.title} media ${realIndex + 1}`} />
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
            )}

            <DetailsGrid>
              <DetailItem>
                <dt>Type</dt>
                <dd>{formatPropertyType(ad.type)}</dd>
              </DetailItem>

              <DetailItem>
                <dt>Category</dt>
                <dd>{formatPropertyCategory(ad.propertyCategory)}</dd>
              </DetailItem>

              <DetailItem>
                <dt>Size</dt>
                <dd>{ad.squareMeters} m²</dd>
              </DetailItem>

              <DetailItem>
                <dt>Area</dt>
                <dd>
                  {ad.area.mainText}, {ad.area.secondaryText}
                </dd>
              </DetailItem>

              <DetailItem>
                <dt>Energy class</dt>
                <dd>{ad.energyClass}</dd>
              </DetailItem>

              <DetailItem>
                <dt>Floor</dt>
                <dd>{formatOptionalValue(ad.floor)}</dd>
              </DetailItem>

              <DetailItem>
                <dt>Bedrooms</dt>
                <dd>{formatOptionalValue(ad.bedrooms)}</dd>
              </DetailItem>

              <DetailItem>
                <dt>Bathrooms</dt>
                <dd>{formatOptionalValue(ad.bathrooms)}</dd>
              </DetailItem>

              <DetailItem>
                <dt>Condition</dt>
                <dd>{formatCondition(ad.condition)}</dd>
              </DetailItem>

              <DetailItem>
                <dt>Construction year</dt>
                <dd>{formatOptionalValue(ad.constructionYear)}</dd>
              </DetailItem>

              <DetailItem>
                <dt>Renovation year</dt>
                <dd>{formatOptionalValue(ad.renovationYear)}</dd>
              </DetailItem>

              <DetailItem>
                <dt>Created</dt>
                <dd>{formatDate(ad.createdAt)}</dd>
              </DetailItem>

              <DetailItem $full>
                <dt>Description</dt>
                <dd>{ad.description || "No extra description was provided."}</dd>
              </DetailItem>
            </DetailsGrid>
          </MainCard>

          <Sidebar>
            <ContactCard aria-label="Contact advertiser">
              <h2>Interested in this property?</h2>
              <p>Contact the advertiser directly to ask for more information.</p>

              <ShowPhoneButton type="button" onClick={() => setIsPhoneModalOpen(true)}>
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
        </Layout>
      )}
      {activeMediaIndex !== null && ad && ad.media[activeMediaIndex] && (
        <LightboxOverlay onClick={closeMedia}>
          <LightboxContent onClick={(event) => event.stopPropagation()}>
            <LightboxCloseButton type="button" onClick={closeMedia}>
              ×
            </LightboxCloseButton>

            {ad.media.length > 1 && (
              <>
                <LightboxArrowButton type="button" $left onClick={showPreviousMedia}>
                  ←
                </LightboxArrowButton>

                <LightboxArrowButton type="button" $right onClick={showNextMedia}>
                  →
                </LightboxArrowButton>
              </>
            )}

            <LightboxMediaFrame>
              {ad.media[activeMediaIndex].type === "video" ? (
                <video src={ad.media[activeMediaIndex].url} controls autoPlay />
              ) : (
                <img
                  src={ad.media[activeMediaIndex].url}
                  alt={`${ad.title} media ${activeMediaIndex + 1}`}
                />
              )}
            </LightboxMediaFrame>

            <LightboxCounter>
              {activeMediaIndex + 1} / {ad.media.length}
            </LightboxCounter>
          </LightboxContent>
        </LightboxOverlay>
      )}
      {isPhoneModalOpen && ad && (
        <ModalOverlay
          role="presentation"
          onClick={() => setIsPhoneModalOpen(false)}
        >
          <ModalCard
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-phone-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="contact-phone-title">Contact phone</h2>
            <p>Use this phone number to contact the advertiser about this property.</p>

            <PhoneNumber href={`tel:${ad.contactPhone}`}>
              {ad.contactPhone}
            </PhoneNumber>

            <ModalActions>
              <CloseButton type="button" onClick={() => setIsPhoneModalOpen(false)}>
                Close
              </CloseButton>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      )}
    </Page>
  );
}