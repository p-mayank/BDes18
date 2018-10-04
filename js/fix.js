$(document).ready(function() {

    var websiteAddress = window.location.href
    var result = websiteAddress.substring(websiteAddress.lastIndexOf('/') + 1);

    $('a[href*="'+ result +'"]').find("img").css({"padding":"1em 1em 0.8em 1em", "box-shadow":"0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset, 0 5px 10px #ccc"})

    var firefoxBackwardSlashFixInitial = $('.projectImages').html()
    firefoxBackwardSlashFixInitial = firefoxBackwardSlashFixInitial.replace(/\\/g, "\/")

    $('.projectImages').html(firefoxBackwardSlashFixInitial)

});