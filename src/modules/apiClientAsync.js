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

    const response = await fetch(`https://pixabay.com/api/?${params.toString()}`);
    const imageCard = await response.json();

    return imageCard;
}