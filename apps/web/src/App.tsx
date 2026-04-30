import { Route, Routes } from "react-router-dom";

import { AdDetailsPage } from "./components/AdDetailsPage";
import { CreateAdPage } from "./components/CreateAdPage";
import { AppShell, GlobalStyle } from "./styles";

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