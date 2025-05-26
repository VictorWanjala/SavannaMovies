import useAxios from "@/hooks/useAxios"


const {imageUrl} = useAxios()

export const getImageUrl = ({ path }: { path: string }) => {
    if (!path) return null;
    return `${imageUrl}w500${path}`;

}

