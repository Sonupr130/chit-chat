// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import { Auth0Provider } from '@auth0/auth0-react';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Auth0Provider
//     domain="dev-rfwzlfpf3punwe1z.us.auth0.com"
//     clientId="jqI3AbfxcNiKUWlDivT6SOoTCQhwKTSQ"
//     authorizationParams={{
//       redirect_uri: window.location.origin
//     }}
//   >

//     <BrowserRouter>
//     <App />
//     </BrowserRouter>
//   </Auth0Provider>,
//   </StrictMode>,
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
    domain="dev-8ahtep7kzgrnsfhd.us.auth0.com"
    clientId="2bDUyYh0OmdM2nxu2vNxcdszr4pVF13w"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);
