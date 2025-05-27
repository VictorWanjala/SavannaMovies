
type GenreType = {
    id: number,
    name: string
}

export type movieCardType = {
    id: number,
    poster_path: string,
    title: string,
    release_date: string,
    vote_average: number,
    duration: string,
    href: string,
    original_language: string,
    overview: string,
    genres: GenreType[],
    country: string,
    production_companies: string[]
}