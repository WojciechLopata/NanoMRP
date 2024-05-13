export default function Hero() {
    return (
        <div className="hero place-items-start" style={{ backgroundImage: 'url(javier-miranda-xB2XP29gn10-unsplash-cropped.jpg)' }}>
            <div className="hero-overlay bg-opacity-25"></div>
            <div className="hero-content text-primary-content w-full p-10 sm:py-40">
                <div className="w-full">
                    <h1 className="mb-5 text-5xl font-bold">NanoMRP</h1>
                    <p>
                        Automatic MRP report calculator web app.
                    </p>
                </div>
            </div>
        </div>
    );
}
