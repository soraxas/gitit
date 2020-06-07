<!DOCTYPE html>
<html lang="en">
  <head>
    <title>$pagetitle$ - $wikititle$</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="$base$/img/icon.png" rel="icon" />
    $if(feed)$
    <link href="$base$/_feed/" type="application/atom+xml" rel="alternate" title="$wikititle$" />
    <link href="$base$/_feed$pageUrl$" type="application/atom+xml" rel="alternate" title="$pagetitle$ - $wikititle$" />
    $endif$
    $if(printable)$
    <link href="$base$/css/print.css" rel="stylesheet" media="all" type= "text/css" />
    $else$
    <link href="$base$/css/bootstrap.min.css" rel="stylesheet" media="screen, projection" type="text/css" />
    <link href="$base$/css/fontawesome.css" rel="stylesheet" media="screen, projection" type="text/css" />
    <link href="$base$/css/solid.css" rel="stylesheet" media="screen, projection" type="text/css" />
    <link href="$base$/css/custom.css" rel="stylesheet" media="screen, projection" type="text/css" />
    <link href="$base$/css/print.css" rel="stylesheet" media="print" type= "text/css" />
    <script type="text/javascript" src="$base$/js/jquery.min.js"></script>
    <script type="text/javascript" src="$base$/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="$base$/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="$base$/js/navbar.js"></script>
    <script type="text/javascript" src="$base$/js/sidebar.js"></script>
    <!-- PATCHED to use ace editor instead fo builtin content.js -->
    <!-- <script type="text/javascript" src="$base$/js/content.js"></script> -->
    <script type="text/javascript" src="$base$/js/toc.js"></script>
    <script type="text/javascript" src="$base$/js/custom.js"></script>
    $endif$
    <!--[if IE]><link href="$base$/css/ie.css" rel="stylesheet" media="screen, projection" type="text/css" /><![endif]-->
  </head>
  <body>
    <div class="container-fluid">
      <div class="row">
        <div id="maincol" class="col-lg-9 order-lg-last p-0 p-lg-3 clearfix">
          <div id="navbar" class="navbar navbar-expand-lg navbar-light p-lg-0">
            <a id="logo-navbar" class="navbar-brand d-lg-none" href="$base$/">
              <img alt="" src="$base$/img/logo.svg" />
              <span class="sr-only">$wikititle$</span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-body" aria-controls="navbar-body" aria-expanded="false" aria-label="Toggle navigation" style="">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navbar-body" class="collapse navbar-collapse small">
              <form class="order-last form-lg-inline form-group my-3 my-lg-0" action="$base$/_search" method="get">
                <div class="input-group input-group-sm">
                  <input class="form-control" placeholder="Search $wikititle$" type="text" name="patterns" />
                  <div class="input-group-append">
                    <button class="input-group-text" type="submit" name="search">
                      <i class="fa fa-search"></i>
                      <span class="sr-only">Search</span>
                    </button>
                  </div>
                </div>
              </form>
$userbox()$
              <div id="navbar-body-tabs">
$tabs$
              </div>
            </div>
          </div>
$content()$
        </div>
        <div id="sidebar" class="col-lg-3 order-lg-first mb-3 pr-lg-0 small">
$logo()$
$if(markuphelp)$
$markuphelp()$
$endif$
$if(sitenav)$
$sitenav()$
$endif$
$if(pagetools)$
$pagetools()$
$endif$
$footer()$
        </div>
      </div>
    </div>

    <!-- BEGIN of patched html with ace editor -->
    <style type="text/css" media="screen">
      #editor {
        height: 350px;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
        font-family: Monaco, "Liberation Mono", Courier, monospace;
      }
      #editedText {
        visibility: hidden;
        display: none;
      }
    </style>
    <script src="$base$/js/ace/ace.js" type="text/javascript" charset="utf-8"></script>
    <script>
      var ta = document.getElementById("editedText");
      var editorDiv = document.createElement("div");
      editorDiv.setAttribute("id", "editor");
      ta.parentNode.insertBefore(editorDiv, ta.nextSibling);
      var editor = ace.edit(editorDiv);
      editor.getSession().setValue(ta.value);
      editor.getSession().on('change', function () {
        ta.value = editor.getSession().getValue();
      });
      editor.setTheme("ace/theme/github");
      editor.getSession().setMode("ace/mode/markdown");
      editor.setHighlightActiveLine(false);
      editor.setShowPrintMargin(false);
      editor.getSession().setUseWrapMode(true);
      editor.setKeyboardHandler("ace/keyboard/vim");
      editor.focus();
    </script>
    <!-- BEGIN of patched html with ace editor -->
    
$javascripts$
$expire()$
$getuser()$
  </body>
</html>
