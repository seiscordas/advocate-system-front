import React from "react";
import { Template, ImageCard } from "../../components";



export default function GaleriaPage(){
    return (
        <Template>
            <section className="grid grid-cols-4 gap-8">
                <ImageCard title="Imagem 1" description="descrição da imagem 1" scr="" uploadDate="10/10/2024"/>
                <ImageCard title="Imagem 2" description="descrição da imagem 2" scr="" uploadDate="10/10/2024"/>
                <ImageCard title="Imagem 3" description="descrição da imagem 3" scr="" uploadDate="10/10/2024"/>
                <ImageCard title="Imagem 4" description="descrição da imagem 4" scr="" uploadDate="10/10/2024"/>
                <ImageCard title="Imagem 5" description="descrição da imagem 5" scr="" uploadDate="10/10/2024"/>
                <ImageCard title="Imagem 6" description="descrição da imagem 6" scr="" uploadDate="10/10/2024"/>
                <ImageCard title="Imagem 7" description="descrição da imagem 7" scr="" uploadDate="10/10/2024"/>
            </section>
        </Template>
    )
}