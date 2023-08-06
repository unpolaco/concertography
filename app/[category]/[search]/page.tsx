import { Category } from "@/components/Form/Form"
import { Lightbox } from "@/components/Lightbox/Lightbox"
import { Image as ImageType, getResults } from "@/utils/getImages"

//@ts-ignore
export default async function Page({ params }) {
    const { results: { images } } = await getResults()

    const getFilteredImagePaths = (category: Category, search: string, images: ImageType[]) => {
        const searchPhrase = search.replaceAll('%20', ' ').toLowerCase()
        const filteredPublicIds = images
            .filter((image) => (image[category]).toString().toLowerCase() === searchPhrase)
            .map(image => `${image.publicId}.${image.format}`)
        return filteredPublicIds
    }
    const filteredImagePaths = getFilteredImagePaths(params.category as Category, params.search, images)

    return <Lightbox imagePaths={filteredImagePaths} />
}

