import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";



//AppStyles

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    color: #172033;
    background: #f4f7fb;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    margin: 0;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  button {
    cursor: pointer;
  }
`;

export const AppShell = styled.main`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0;

  @media (max-width: 720px) {
    width: min(100% - 24px, 1120px);
    padding: 24px 0;
  }
`;

export const Card = styled.section`
  border: 1px solid #dce4ef;
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgb(18 38 63 / 8%);

  @media (max-width: 720px) {
    border-radius: 22px;
  }
`;

export const HeroCard = styled(Card)`
  padding: 32px;

  @media (max-width: 720px) {
    padding: 22px;
  }
`;

export const FormCard = styled(Card)`
  margin-top: 24px;
  padding: 32px;

  @media (max-width: 720px) {
    padding: 22px;
  }
`;


export const HeroContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const Heading = styled.h1`
  margin: 0;
  color: #111827;
  font-size: clamp(2rem, 4vw, 2.5rem);
  line-height: 1;
  letter-spacing: -0.05em;
`;

export const HeroDescription = styled.p`
  max-width: 680px;
  margin: 18px 0 0;
  color: #5c667a;
  font-size: 1.05rem;
  line-height: 1.7;
`;

export const StatusPill = styled.div`
  flex: 0 0 auto;
  padding: 10px 14px;
  border-radius: 999px;
  color: #24563b;
  background: #e6f6ed;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
  width: fit-content;


  @media (max-width: 720px) {
    width: 100%;
    text-align: center;
  }
`;



// AdDetailsPage

export const Page = styled.section`
  display: grid;
  gap: 18px;
`;

export const TopBar = styled.div`
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

export const BrandMark = styled(Link)`
  color: #f5b400;
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  text-decoration: none;

  span {
    color: #1f4fbf;
  }
`;

export const BackLink = styled(Link)`
  color: #3464d4;
  font-size: 0.95rem;
  font-weight: 800;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const MainCard = styled.article`
  overflow: hidden;
  border: 1px solid #dce4ef;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgb(18 38 63 / 8%);
  padding: 20px;
`;

export const ListingHero = styled.div`
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


export const MediaLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(260px, 1fr);
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const MediaTile = styled.div`
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

export const Breadcrumb = styled.nav`
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


export const Title = styled.h1`
  margin: 0;
  color: #111827;
  font-size: clamp(1.9rem, 4vw, 3.25rem);
  line-height: 1.05;
  letter-spacing: -0.045em;
`;

export const LocationText = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #4d5a70;
  font-size: 1rem;
  font-weight: 700;
`;

export const Price = styled.div`
  color: #1f4fbf;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 950;
  letter-spacing: -0.04em;
`;


export const DetailsGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 15px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div<{ $full?: boolean }>`
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

export const MediaGallery = styled.section`
  padding: 20px;
  border-bottom: 1px solid #e7edf6;
  background: #ffffff;

  @media (max-width: 720px) {
    padding: 16px;
  }
`;

export const MainMediaButton = styled.button`
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

export const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-content: start;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const ThumbnailButton = styled.button`
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

export const ThumbnailOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgb(17 24 39 / 52%);
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 900;
`;

export const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(15 23 42 / 82%);
`;

export const LightboxContent = styled.div`
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

export const LightboxMediaFrame = styled.div`
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

export const LightboxCloseButton = styled.button`
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

export const LightboxArrowButton = styled.button<{ $left?: boolean; $right?: boolean }>`
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

export const LightboxCounter = styled.div`
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

export const ContactCard = styled.section`
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

export const ShowPhoneButton = styled.button`
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

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 50;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgb(17 24 39 / 55%);
`;

export const ModalCard = styled.div`
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

export const PhoneNumber = styled.a`
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

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
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

export const Sidebar = styled.aside`
  display: grid;
  gap: 16px;
  position: sticky;
  top: 24px;

  @media (max-width: 900px) {
    position: static;
  }
`;

export const MapCard = styled.section`
  overflow: hidden;
  border: 1px solid #dce4ef;
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgb(18 38 63 / 8%);
`;

export const MapPreview = styled.div`
  position: relative;
  min-height: 260px;
  background:
    linear-gradient(90deg, rgb(52 100 212 / 10%) 1px, transparent 1px),
    linear-gradient(rgb(52 100 212 / 10%) 1px, transparent 1px),
    linear-gradient(135deg, #eef4ff, #ffffff);
  background-size: 34px 34px;
`;

export const MapRoad = styled.div`
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

export const MapPin = styled.div`
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

export const MapContent = styled.div`
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

export const LocationMeta = styled.dl`
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

