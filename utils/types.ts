export interface Image {
    assetId: string,
    folder: string,
    filename: string,
    format: string,
    width: number,
    height: number,
    aspectRatio: number,
    secureUrl: string,
    publicId: string,
    band: string,
    place: string,
    city: string,
    genre: string
}
export type Category = 'band' | 'place' | 'city' | 'genre'

export type Categories = Record<Category, string[]>
