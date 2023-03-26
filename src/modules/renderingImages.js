import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function renderImg(images) {
    const imgContainer = document.querySelector('.gallery');

    const img = images.hits.map(image => {
        const { webformatURL , largeImageURL, tags, likes, views, comments, downloads } = image;
        const imgDescription = `
        <div class="photo-card">
            <a class="photo-item" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item"><span>Likes</span>
                    <b>${likes}</b>
                </p>
                <p class="info-item"><span>Views</span>
                    <b>${views}</b>
                </p>
                <p class="info-item"><span>Comments</span>
                    <b>${comments}</b>
                </p>
                <p class="info-item"><span>Downloads</span>
                    <b>${downloads}</b>
                </p>
            </div>
        </div>`

        return imgDescription;
    }).join('');

    imgContainer.insertAdjacentHTML('beforeend', img);

    if (img === '') {
        Notify.info('Sorry, there are no images matching your search query. Please try again.');
    }
}