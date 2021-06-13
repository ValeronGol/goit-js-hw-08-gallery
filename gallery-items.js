const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeButton: document.querySelector('.lightbox__button'),
};

const imgMarkup = createImages(images);
refs.gallery.insertAdjacentHTML('beforeend', imgMarkup);
refs.gallery.addEventListener('click', onOpenModal);
refs.closeButton.addEventListener('click', onCloseModal);
refs.lightboxOverlay.addEventListener('click', onCloseModal);

function createImages(images) {
  return images
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-alt="${description}"
      data-index = ${index}
    />
  </a>
</li>`;
    })
    .join('');
}

function onOpenModal(event) {
  event.preventDefault();
  const currentImg = event.target;

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  window.addEventListener('keydown', onKeystrokess);
  refs.lightbox.classList.add('is-open');
  refs.lightboxImage.src = currentImg.dataset.source;
  refs.lightboxImage.alt = currentImg.dataset.alt;
  refs.lightboxImage.setAttribute('data-index', currentImg.dataset.index);
}

function onCloseModal(event) {
  if (event.currentTarget === event.target) {
    refs.lightbox.classList.remove('is-open');
    refs.lightboxImage.removeAttribute('data-index');
    refs.lightboxImage.removeAttribute('src');
    refs.lightboxImage.removeAttribute('alt');
    window.removeEventListener('keydown', onKeystrokess);
  }
}

function onKeystrokess(event) {
  const esc = event.code === 'Escape';
  const arrowRight = event.code === 'ArrowRight';
  const arrowLeft = event.code === 'ArrowLeft';
  if (esc) {
    onCloseModal(esc);
  }

  if (arrowRight || arrowLeft) {
    onNextImg(arrowRight);
  }
}

function onNextImg(right) {
  let index;

  index = right
    ? Number(refs.lightboxImage.dataset.index) + 1
    : Number(refs.lightboxImage.dataset.index) - 1;

  if (index < 0) {
    index = images.length + index;
  }

  if (index === images.length) {
    index = 0;
  }

  refs.lightboxImage.src = images[index].original;
  refs.lightboxImage.dataset.index = index;
}
