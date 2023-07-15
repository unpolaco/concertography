import cloudinary from './cloudinaryConfig'
// Indios_Bravos-DK_Świt-Warszawa-reggae
// FileName structure  AAA-BBB-CCC-DDD
// A-band, B-eventPlace, C-city, D-genre

export interface ImageData {
  assetId: string,
  folder: string,
  filename: string,
  format: string,
  width: number,
  height: number,
  aspectRatio: number,
  band: string,
  eventPlace: string,
  city: string,
  genre: string
}

export default async function getResults() {
  let imagesData: ImageData[] = [];
    const { resources } = await cloudinary.v2.search
      .expression(`folder:travel/indie/*`)
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute()

    let filteredResults: ImageData[] = []
    let i = 0
    for (let result of resources) {
      const splitted = splitImageName(result.filename)
      filteredResults.push({
        assetId: result.asset_id,
        folder: result.folder,
        filename: result.filename,
        format: result.format,
        width: result.width,
        height: result.height,
        aspectRatio: result.aspect_ratio,
        band: splitted[0].replace('_', ' '),
        eventPlace: splitted[1].replace('_', ' '),
        city: splitted[2].replace('_', ' '),
        genre: splitted[3].replace('_', ' ')
      })
      i++
    }
    imagesData = filteredResults
  const bandNames = () => [...new Set(imagesData.map(result => result.band))]
  const eventPlaces = () => [...new Set(imagesData.map(result => result.eventPlace))]
  const cities = () => [...new Set(imagesData.map(result => result.city))]
  const genries = () => [...new Set(imagesData.map(result => result.genre))]
  
  return {
    imagesData,
    bandNames: bandNames(),
    eventPlaces: eventPlaces(),
    cities: cities(),
    genries: genries()
  }
}

export const splitImageName = (imageName: string) => imageName.split('-')
