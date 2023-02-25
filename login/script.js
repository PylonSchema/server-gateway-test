
const host = "http://localhost:8080/auth/pylon/login"

const submitBtn = document.querySelector("#submit-btn")

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
        },
        error: function(data) {
        }
    })
})