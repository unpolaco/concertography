import { Image as ImageType, getResults } from "@/utils/getImages"
import Image from "next/image"

//@ts-ignore
export default async function Page({ params }) {

    const { images } = await getResults()

    const getFilteredImagePaths = (category: keyof ImageType, search: string, images: ImageType[]) => {
        const filteredPublicIds = images
            .filter((image) => (image[category]).toString().toLowerCase() === search.toLowerCase())
            .map(image => `${image.publicId}.${image.format}`)
        return filteredPublicIds
    }

    const filteredImagePaths = getFilteredImagePaths(params.category as keyof ImageType, params.search, images)

    
    const currentImgSrc = (index: number) => `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1688113468/${filteredImagePaths[index]}`

    return (
        <>
            <div>{params.category}</div>
            <div>{params.search}</div>
            <Image 
            src={currentImgSrc(2)} 
            alt='concert' 
            fill
            />
        </>
    )
}

