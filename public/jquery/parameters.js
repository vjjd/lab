$(document).ready(function(){
    var plot_param;
    $("#submit").click(function(){
        plot_param = $("#plot_param").val();
        $.post("http://localhost:3000/run", {plot_param: plot_param}, function (data) {
            if (typeof data.redirect == 'string') {
                window.location = data.redirect;
            }
            if (typeof data.render == 'string') {
                window.location = data.render;
            }
        });
    });
});