export const Message = styled.div<{ $variant?: "error" }>`
  padding: 18px;
  border: 1px solid
    ${({ $variant }) => ($variant === "error" ? "#f3b4ae" : "#dce4ef")};
  border-radius: 18px;
  background: ${({ $variant }) => ($variant === "error" ? "#fff4f2" : "#ffffff")};
  color: ${({ $variant }) => ($variant === "error" ? "#b42318" : "#4d5a70")};
  font-weight: 800;
`;



//PropertyAddFormStyles

export const Form = styled.form`
  display: grid;
  gap: 28px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionTitle = styled.div`
  grid-column: 1 / -1;
  padding-top: 8px;

  h2 {
    margin: 0;
    color: #111827;
    font-size: 1.15rem;
  }

  p {
    margin: 6px 0 0;
    color: #667085;
    font-size: 0.9rem;
  }
`;

export const Field = styled.label<{ $full?: boolean }>`
  display: grid;
  gap: 8px;
  grid-column: ${({ $full }) => ($full ? "1 / -1" : "auto")};
`;

export const FieldLabel = styled.span`
  color: #263247;
  font-size: 0.95rem;
  font-weight: 800;
`;

export const FieldGroup = styled.div`
  display: grid;
  gap: 8px;
`;

export const AutocompleteWrapper = styled.div`
  position: relative;
`;

export const inputStyles = `
  width: 100%;
  border: 1px solid #cfd8e6;
  border-radius: 16px;
  background: #ffffff;
  color: #172033;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &:focus {
    border-color: #3464d4;
    box-shadow: 0 0 0 4px rgb(52 100 212 / 14%);
  }

  &[aria-invalid="true"] {
    border-color: #b42318;
  }
`;

export const TextInput = styled.input`
  ${inputStyles}
  min-height: 52px;
  padding: 0 14px;
`;

export const SelectInput = styled.select`
  ${inputStyles}
  min-height: 52px;
  padding: 0 44px 0 14px;
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, #4d5a70 50%),
    linear-gradient(135deg, #4d5a70 50%, transparent 50%);
  background-position:
    calc(100% - 26px) 50%,
    calc(100% - 21px) 50%;
  background-size:
    5px 5px,
    5px 5px;
  background-repeat: no-repeat;
`;

export const TextArea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  padding: 14px;
`;

export const FileInput = styled.input`
  ${inputStyles}
  min-height: 52px;
  padding: 13px 14px;
`;

export const MediaPreviewList = styled.ul`
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const MediaPreviewItem = styled.li`
  color: #4d5a70;
  font-size: 0.9rem;
`;

export const FieldHint = styled.span`
  color: #667085;
  font-size: 0.85rem;
`;



export const FieldErrorHint = styled.span`
  color: #b42318;
  font-size: 0.85rem;
`;

export const FieldMessageArea = styled.div`
  min-height: 20px;
  display: flex;
  align-items: center;
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  z-index: 10;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  max-height: 260px;
  margin: 0;
  padding: 8px;
  overflow-y: auto;
  border: 1px solid #dce4ef;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 40px rgb(18 38 63 / 14%);
  list-style: none;
`;

export const SuggestionButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  border: 0;
  border-radius: 12px;
  padding: 12px;
  background: ${({ $active }) => ($active ? "#f1f5ff" : "transparent")};
  color: #172033;
  text-align: left;

  &:hover,
  &:focus {
    background: #f1f5ff;
    outline: none;
  }

  strong {
    display: block;
    color: #111827;
    font-size: 0.95rem;
  }

  span {
    display: block;
    margin-top: 4px;
    color: #667085;
    font-size: 0.85rem;
  }
`;

export const SubmitMessage = styled.div<{ $variant: "success" | "error" }>`
  padding: 16px;
  border-radius: 16px;
  border: 1px solid
    ${({ $variant }) => ($variant === "success" ? "#b7e4c7" : "#f3b4ae")};
  background: ${({ $variant }) =>
    $variant === "success" ? "#ecfdf3" : "#fff4f2"};
  color: ${({ $variant }) => ($variant === "success" ? "#24563b" : "#b42318")};
  font-size: 0.95rem;
  line-height: 1.6;

  strong {
    display: block;
    margin-bottom: 4px;
  }

  a {
    color: inherit;
    font-weight: 800;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SubmitButton = styled.button`
  min-height: 52px;
  border: 0;
  border-radius: 16px;
  padding: 0 22px;
  color: #ffffff;
  background: #3464d4;
  font-weight: 800;
  box-shadow: 0 14px 30px rgb(52 100 212 / 24%);

  &:hover:not(:disabled) {
    background: #284fad;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const RequiredMark = styled.span`
  color: #b42318;
  margin-left: 4px;
`;