import { Image } from '../../resources/file/image.resource'

class ImageService {
    baseURL: string = '';

    async search() : Promise<Image[]> {
        const response = await fetch(this.baseURL);
        return await response.json();
    }
}

export const useImageService = () => new ImageService();