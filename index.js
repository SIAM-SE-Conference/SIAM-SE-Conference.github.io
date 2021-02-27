// campus slides
var slideIndex = 0;
campus_slide();

function campus_slide() {
    var i;
    var x = document.getElementsByClassName("campus_slides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {
        slideIndex = 1;
    }
    x[slideIndex - 1].style.display = "block";
    setTimeout(campus_slide, 3000);
}

