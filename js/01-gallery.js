import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);

galleryEl.innerHTML = galleryMarkup;

galleryEl.addEventListener('click', onGalleryClick);

function onGalleryClick(evt) {
    if (!evt.target.classList.contains('gallery__image')) {
        return;
    }
    evt.preventDefault();
    // console.dir(evt.target);

    const instance = basicLightbox.create(
        `
    <img src="${evt.target.dataset.source}">
	`,
        {
            onShow: function () {
                document.addEventListener('keydown', onGalleryKeyDown);
            },

            onClose: function () {
                document.removeEventListener('keydown', onGalleryKeyDown);
            },
        }
    );

    function onGalleryKeyDown(evt) {
        if (evt.code === 'Escape') {
            console.log('hello');
            instance.close();
        }
    }

    instance.show();
}

function createGalleryMarkup(arr) {
    return arr
        .map(
            item =>
                `<li class="gallery__item">
					<a class="gallery__link" href="${item.original}">
						<img
						class="gallery__image"
						src="${item.preview}"
						data-source="${item.original}"
						alt="${item.description}"
						/>
					</a>
				</li>`
        )
        .join('');
}
