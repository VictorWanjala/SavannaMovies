import { movieCardType } from "@/app/types/movieCardTypes";
import { getImageUrl } from "@/lib/getImageUrl";
import {  Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MovieCardProps {
  card?: movieCardType;
  loading?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ card, loading = false }) => {

  if (loading) {
    return (
      <div className="w-[350px] h-auto max-md:w-full text-white flex flex-col gap-4 animate-pulse">
        <div className="w-full h-[450px] bg-gray-700 rounded-md"></div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="bg-gray-600 h-6 w-48 rounded"></div>
            <div className="bg-gray-600 h-6 w-12 rounded"></div>
          </div>
          <div className="flex justify-between">
            <div className="bg-gray-600 h-5 w-16 rounded"></div>
            <div className="flex gap-4">
              <div className="bg-gray-600 h-5 w-20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const imageUrl = getImageUrl({ path: card?.poster_path });

  return (
    <Link
      href={`/movies/${card?.id}`}
      className="w-[350px] h-auto max-md:w-full text-white flex flex-col gap-4"
    >
      <div className="w-full h-[450px]">
        <Image
          src={imageUrl ?? ""}
          alt={card?.title ?? "Movie poster"}
          width={200}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-white">{card?.title}</p>
          <p className="text-primary">{card?.release_date?.split("-")[0]}</p>
        </div>
        <div className="flex justify-between">
          <p className="border border-white py-1 px-2">{card?.original_language?.toUpperCase()}</p>
          <div className="flex gap-4">
           
            <p className="flex items-center gap-1">
              {" "}
              <Star className="text-primary text-xs" size={16} />
              <span className="">{card?.vote_average?.toFixed(1)}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
