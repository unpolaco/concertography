import cloudinary from './cloudinaryConfig'
// Indios_Bravos-DK_Świt-Warszawa-reggae--01
// FileName structure  AAA-BBB-CCC-DDD
// A-band, B-eventPlace, C-city, D-genre, E-number
// No Polish characters



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
  eventPlace: string,
  city: string,
  genre: string
}

export const getResults = async () => {
  let images: Image[] = [];
  const { resources } = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()

  let filteredResults: Image[] = []
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
      secureUrl: result.secure_url,
      publicId: result.public_id,
      band: splitted[0].replace('_', ' '),
      eventPlace: splitted[1].replace('_', ' '),
      city: splitted[2].replace('_', ' '),
      genre: splitted[3].replace('_', ' ')
    })
    i++
  }
  images = filteredResults
  const bandNames = () => [...new Set(images.map(result => result.band))]
  const eventPlaces = () => [...new Set(images.map(result => result.eventPlace))]
  const cities = () => [...new Set(images.map(result => result.city))]
  const genries = () => [...new Set(images.map(result => result.genre))]
  return {
    images,
    bandNames: bandNames(),
    eventPlaces: eventPlaces(),
    cities: cities(),
    genries: genries()
  }
}

export const splitImageName = (imageName: string) => imageName.split('-')
