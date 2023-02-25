
const host = "http://localhost:8080/auth/pylon/login"

const submitBtn = document.querySelector("#submit-btn")

$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
});

submitBtn.addEventListener("click", (e) => {
    $.ajax({
        url: host,
        type: "POST",
        data: JSON.stringify({
            email: $("#email").val(),
            password: $("#password").val(),
        }),
        headers: {'Content-Type': 'application/json'},
        success: function (data) {
            // move to channel page
            location.href = "http://localhost:5500/websocket/"
        },
        error: function(data) {
        }
    })
})