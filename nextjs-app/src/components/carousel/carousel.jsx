

"use client";
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {styles} from '../../styles/styleClasses';

export default function CarouselComponent() {
    return (
        <div className="xl:w-[1200px] md:w-full mx-auto">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                transitionTime={500}
            >
                <div className={styles.carouselImage}>
                    <img
                        src="/carousel/Lumilagro.webp" 
                        alt="Mate Calabaza"
                        className="object-fit"
                    />
                    <p className="legend">Termos Lumilagro - Económicos y Prácticos</p>
                </div>
                <div className={styles.carouselImage}>
                    <img
                        src="/carousel/Stanley2.webp"
                        alt="Mate Camionero"
                        className="object-fit"
                    />
                    <p className="legend">Mate Térmico Stanley - Resistente</p>
                </div>
                <div className={styles.carouselImage}>
                    <img
                        src="/carousel/Termo-stanley.webp"
                        alt="Mate Térmico"
                        className="object-fit"
                    />
                    <p className="legend">Mate Térmico - Mantiene Temperatura</p>
                </div>
            </Carousel>
        </div>
    );
}