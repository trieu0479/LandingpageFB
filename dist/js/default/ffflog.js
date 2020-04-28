$(document).ready(() => {
    fffLog();
    function fffLog(){
        var post = {};
        post.userToken = userToken;
        post.uuid = getCookie("uuid");
        post.href = window.location.href;
        post.host = window.location.host;
        $.post("//localapi.trazk.com/2020/api/ffflog/index.php?task=writeToLog",post)
    }
});