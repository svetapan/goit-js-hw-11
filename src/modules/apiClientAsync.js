import axios from "axios";
export const getImages = async (search, page, per_page) => {
    const params = new URLSearchParams({
        key: '34629216-4eae0037697c673c1b9060fc5',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        page,
        per_page, 
        safesearch: true
    });

    try{
        const response = await axios.get(`https://pixabay.com/api/?${params.toString()}`);
        const imageCard = await response.data;
        return imageCard;
    } catch (error) {
        throw new Error(error.response.status);
    }
}