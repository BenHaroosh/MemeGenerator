'use strict'

var gId = 0
var gImgsGallery = []
var gFilterBy = ''
var gFirstOrder
var gFilterWords;

_createImgs()
_createFilteredWords()


function _createImg(keywords = ['funny']) {
    return {
        id: ++gId,
        url: `img/${gId}.jpg`,
        keywords
    }
}

function _createFilteredWords() {
    if (loadFromStorage('FilteredWordsDB')) return gFilterWords = loadFromStorage('FilteredWordsDB')
    gFilterWords = [
        { name: 'Scary', size: 10 },
        { name: 'Funny', size: 20 },
        { name: 'Baby', size: 14 },
        { name: 'Animal', size: 40 },
        { name: 'Famous', size: 16 },
    ]

    saveToStorage('FilteredWordsDB', gFilterWords)
}

function _createImgs() {
    // var img = 
    for (var i = 0; i < 17; i++) {
    }
    gImgsGallery.push(_createImg(['funny', 'famous']))
    gImgsGallery.push(_createImg(['animal']))
    gImgsGallery.push(_createImg(['animal', 'funny', 'baby']))
    gImgsGallery.push(_createImg(['animal', 'funny']))
    gImgsGallery.push(_createImg(['baby', 'funny', 'famous']))
    gImgsGallery.push(_createImg(['funny', 'famous']))
    gImgsGallery.push(_createImg(['funny', 'baby', 'scary']))
    gImgsGallery.push(_createImg(['funny', 'famous']))
    gImgsGallery.push(_createImg(['funny', 'baby', 'scary']))
    gImgsGallery.push(_createImg(['famous']))
    gImgsGallery.push(_createImg(['famous']))
    gImgsGallery.push(_createImg(['famous', 'funny']))
    gImgsGallery.push(_createImg(['scary']))
    gImgsGallery.push(_createImg(['famous', 'funny']))
    gImgsGallery.push(_createImg(['famous', 'funny']))
    gImgsGallery.push(_createImg(['famous', 'scary']))
    gImgsGallery.push(_createImg(['famous', 'funny']))
}

function getImgsForDisplay() {
    if (gFilterBy === '') return gImgsGallery
    const imgs = gImgsGallery.filter(img => {
        const filteredImgs = img.keywords.some(keyword => {
            if (keyword.substring(0, gFilterBy.length).toLowerCase() === gFilterBy.toLowerCase()) {
                return img
            }
        })
        return filteredImgs
    })
    return imgs
}

function filterBy(filterBy) {
    gFilterBy = filterBy
}


function addImg(imgSrc) {
    const img = {
        id: ++gId,
        url: imgSrc,
        keywords: ['']
    }
    gImgsGallery.push(img)
}

function setWordFilter(filterWord, diff) {
    const word = gFilterWords.find(word => {
        return filterWord === word.name
    })
    if (word.size < 90) word.size += diff
    gFilterBy = filterWord
    saveToStorage('FilteredWordsDB', gFilterWords)
}

function getFilteredWords() {
    return gFilterWords
}