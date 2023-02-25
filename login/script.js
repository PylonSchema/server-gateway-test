
const host = "http://localhost:8080/auth/pylon/login"

const submitBtn = document.querySelector("#submit-btn")

submitBtn.addEventListener("click", (e) => {
    $.ajax({
        url: host,
        type: "POST",
        data: {
            email: $("#email").val(),
            password: $("#password").val(),
        },
        success: function (data) {
            console.log("success")
            console.log(data)
        },
        error: function(data) {
            console.log(data)
        }
    })
})