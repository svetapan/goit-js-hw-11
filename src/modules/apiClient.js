// const BASE_URL = http://pixabay.com/api/;

export const getImages = (search, page, per_page) => {
    const params = new URLSearchParams({
        key: '34629216-4eae0037697c673c1b9060fc5',
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        page,
        per_page, 
        safesearch: true
    });

    return fetch(`http://pixabay.com/api/?${params.toString()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}