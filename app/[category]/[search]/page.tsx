import { Lightbox } from "@/components/Lightbox/Lightbox"
import { NavBar } from "@/components/NavBar/NavBar"
import { categories } from "@/utils/consts"
import { getResults } from "@/utils/getImages"
import { Category, Image as ImageType } from "@/utils/types"

interface Path {
    category: Category
    search: string
}

export async function generateStaticParams() {
    const { results } = await getResults();
    const params: Path[] = [];

    categories.forEach((category) => {
        params.push(...results.categories[category].map((searchParam) => ({ category, search: searchParam.replaceAll('%20', ' ').toLowerCase() })));
    });
    return params;
}

export default async function Page({ params }: { params: Path }) {
    const { results: { images } } = await getResults()

    const getFilteredImagePaths = (category: Category, search: string, images: ImageType[]) => {
        const searchPhrase = search.replaceAll('%20', ' ').toLowerCase()
        const filteredPublicIds = images
            .filter((image) => (image[category]).toString().toLowerCase() === searchPhrase)
            .map(image => `${image.publicId}.${image.format}`)
        return filteredPublicIds
    }
    const filteredImagePaths = getFilteredImagePaths(params.category as Category, params.search, images)
    return (
        <>
            <NavBar about home />
            <Lightbox imagePaths={filteredImagePaths} />
        </>
    )
}