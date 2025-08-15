

"use client";
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

export default function CarouselComponent() {
    return (
        <div className="max-w-4xl mx-auto">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                transitionTime={500}
            >
                <div className="relative w-full h-[500px]">
                    <Image 
                        src="/carousel/Lumilagro.webp" 
                        alt="Mate Calabaza"
                        fill
                        className="object-cover"
                    />
                    <p className="legend">Termos Lumilagro</p>
                </div>
                <div className="relative w-full h-[500px]">
                    <Image 
                        src="/carousel/Stanley2.webp" 
                        alt="Mate Camionero"
                        fill
                        className="object-cover"
                    />
                    <p className="legend">Mate Térmico Stanley - Resistente</p>
                </div>
                <div className="relative w-full h-[500px]">
                    <Image 
                        src="/carousel/Termo-stanley.webp" 
                        alt="Mate Térmico"
                        fill
                        className="object-cover"
                    />
                    <p className="legend">Mate Térmico - Mantiene Temperatura</p>
                </div>
            </Carousel>
        </div>
    );
}