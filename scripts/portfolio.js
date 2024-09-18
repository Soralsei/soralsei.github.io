const card_template = `
<div class="card">
<div class="row g-0">
  <div class="card-container col-md-5">
    <div id="{:controlId}" class="carousel-controllers rounded">
      <div class="carousel-controller prev">
        <span class="prev-icon"></span>
      </div>
      <div class="carousel-controller next">
        <span class="next-icon"></span>
      </div>
    </div>
    <div id="{:carouselId}">
    </div>
  </div>
  <div class="col-md-7 card-container">
    <div class="card-body">
      <h5 class="card-title">{:title}</h5>
      <p class="card-text">{:body}</p>
      <a href="{:link.url}">{:link.text}</a>
    </div>
  </div>
</div>
</div>
`;
const img_template = `<img class="img-cover rounded" src="{:img}"/>`;

function generate_cards(projects) {
  let portfolio = document.getElementById("carousel-portfolio");
  for (let i in projects) {
    let card = document.createElement("div");
    card.innerHTML = card_template;
    for (const [key, value] of Object.entries(projects[i])) {
      if (typeof value === "string") {
        const template = `{:${key}}`;
        card.innerHTML = card.innerHTML.replace(template, value);
      } else if (!Array.isArray(value) && typeof value === "object") {
        for (const [objectKey, objectValue] of Object.entries(value)) {
          const template = `{:${key}.${objectKey}}`;
          card.innerHTML = card.innerHTML.replace(template, objectValue);
        }
      }
    }
    let imgCarousel = card.querySelector(`#${projects[i].carouselId}`);
    for (const value of projects[i].images) {
      let container = document.createElement('div');
      container.innerHTML = img_template.replace("{:img}", value);
      imgCarousel.appendChild(container);
    }
    if (projects[i].link.toWindow) {
      let a = card.querySelector("a");
      if (a !== undefined) {
        a.setAttribute("target", "_blank");
      }
    }
    portfolio.appendChild(card);
    tns({
      container: `#${projects[i].carouselId}`,
      autowidth: true,
      controlsContainer: `#${projects[i].controlId}`,
      nav: false,
      loop: true,
      touch: false,
    });
  }
}

fetch('/resources/projects.json').then((response) => {
  return response.json();
}).then((projects) => {
  generate_cards(projects);

  $("#carousel-portfolio").slick({
    dots: true,
    infinite: false,
    prevArrow: '<div class="carousel-controller prev"><span class= "prev-icon"></span></div>',
    nextArrow: '<div class="carousel-controller next"><span class="next-icon"></span></div>',
    responsive: [
      {
        breakpoint: 730,
        settings: {
          infinite: false,
          dots: true,
          arrows: false
        }
      },

    ]
  });
})

// const projet1 = tns({
//   container: '#carousel-esp-32',
//   autowidth: true,
//   controlsContainer: '#esp32-controls',
//   nav: false,
//   loop: true,
//   touch: false,
// });

// const projet2 = tns({
//   container: '#carousel-play-store',
//   autowidth: true,
//   controlsContainer: '#play-store-controls',
//   nav: false,
//   loop: true,
//   touch: false,
// });