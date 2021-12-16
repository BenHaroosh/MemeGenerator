'use strict'

var gId = 0
var gImgsGallery = []

_createImgs()


function _createImg(){
    return {
        id: ++gId,
        url: `img/${gId}.jpg`,
        keywords: ['funny', 'cat']
    }
}

function _createImgs(){
    for (var i = 0; i < 17; i++){
        var img = _createImg()
        gImgsGallery.push(img)
    }
}

function getImgsForDisplay(){
    return gImgsGallery
}