import {ChartBarIcon} from "@heroicons/react/24/solid";

export default function Hero() {
    return (
        <div className="hero place-items-start bg-bottom"
             style={{backgroundImage: 'url("milad-fakurian-PGdW_bHDbpI-unsplash-cropped.jpg")'}}>
            <div className="hero-overlay bg-opacity-10"></div>
            <div className="hero-content text-primary-content w-full px-5 py-10 sm:px-10 sm:py-40">
                <div className="w-full flex gap-8 text-primary-content">
                    <ChartBarIcon className="w-24 h-24 hidden sm:block" />
                    <div>
                        <h1 className="mb-5 text-5xl font-bold">NanoMRP</h1>
                        <p>
                            Automatic MRP report calculator web app.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
