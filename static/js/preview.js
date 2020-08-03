function updatePreviewPane() {
    $("#previewpane").hide();
    var url = location.pathname.replace(/_edit\//,"_preview/");
    $.post(
      url,
      {"raw" : $("#editedText").val()},
      function(data) {
        $('#previewpane').html(data);
        // Process any mathematics if we're using MathML
        if (typeof(convert) == 'function') { convert(); }
        // Process any mathematics if we're using jsMath
        if (typeof(jsMath) == 'object')    { jsMath.ProcessBeforeShowing(); }
        // Process any mathematics if we're using MathJax
        if (typeof(window.MathJax) == 'object') {
          // http://docs.mathjax.org/en/latest/typeset.html
          var math = document.getElementById("MathExample");
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
        }
      },
      "html");

    $('#previewpane').fadeIn(1000);
};

$(document).ready(function() {
    $('#previewButton').replaceWith(
        '<button class="btn btn-info float-right mt-3" type="button" data-toggle="modal" data-target="#preview-modal" onclick="updatePreviewPane();">' +
        '  <i class="fa fa-eye fa-fw mr-2"></i>' +
        '  <span>Preview</span>' +
        '</button>'
    );

    // $('#previewpane').insertAfter('#editor');​
    $("#previewpane").replaceWith(
      '<div id="previewpane-wrapper">' +
      '  <p class="title h4"><i class="fa fa-eye fa-fw mr-2"></i>Preview</p>' +
      '  <div id="previewpane" class=""></div>' +
      '</div>'
      );

    // move next to the editor (side by side)
    $('#editor')[0].setAttribute("style", "float:left; width:50%; overflow:hidden;");
    // style set it to half width, and make it a scroll box by the overflow attr
    $('#previewpane-wrapper')[0].setAttribute("style", "width:50%; overflow:hidden;" + 
                                               "overflow: auto; padding-left: 15px; max-height: 650px;");
    $("#previewpane-wrapper").insertAfter("#editor");
    // set ace editor to be the same height as the preview
    $("#editor").height("650px");
    editor.resize();
    
    //// ORIGINAL
    // $("#previewpane").replaceWith(
    //     '<div id="preview-modal" class="modal fade">' +
    //     '  <div class="modal-dialog modal-lg">' +
    //     '    <div class="modal-content">' +
    //     '      <div class="modal-header">' +
    //     '        <p class="modal-title h4"><i class="fa fa-eye fa-fw mr-2"></i>Preview</p>' +
    //     '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
    //     '      </div>' +
    //     '      <div class="modal-body">' +
    //     '        <div id="previewpane" class=""></div>' +
    //     '      </div>' +
    //     '    </div>' +
    //     '  </div>' +
    //     '</div>'
    // );

    $('#editedText').focus();
    updatePreviewPane();

    // auto refresh every few second onChange event
    let previewTimeout = 6000;
    let previewCurrentlyOnTimeout = false;
    let hasPendingPreviewUpdate = false;
    editor.getSession().on("change", function () {
      // restrict update too frequently
      if(!previewCurrentlyOnTimeout) {
        previewCurrentlyOnTimeout = true;
        setTimeout(function () {
          previewCurrentlyOnTimeout = false;
          if (hasPendingPreviewUpdate) {
            updatePreviewPane();
            hasPendingPreviewUpdate = false;
          }
        }, previewTimeout);
          
        updatePreviewPane();
      } else {
        hasPendingPreviewUpdate = true;
    }
  });
});
