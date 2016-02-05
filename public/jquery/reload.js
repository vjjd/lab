var plot = $.ajax({
    url: '/rplot.png'
});
plot.fail(function(){
    setTimeout(function () {
        window.location.reload()
    }, 3000);
});
