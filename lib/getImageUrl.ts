

const imageUrl = "https://image.tmdb.org/t/p/"
export const getImageUrl = ({ path }: { path?: string }) => {
    if (!path) return null;
    return `${imageUrl}w500${path}`;

}

