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

const CategoryBadge = styled.span`
  width: fit-content;
  padding: 7px 12px;
  border-radius: 999px;
  color: #1f4fbf;
  background: #eef4ff;
  font-size: 0.82rem;
  font-weight: 900;
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

const Content = styled.div`
  display: grid;
  gap: 24px;
  padding: 28px;

  @media (max-width: 720px) {
    padding: 22px;
  }
`;

const Section = styled.section`
  display: grid;
  gap: 12px;

  h2 {
    margin: 0;
    color: #111827;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: #4d5a70;
    line-height: 1.75;
  }
`;

const DetailsGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 0;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: grid;
  gap: 6px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #f8fbff;

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
        exchange: "Exchange",
        donation: "Donation"
    };

    return labels[type] ?? type;
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(value));
}

export function AdDetailsPage() {
    const { adId } = useParams<{ adId: string }>();

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
                                <Link to="/">Ακίνητα</Link> / {formatPropertyType(ad.type)}
                            </Breadcrumb>

                            <CategoryBadge>Property classified</CategoryBadge>

                            <Title>{ad.title}</Title>

                            <LocationText>
                                📍 {ad.area.mainText}, {ad.area.secondaryText}
                            </LocationText>

                            <Price>{formatPrice(ad.price)}</Price>
                        </ListingHero>

                        <Content>
                            <Section>
                                <h2>Basic information</h2>
                                <DetailsGrid>
                                    <DetailItem>
                                        <dt>Type</dt>
                                        <dd>{formatPropertyType(ad.type)}</dd>
                                    </DetailItem>

                                    <DetailItem>
                                        <dt>Area</dt>
                                        <dd>
                                            {ad.area.mainText}, {ad.area.secondaryText}
                                        </dd>
                                    </DetailItem>

                                    <DetailItem>
                                        <dt>Created</dt>
                                        <dd>{formatDate(ad.createdAt)}</dd>
                                    </DetailItem>
                                </DetailsGrid>
                            </Section>

                            <Section>
                                <h2>Description</h2>
                                <p>{ad.description || "No extra description was provided."}</p>
                            </Section>
                        </Content>
                    </MainCard>

                    <Sidebar>


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
        </Page>
    );
}