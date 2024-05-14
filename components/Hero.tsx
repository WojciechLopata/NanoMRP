import {ChartBarIcon, DocumentIcon} from "@heroicons/react/24/solid";
import {useEffect, useRef} from "react";

export default function Hero() {
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            const opacity = Math.max(0, 1 - scrollPos / 300); // Adjust 300 to control the rate of fading

            if (buttonRef.current) {
                // @ts-ignore
                buttonRef.current.style.opacity = opacity;
                // @ts-ignore
                buttonRef.current.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="hero place-items-start bg-bottom"
             style={{backgroundImage: 'url("milad-fakurian-PGdW_bHDbpI-unsplash-cropped.jpg")'}}>
            <div className="hero-overlay bg-opacity-10"></div>
            <div className="hero-content w-full px-5 py-10 sm:px-10 sm:py-40">
                <div className="w-full flex gap-8 text-neutral">
                    <ChartBarIcon className="w-24 h-24 hidden sm:block"/>
                    <div>
                        <div className="flex gap-5">
                            <h1 className="mb-5 text-5xl font-bold">NanoMRP</h1>
                            <button ref={buttonRef} className="btn btn-square sm:fixed top-5 right-5 z-20 shadow-xl"
                                    onClick={
                                        // @ts-ignore
                                        () => document.getElementById('export-import-modal').showModal()
                                    }>
                                <DocumentIcon className="w-6"/>
                            </button>
                        </div>
                        <p>
                            Automatic MRP report calculator web app.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
