import Script from "next/script";
import { useEffect } from "react";

function GoogleADS() {
    useEffect(() => {
        // This function will be called once when the component mounts
        const handleScriptLoad = () => {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11324663584');
        };

        // Load Google Analytics script
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=AW-11324663584";
        script.async = true;
        script.onload = handleScriptLoad;
        document.body.appendChild(script);

        // Cleanup function
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null; // Google Analytics script is loaded asynchronously, so we don't need to render anything
}

export default GoogleADS;
