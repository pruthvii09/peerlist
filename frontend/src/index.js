import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { ModalProvider } from "./context/ModalContext";
import { ConfettiProvider } from "./context/ConfettiContext";
import Confetti from "./components/utils/Confetti";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ConfettiProvider>
    <Confetti />
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Provider>
    </QueryClientProvider>
  </ConfettiProvider>
  // </React.StrictMode>
);

reportWebVitals();
