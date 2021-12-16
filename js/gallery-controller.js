'use strict'

// var gPossibleResize = false;

function onInit() {
  render()
}

function render() {
  renderGallery()
  renderWords()
}


function renderGallery() {
  var imgs = getImgsForDisplay()

  const strHtmls = imgs.map(img => {
    return `
      <div> <img onclick="onSetImg(${img.id})" src=${img.url} alt=""></div>
      `
  })

  document.querySelector('.img-container').innerHTML = strHtmls.join('')
}


function onFilterBy(inpVal) {
  filterBy(inpVal)
  renderGallery()
}


function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()

  reader.onload = (event) => {
    var img = new Image()
    // Render on canvas
    img.onload = onImageReady.bind(null, img)
    img.src = event.target.result
    addImg(img.src)
  }
  reader.readAsDataURL(ev.target.files[0])
}


function renderImg() {
  renderGallery()
}

function onSetFilter(elFilter, diff) {
  const filter = elFilter.dataset.filter
  setWordFilter(filter, diff)
  render()
}

function renderWords() {
  const words = getFilteredWords()

  const strHtmls = words.map(word => {
    return `
    <li><a data-filter="${word.name}" onclick="onSetFilter(this,2)" href="#" style="font-size: ${word.size}px;;">${word.name}</a></li>
    `
  })

  document.querySelector('.list-filters').innerHTML = strHtmls.join('')
}