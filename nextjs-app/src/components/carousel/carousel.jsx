

"use client";
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

export default function CarouselComponent() {
    return (
        <div className="max-w-[1200px] mx-auto">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                transitionTime={500}
            >
                <div className="relative h-[500px] ">
                    <Image 
                        src="/carousel/Lumilagro.webp" 
                        alt="Mate Calabaza"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-scale-down"
                    />
                    <p className="legend">Termos Lumilagro</p>
                </div>
                <div className="relative h-[500px]">
                    <Image 
                        src="/carousel/Stanley2.webp" 
                        alt="Mate Camionero"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-scale-down"
                    />
                    <p className="legend">Mate Térmico Stanley - Resistente</p>
                </div>
                <div className="relative h-[500px]">
                    <Image 
                        src="/carousel/Termo-stanley.webp" 
                        alt="Mate Térmico"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-scale-down"
                    />
                    <p className="legend">Mate Térmico - Mantiene Temperatura</p>
                </div>
            </Carousel>
        </div>
    );
}