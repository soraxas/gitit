The `gitit` data dir had been modified to include ace editor, based on [this](https://gist.github.com/lmullen/e2d2d4aabf84220c517a).


> Thank you for your page.st file. It works.
> 
> I had a bit trouble until I figured out the following:
> 
> 1. *.js files have to be below static/js/. Otherwise they are not executed.
> 2. Get one of the src directories from github.com/ajaxorg/ace-builds and copy them below static/js/. In my case static/js/src-min/. Then change line 61 to read `<script src="$base$/js/src-min/ace.js" type="text/javascript" charset="utf-8"></script>`

