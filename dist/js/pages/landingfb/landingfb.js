$(document).ready(function () {

    // var getclassitem1=document.getElementsByClassName('item1');
    // $(".item1").mouseenter(function() {
    //     $('.indicator').css('left','15.2%')
    // }).mouseleave(function() {
    //     $('.indicator').css('left','38.4%')
    // });
    // $(".item3").mouseenter(function() {
    //     $('.indicator').css('left','12%')
    // }).mouseleave(function() {
    //     $('.indicator').css('left','0%')
    // });
    
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {                     
            $('.fixd-top').addClass('bg-linear-gradient-index');
            $('.fixd-top').removeClass('bg-none');
        } else {
            $('.fixd-top').addClass('bg-none');
            $('.fixd-top').removeClass('bg-linear-gradient-index');
        }
});


})