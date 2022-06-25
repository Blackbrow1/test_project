'use strict'

let collectionLamp = document.querySelector('.collection__lamp');

let btnLight = document.querySelector('.collection__light-theme');
let btnDark = document.querySelector('.collection__dark-theme');
let collectionImg = document.querySelector('.collection__img');
let lampMiddle = document.querySelector('.collection__lamp-middle');
let collectionImg1 = document.querySelector('.collection__image-1');
let collectionImg2 = document.querySelector('.collection__image-2');
let collectionImg3 = document.querySelector('.collection__image-3');

// btnDark.addEventListener('click', () => {
//   collectionImg.src = 'images/collection-dark.jpg';
// });

// btnLight.addEventListener('click', () => {
//   collectionImg.src = 'images/collection-1.jpg';
// });

collectionImg1.addEventListener('click', () => {
  lampMiddle.src = 'images/lamp-1-middle.png';
  lampMiddle.style.left = '218px';
  collectionLamp.src = 'images/Lamp-1-big.png';
  collectionLamp.style.position = 'absolute';
  collectionLamp.style.left = '265px';
});

collectionImg2.addEventListener('click', () => {
  lampMiddle.src = 'images/lamp-2-middle.png';
  lampMiddle.style.left = '248px'
  collectionLamp.src = 'images/Lamp-2-big.png';
  collectionLamp.style.position = 'absolute';
  collectionLamp.style.left = '297px';
});

collectionImg3.addEventListener('click', () => {
  lampMiddle.src = 'images/lamp-3-middle.png';
  lampMiddle.style.left = '218px'
  collectionLamp.src = 'images/Lamp-3-big.png';
  collectionLamp.style.position = 'absolute';
  collectionLamp.style.left = '255px';
});
