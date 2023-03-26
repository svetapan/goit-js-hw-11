import { getImages } from './apiClientAsync';
import { renderImg } from './renderingImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchQuery = document.querySelector('input');
const searchForm = document.querySelector('#search-form');
const loadMoreBtn= document.querySelector('.load-more');
const perPage = 40;

searchForm.addEventListener('submit', onFindImage);
loadMoreBtn.addEventListener('click', onloadMoreBtnlick);

let searchState ='';
let pageState = 1;
let totalHit = 0;

const fetchImg = async (search, page) => {
    try {
        const response = await getImages(search, page, perPage);
        totalHit = response.totalHits;
        renderImg(response);
        updateLoadBtn(page, totalHit);
    } catch (error) {
        Notify.failure(error);
    }
}

async function onFindImage(evt) {
    evt.preventDefault();

    const searchValue = searchQuery.value.trim();

    if (searchValue !== searchState) {
        searchState = searchValue;
        clearImages();

        try {
            await fetchImg(searchValue, pageState);
            Notify.info(`Hooray! We found ${totalHit} images.`);
            await new SimpleLightbox('.gallery a');
        } catch (error) {
            Notify.failure(error);
        } 
    }
}

const clearImages = () => {
    const imageContainer = document.querySelector('.gallery');
    imageContainer.innerHTML = '';
}

const updateLoadBtn = (currentPage, total) => {
    if (total/perPage <= Number(currentPage)) {
        loadMoreBtn.style.display = 'none';
        Notify.info('Sorry, there are no images matching your search query. Please try again.')
    } else {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.dataset.page = Number(currentPage) + 1;
    }
}

async function onloadMoreBtnlick() {
    const page = loadMoreBtn.dataset.page;
    const search = searchQuery.value;
    
    try {
        await fetchImg(search, page);
        new SimpleLightbox('.gallery a');
    } catch (error) {
         Notify.failure(error);
    }
}