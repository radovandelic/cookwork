import cloudinary from 'cloudinary'
import { cloudinaryConfig } from '../../config'

cloudinary.config(cloudinaryConfig)

const options = [
    {
        quality: 90,
        width: 480,
        height: 360,
        crop: 'limit'
    },
    {
        quality: 50,
        height: 100,
        crop: 'limit'
    }
]

export const uploadImg = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(image, { eager: options }, (err, result) => {
            if (err) reject(Error(err));
            else {
                result = {
                    large: result.eager[0].secure_url,
                    thumbnail: result.eager[1].secure_url
                }
                resolve(result);
            }
        })
    })
}