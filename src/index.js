import { getImages } from './modules/apiClient';
import { renderImg } from './modules/images';
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

const fetchImg = (search, page) => getImages(search, page, perPage)
.then(
    response => {
            totalHit = response.totalHits;
            renderImg(response);
            updateLoadBtn(page, totalHit);
        }
    )
    .catch(error => Notify.failure(error));

function onFindImage(evt) {
    evt.preventDefault();

    const searchValue = searchQuery.value.trim();

    if (searchValue !== searchState) {
        searchState = searchValue;
        clearImages();
        
        fetchImg(searchValue, pageState);
        setTimeout(()=>{
            Notify.info(`Hooray! We found ${totalHit} images.`);
            new SimpleLightbox('.gallery a')
        },100)
    } else if(searchValue === searchState) {
            Notify.info('Sorry, there are no images matching your search query. Please try again.')
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

function onloadMoreBtnlick() {
    const page = loadMoreBtn.dataset.page;
    const search = searchQuery.value;
    console.log(2);
    
    fetchImg(search, page);

     setTimeout(()=>{
        console.log(1);
        
         new SimpleLightbox('.gallery a');
    },1000)
}


// const refs = {
//     searchForm: document.querySelector('#search-form'),
//     imgContainer: document.querySelector('.gallery'),
// }

// refs.searchForm.addEventListener('submit', onSearch)

// function onSearch(e) {
//     e.preventDefault();

   
// }