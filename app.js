const slideInterval = 10000;

const slides = [
  {
    url: `https://lookerstudio.google.com/embed/reporting/4cc9800e-d5a9-4c5f-96c9-79649fa63b7c/page/uBNcE`,
    pages: 1
  },
  {
    url: `https://lookerstudio.google.com/embed/u/0/reporting/fd1c861c-dcbd-463f-a351-f5eb593611f0/page/p_1745xu25kd`,
    pages: 1
  },
  {
    url: `https://lookerstudio.google.com/embed/u/0/reporting/fd1c861c-dcbd-463f-a351-f5eb593611f0/page/fvECE`,
    pages: 1
  },
  {
    url: `https://lookerstudio.google.com/embed/u/0/reporting/fd1c861c-dcbd-463f-a351-f5eb593611f0/page/p_locgvc45kd`,
    pages: 1
  }
];

let currentSlide = 0;
const iframe = document.getElementById('slideshow');

function showSlide() {
  const { url } = slides[currentSlide];
  iframe.src = url;
}

function nextSlide() {
  currentSlide++;

  if (currentSlide > slides.length) {
    currentSlide = 0;
  }

  showSlide();
}

function presentation() {
  const { pages } = slides[currentSlide];

  showSlide();
  setInterval(nextSlide, slideInterval*pages);

}

presentation();