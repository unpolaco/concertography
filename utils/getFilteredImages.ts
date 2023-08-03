import cloudinary from "./cloudinaryConfig"

export const getFilteredImages = async (imagesIds: string[]) => {
    const {resources} = await cloudinary.v2.api.resources_by_asset_ids(imagesIds)
    return resources
  }