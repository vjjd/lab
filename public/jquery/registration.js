$().ready(function() {
    var max = 32,
        min = 5;
    $("#form").validate({
        rules : {
            username : {
                required : true,
                minlength : min,
                maxlength: max
            },
            email : {
                required : true,
                email : true,
                maxlength: max
            },
            password : {
                required : true,
                minlength : min,
                maxlength : max
            }
        },
        messages: {
            username: {
                required: "Enter you login",
                minlength: "Minimum username length is 5",
                maxlength: "Maximum username length is 32"
            },
            password: {
                required: "Enter your password",
                minlength: "Minimum password length is 5",
                maxlength: "Maximum password length is 32"
            },
            email: {
                required: "Enter you email",
                email : "Form.. Remember?",
                maxlength: "Maximum email length is 32"
            }
        },
        submitHandler: function(form) {
            form.submit();
        }
    });
});