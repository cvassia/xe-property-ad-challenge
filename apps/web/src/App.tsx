import { Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { AdDetailsPage } from "./components/AdDetailsPage";
import { PropertyAdForm } from "./components/PropertyAdForm";

const GlobalStyle = createGlobalStyle`
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

const AppShell = styled.main`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0;

  @media (max-width: 720px) {
    width: min(100% - 24px, 1120px);
    padding: 24px 0;
  }
`;

const Card = styled.section`
  border: 1px solid #dce4ef;
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgb(18 38 63 / 8%);

  @media (max-width: 720px) {
    border-radius: 22px;
  }
`;

const HeroCard = styled(Card)`
  padding: 32px;

  @media (max-width: 720px) {
    padding: 22px;
  }
`;

const FormCard = styled(Card)`
  margin-top: 24px;
  padding: 32px;

  @media (max-width: 720px) {
    padding: 22px;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 12px;
  color: #3464d4;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const HeroContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const Heading = styled.h1`
  margin: 0;
  color: #111827;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1;
  letter-spacing: -0.05em;
`;

const HeroDescription = styled.p`
  max-width: 680px;
  margin: 18px 0 0;
  color: #5c667a;
  font-size: 1.05rem;
  line-height: 1.7;
`;

const StatusPill = styled.div`
  flex: 0 0 auto;
  padding: 10px 14px;
  border-radius: 999px;
  color: #24563b;
  background: #e6f6ed;
  font-size: 0.9rem;
  font-weight: 700;

  @media (max-width: 720px) {
    width: 100%;
    text-align: center;
  }
`;

function CreateAdPage() {
  return (
    <>
      <HeroCard>
        <Eyebrow>XE Web Developer Challenge</Eyebrow>

        <HeroContent>
          <div>
            <Heading>Create a property ad</Heading>
            <HeroDescription>
              A responsive real estate ad form focused on area autocomplete,
              validation, persistence, caching, and tests.
            </HeroDescription>
          </div>

          <StatusPill>Property classified form</StatusPill>
        </HeroContent>
      </HeroCard>

      <FormCard>
        <PropertyAdForm />
      </FormCard>
    </>
  );
}

export function App() {
  return (
    <>
      <GlobalStyle />

      <AppShell>
        <Routes>
          <Route path="/" element={<CreateAdPage />} />
          <Route path="/ads/:adId" element={<AdDetailsPage />} />
        </Routes>
      </AppShell>
    </>
  );
}