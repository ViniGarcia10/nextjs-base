/* eslint-disable @next/next/inline-script-id */
import Script from "next/script";

const UseScript = () => {
  return (
    <div>
      <Script strategy="afterInteractive">
        {`window.alert('Carreguei!!')`}
      </Script>
    </div>
  );
};

export default UseScript;
