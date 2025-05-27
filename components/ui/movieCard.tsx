import { movieCardType } from "@/app/types/movieCardTypes";
import { getImageUrl } from "@/lib/getImageUrl";
import { Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MovieCardProps {
  card: movieCardType;
}

const MovieCard: React.FC<MovieCardProps> = ({ card }) => {

  const imageUrl = getImageUrl({ path: card?.poster_path });

  return (
    <Link
      href={`/movies/${card.id}`}
      className="w-[350px] h-auto max-md:w-full text-white flex flex-col gap-4"
    >
      <div className="w-full h-[400px]">
        <Image
          src={imageUrl ?? ""}
          alt={card.title}
          width={150}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-white">{card?.title}</p>
          <p className="text-primary">{card?.release_date}</p>
        </div>
        <div className="flex justify-between">
          <p className="border border-white py-1 px-2">{card?.original_language}</p>
          <div className="flex gap-4">
           
            <p className="flex items-center gap-1">
              {" "}
              <Star className="text-primary text-xs" size={16} />
              <span className="">{card?.vote_average}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
