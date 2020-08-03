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

function toggleEditorType() {
  if (window.curEditor) {
    if (window.curEditor == 'ace') {
      window.curEditor = 'plain'
      $("#editor").hide();
      $("#editedText").show();
      $("#editedText").css("visibility", "visible");
    } else {
      window.curEditor = 'ace'
      $("#editedText").hide();
      $("#editor").show();
    }
  } else {
    window.curEditor = 'ace';
  }
  $("#editor-switch-button")[0].textContent = "Switch to " + (window.curEditor == 'ace' ? 'plain' : 'ace') + " editor";
}

$(document).ready(function() {
    $('<div id="editor-preview-container"></div>').insertAfter("#editor");
    $("#editedText").appendTo("#editor-preview-container");
    $("#editor").appendTo("#editor-preview-container");
    
    $('#previewButton').replaceWith(
        '<div class="float-right">' + 
        '<button class="btn btn-info mt-3" type="button" onclick="toggleEditorType();">' +
        '  <i class="fa fa-pen-nib fa-fw mr-2"></i>' +
        '  <span id="editor-switch-button">Switch editor</span>' +
        '</button>' +
        '	&nbsp;' +
        '<button class="btn btn-info mt-3" type="button" data-toggle="modal" data-target="#preview-modal" onclick="updatePreviewPane();">' +
        '  <i class="fa fa-eye fa-fw mr-2"></i>' +
        '  <span>Preview</span>' +
        '</button>' +
        '</div>'
    );

    // $('#previewpane').insertAfter('#editor');​
    $("#previewpane").replaceWith(
      '<div id="previewpane-wrapper">' +
      '  <p class="title h4"><i class="fa fa-eye fa-fw mr-2"></i>Preview</p>' +
      '  <div id="previewpane" class=""></div>' +
      '</div>'
      );

    // move next to the editor (side by side)
    $('#editor')[0].setAttribute("style", ";");
    // $('#editor').css({
    //   // style set it to half width
    //   "float": "left",
    //   "width":"50%",
    //   "overflow":"hidden",

    //   "height": "650px",
    // });
    // $('#previewpane-wrapper').css({
    //   // style set it to half width
    //   "width": "50%",
    //   "overflow": "hidden",
    //   // make it a scroll box by the overflow attr
    //   "overflow": "auto",
    //   "padding-left": "15px",
    //   "max-height": "650px",
    // });
    document.querySelector('style').textContent +=
      '#editor-preview-container {' +
      '  display: flex;' +
      '  flex-direction: column;' +
      '}' +
      '#editedText {' +
      '  min-height: 200px;' +
      '  width: 100%;' +
      '  height: 80vh !important' +
      '}' +
      '#editor {' +
      '  min-height: 200px;' +
      '  width: 100%;' +
      '  height: 80vh !important' +
      '}' +
      '#previewpane-wrapper {' +
      '  box-shadow: 0 0 8px 0 rgba(0,0,0,0.2); !important;' +
      '  border: 1px;' +
      '  min-height: 200px;' +
      '  width: 100%;' +
      '  overflow: auto;' +
      '  max-height: 80vh;' +
      '}' +
      '@media (min-width: 600px) and (orientation:landscape) {' +
      '  #editor-preview-container {' +
      '    flex-direction: row;' +
      '  }' +
      '  #editedText {' +
      '    width: 50% !important;' +
      '  }' +
      '  #editor {' +
      '    width: 50% !important;' +
      '  }' +
      '  #previewpane-wrapper {' +
      '    background: unset;' +
      '    width: 50% !important;' +
      '    padding-left: 15px;' +
      '  }' +
      '}' +

    $("#previewpane-wrapper").insertAfter("#editor");
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

    // trigger button string
    toggleEditorType();

    // // add event listener to editedText div
    // let OnChangeHandler = function () {
    //     console.log("hi");
    //     alert('hi');
    //     editor.getSession().setValue($("#editedText")[0].value);
    // }
    // $("#editedText").change(OnChangeHandler);
    // $("#editedText").on('change', OnChangeHandler);
    // $("#editedText").on('input', OnChangeHandler);
    // $("#editedText").on('paste', OnChangeHandler);
    // $("#editedText").on('keypress', OnChangeHandler);
});
