var fs = require('fs');
var path = require('path');
//var cheerio = require('cheerio');

function cl(msg){
    console.log(msg);
}

module.exports = {
    website: {
        assets: "./book",
        js: ["versioning.js", "plugin.js"],
        css: [],
        templates: [],
        html: {
            "html:start": function() {
                return "<!-- Start book " + this.options.title + " -->"
            },
            "html:end": function() {
                return "<!-- End of book " + this.options.title + " -->"
            },

            "head:start": "<!-- head:start -->",
            "head:end": "<!-- head:end -->",

            "body:start": "<!-- body:start -->",
            "body:end": function(){
                var config = this.options.pluginsConfig.ga || {};
                if (!config.token) {
                	//throw "Need to option 'token' for Google Analytics plugin";
                }

                return "<!--some html-->";
            }
        }
    },
    blocks: {
        // Example: {% codesnippet "/home/page_1/myfile2.ejs", language="html" %}hello{% endcodesnippet %}
        codesnippet: {
            process: function(block) {
                cl("\n\n\n@@@@@@@@@@@@@@@@");
                console.log("codesnippet:process. data: " + JSON.stringify(block));
                var filename = block.args[0];
                if (!filename) throw new Error('Require a "filename" as first argument');

                // Determine language
                var language = block.kwargs.language || path.extname(filename).slice(1);
                cl("language = " + block.kwargs.language);

                // Read the file
                return this.book.readFile(filename)

                // Return the html content
                .then(function(content) {
                    return '<pre><code class="lang-' + language + '">' + content + '</code></pre>' + block.body;
                });
            }
        },
        // Author will be able to write "{% myTag %}World{% endMyTag %}"
        myTag: {
            process: function(blk) {
                console.log("myTag. data: " + blk);
                return "Hello " + blk.body;
            }
        }
    },
    filters: {
        // Author will be able to write "{{ 'test'|myFilter }}"
        myFilter: function(s) {
            console.log("myFilter. data: " + s);
            return "Hello " + s;
        }
    },
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called before the book is generated
        "init": function() {
            console.log("hooks: init!");
        },

        "page:before": function(page) {
          sectionids = [];
          return page;
        },

        "page:after": function(page) {
            // var section = parseNode(1, page.sections[0].content);
            // section.path = page.path;
            // book.unshift(section);
            return page;
        },

        // After html generation
        "page": function(page) {
            var h = '<a id="edit-link" href="http://webengage.com" class="btn fa fa-edit pull-left">&nbsp;&nbsp;WebEngage</a>';
            page.sections.forEach(function(section) {
                //var $ = cheerio.load(section.content);
                if (section.type == "normal") {
                    var origcontent = section.content;

                    section.content = h + origcontent;
                }
                //section.content = $.html();
            });

            return page;
        },

        // This is called after the book generation
        "finish": function() {
            console.log("hooks: finish!");
        }
    }
};
