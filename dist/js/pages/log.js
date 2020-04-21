$( document ).ready(function() {
    if (alias )  log(alias);
    function log(alias){
        $.getJSON(`https://localapi.trazk.com/2020/api/facebook/index.php?task=updateLog&alias=${alias}`);
    }
});