//const slide = document.querySelectorAll(".slider-content-item");
//const btnNext= document.querySelector(".fa-chevron-right");
//const btnPre = document.querySelector(".fa-chevron-left");
//let index = 0;
//btnNext.addEventListener("click", function () {
//    slide[index].classList.remove('active');
//    index = (index + 1) % slide.length
//    slide[index].classList.add('active');
//})
//btnPre.addEventListener("click", function () {
//    slide[index].classList.remove('active');
//    index = (index - 1 + slide.length) % slide.length
//    slide[index].classList.add('active');
//})


const imgPosition = document.querySelectorAll(".aspect-ratio-169 img")
const imgContainer = document.querySelector('.aspect-ratio-169')
const dotItem = document.querySelectorAll(".dot")
let imgNumb = imgPosition.length;
let index = 0
//console.log(imgPosition)
imgPosition.forEach(function (image, index) {
    image.style.left = index * 100 + "%"
    dotItem[index].addEventListener("click", function () {
        slider(index)
    })
})
function imgSlide() {
    index++;
    if (index >= imgNumb) { index = 0 }
    slider(index)
}
function slider(index) {
    imgContainer.style.left = "-" + index * 100 + "%"
    const dotActive = document.querySelector(".active")
    dotActive.classList.remove("active")
    dotItem[index].classList.add("active")

}
setInterval(imgSlide, 5000);
