url = 'ws://localhost:8080/gateway'
conn = new WebSocket(url)
console.log(conn)
if (conn == null) {
    $("#log").append('<div class="log"><div class="dir">Error</div><pre >'+ 'Websocket not linked' +'</pre></div>')
}

function send(data) {
    $("#log").append('<div class="log"><div class="dir">C -> S</div><pre class="log_info">'+ data +'</pre></div>')
    conn.send(data)
}

const idBox = document.getElementById('id-box')
const messageBox = document.getElementById('message-box')

const OPCODE_MESSAGE = 2
const OPCODE_AUTHENTICATION = 1
const OPCODE_HEARTBEAT = 0
var opcode = OPCODE_MESSAGE

function getCookie(cname) {
    value = ""
    c = document.cookie
    c.split(";").forEach(element => {
        k = element.split("=")[0]
        v = element.split("=")[1]
        if (k == cname) {
            value = v
        }
    });
    return value
} 

conn.onopen = (e) => {
    token = getCookie("token")
    send(JSON.stringify({
        op: OPCODE_AUTHENTICATION,
        d : {"token": token}
    }))
}

conn.onmessage = (msg) => {
    $("#log").append('<div class="log"><div class="dir">C <- S</div><pre class="log_info">'+ msg.data +'</pre></div>')
    var data = JSON.parse(msg.data)
    if (data["op"]==0) {
        send(JSON.stringify({
            op: 0,
            d : {}
          }))
    }
}

const host = "http://localhost:8080/message/"
$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
});

var submitBtn = document.getElementById('submit')
submitBtn.addEventListener('click', (evt) => {
    $.ajax({
        url: host,
        type: "POST",
        data: JSON.stringify({
            channelid: Number($("#id-box").val()),
            content: $("#message-box").val(),
        }),
        headers: {'Content-Type': 'application/json'},
        success: function (data) {
            console.log(data)
            $("#log").append('<div class="log"><div class="dir">C <- S</div><pre class="log_info">'+ data.state() +'</pre></div>')
        },
        error: function(data) {
            console.log(data)
            $("#log").append('<div class="log"><div class="dir">C <- S</div><pre class="log_info">'+ data.state() +'</pre></div>')
        }
    })
})