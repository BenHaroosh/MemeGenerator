'use strict'

// var gPossibleResize = false;

function onInit() {
  renderGallery()
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


function onFilterBy(inpVal){
  filterBy(inpVal)
  renderGallery()
}