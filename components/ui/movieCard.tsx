import { movieCardType } from "@/app/types/movieCardTypes";
import { Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MovieCardProps {
  card: movieCardType;
}

const MovieCard: React.FC<MovieCardProps> = ({ card }) => {
  return (
    <Link href={card?.href} className="max-md:w-full text-white flex flex-col gap-4">
      <Image
        src={card.image}
        alt={card.title}
        width={150}
        height={200}
        className="w-ful w-[350px] h-[400px] object-cover"
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-white">{card?.title}</p>
          <p className="text-primary">{card?.releaseDate}</p>
        </div>
        <div className="flex justify-between">
            <p className="border border-white py-1 px-2">{card?.tagline}</p>
            <div className="flex gap-4">
             <p className="flex gap-1 items-center">
                <Clock size={16} className="text-primary" />
                <span>{card?.duration}</span>
            </p>
            <p className="flex items-center gap-1"> <Star className="text-primary text-xs" size={16} /> 
            <span className="">{card?.rating}</span></p>   
            </div>
            
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
