// We import the CSS which is extracted to its own file by esbuild.
// Remove this line if you add a your own CSS build pipeline (e.g postcss).
import "../css/app.css"

// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"
import topbar from "../vendor/topbar"
import $ from "../vendor/jquery-3.6.1.min"

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {params: {_csrf_token: csrfToken}})

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"})
window.addEventListener("phx:page-loading-start", info => topbar.show())
window.addEventListener("phx:page-loading-stop", info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

var step = "step0";
//state machine step0 -> enter -> gentle-pick | run-pick -> open
function render_enter() {
    if (step === "step0") {
        console.log("enter start");
        $(".enter").removeClass("d-none");
        $("#enter").removeClass("text-danger");
        $("#enter").addClass("text-secondary");
        $(".step-0").removeClass("text-light");
        $(".step-0").addClass("text-secondary");
        step = "enter";
        window.location.href = "#enter-start";
        console.log("enter end");
    }
}

function render_gentle_pick() {
    if (step === "enter") {
        console.log("render_gentle_pick start");
        $(".gentle-pick").removeClass("d-none");
        $("#gentle-pick").removeClass("text-danger");
        $("#gentle-pick").addClass("text-secondary");
        $("#run-pick").removeClass("text-danger");
        $("#run-pick").addClass("text-secondary");
        $(".enter").removeClass("text-light");
        $(".enter").addClass("text-secondary");
        step = "gentle-pick";
        window.location.href = "#gentle-pick-start";
        console.log("render_gentle_pick end");
    }
}

function render_run_pick() {
    if (step === "enter") {
        console.log("render_run_pick start");
        $(".run-pick").removeClass("d-none");
        $("#gentle-pick").removeClass("text-danger");
        $("#gentle-pick").addClass("text-secondary");
        $("#run-pick").removeClass("text-danger");
        $("#run-pick").addClass("text-secondary");
        $(".enter").removeClass("text-light");
        $(".enter").addClass("text-secondary");
        step = "run-pick";
        window.location.href = "#run-pick-start";
        console.log("render_run_pick end");
    }
}

function render_exit() {
    if ((step === "run-pick") || (step === "gentle-pick")) {
        console.log("exit start");
        $(".exit").removeClass("d-none");
        $("#exit-gentle").removeClass("text-danger");
        $("#exit-gentle").addClass("text-secondary");
        $("#exit-run").removeClass("text-danger");
        $("#exit-run").addClass("text-secondary");
        $(".gentle-pick").removeClass("text-light");
        $(".gentle-pick").addClass("text-secondary");
        $(".run-pick").removeClass("text-light");
        $(".run-pick").addClass("text-secondary");
        step = "exit";
        window.location.href = "#exit-start";
        console.log("exit end");
    }
}

function render_open() {
    console.log("render open")
    if (step === "exit") {
        console.log("open start");
        $(".open").removeClass("d-none");
        $("#open").removeClass("text-danger");
        $("#open").addClass("text-secondary");
        $(".exit").removeClass("text-light");
        $(".exit").addClass("text-secondary");
        step = "open";
        window.location.href = "#open-start";
        console.log("open end");
    }
}

$("#enter").mouseup(function() {render_enter();});
$("#gentle-pick").mouseup(function() {render_gentle_pick()});
$("#run-pick").mouseup(function() {render_run_pick()});
$("#exit-gentle").mouseup(function() {render_exit()});
$("#exit-run").mouseup(function() {render_exit()});
$("#open").mouseup(function() {render_open()});

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket

