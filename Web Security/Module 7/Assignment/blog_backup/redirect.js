var script = document.getElementById('redirect-script');
var delay = parseInt(script.dataset.delay, 10);
var url = script.dataset.url;
setTimeout(function () {
    window.location.href = url;
}, delay);

