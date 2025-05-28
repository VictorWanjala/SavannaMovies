
type GenreType = {
    id: number,
    name: string
}

type ProductionCompanyType = {
    id: number,
    name: string,
    logo_path: string,
    origin_country: string
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

export type tvShowCardType = {
    id: number,
    poster_path: string,
    name: string,
    first_air_date: string,
    vote_average: number,
    href: string,
    original_language: string,
    overview: string,
    genres: GenreType[],
    production_companies: ProductionCompanyType[]
}