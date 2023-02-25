
const host = "http://localhost:8080/auth/pylon/create"

const submitBtn = document.querySelector("#submit-btn")

submitBtn.addEventListener("click", (e) => {
    $.ajax({
        url: host,
        type: "POST",
        data: JSON.stringify({
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val(),
        }),
        headers: {'Content-Type': 'application/json'},
        success: function (data) {
            console.log("success")
            console.log(data)
        },
        error: function(data) {
            console.log(data)
        }
    })
})