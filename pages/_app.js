import "../styles/globals.css";
import { QuioscoProvider } from "../context/QuioscoProvider";
import { useEffect, useState } from "react";
function MyApp({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  );
}

export default MyApp;
