import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/styles.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MainContextProvider } from "./context/mainContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
//import { Toaster } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <MainContextProvider>
        <Toaster position="top-right" />
        <App />
      </MainContextProvider>
    </BrowserRouter>
  </Provider>
);
