import cloudinary from './cloudinaryConfig'
import { Categories, Image } from './types';

// Indios_Bravos-DK_Świt-Warszawa-reggae-01
// FileName structure  AAA-BBB-CCC-DDD-EE
// A-band, B-eventPlace, C-city, D-genre, E-number
// No Polish characters


interface Results {
  images: Image[];
  categories: Categories
}

interface GetResultsProps {
  results: Results
}

export const getResults : ()=>Promise<GetResultsProps> = async () => {
  let images: Image[] = [];
  const { resources } = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'asc')
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
      band: splitted[0]?.replaceAll('_', ' '),
      place: splitted[1]?.replaceAll('_', ' '),
      city: splitted[2]?.replaceAll('_', ' '),
      genre: splitted[3]?.replaceAll('_', ' ')
    })
    i++
  }
  images = filteredResults
  const bandNames = () => [...new Set(images.map(result => result.band))]
  const places = () => [...new Set(images.map(result => result.place))]
  const cities = () => [...new Set(images.map(result => result.city))]
  const genres = () => [...new Set(images.map(result => result.genre))]

  return {
    results: {
      images,
      categories: {
        band: bandNames(),
        place: places(),
        city: cities(),
        genre: genres()
      }
    }
  }
}

export const splitImageName = (imageName: string) => imageName.split('-')
