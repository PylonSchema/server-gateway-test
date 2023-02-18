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

const inputBox = document.getElementById('input-box')

const OPCODE_MESSAGE = 2
const OPCODE_AUTHENTICATION = 1
const OPCODE_HEARTBEAT = 0
var opcode = OPCODE_MESSAGE

document.getElementById('op-items').addEventListener('change', (event) => {
    opcode = changeOP()
})

function changeOP() {
    var opcode = 0
    var selectList = document.getElementById('op-items')
    switch (selectList.options[selectList.selectedIndex].value) {
        case 'message':
            inputBox.classList.remove('hidden')
            opcode = OPCODE_MESSAGE
            break
        case 'authentication':
            inputBox.classList.remove('hidden')
            opcode = OPCODE_AUTHENTICATION
            break
        case 'heartbeat':
            inputBox.classList.add('hidden')
            opcode = OPCODE_HEARTBEAT
            break
        default:
            inputBox.classList.add('hidden')

    }
    return opcode
}

var submitBtn = document.getElementById('submit')
submitBtn.addEventListener('click', (evt) => {
    switch (opcode) {
        case OPCODE_MESSAGE:
            send(JSON.stringify({
                op: OPCODE_MESSAGE,
                d : {"text": inputBox.value}
            }))
            inputBox.value = ""
            break
        case OPCODE_AUTHENTICATION:
            send(JSON.stringify({
                op: OPCODE_AUTHENTICATION,
                d : {"token": inputBox.value}
            }))
            inputBox.value = ""
            break
        case OPCODE_HEARTBEAT:
            send(JSON.stringify({
                op: OPCODE_HEARTBEAT,
                d : {}
            }))
            break
    }
})