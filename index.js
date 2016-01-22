var fs = require('fs');
var path = require('path');

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
            "body:end": "<!-- body:end -->"
        }
    },
    blocks: {
        codesnippet: {
            process: function(block) {
                console.log("codesnippet:process. data: " + block);
                var filename = block.args[0];
                if (!filename) throw new Error('Require a "filename" as first argument');

                // Determine language
                var language = block.kwargs.language || path.extname(filename).slice(1);

                // Read the file
                return this.book.readFile(filename)

                // Return the html content
                .then(function(content) {
                    return '<pre><code class="lang-' + language + '">' + content + '</code></pre>';
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

        // This is called after the book generation
        "finish": function() {
            console.log("hooks: finish!");
        }

    }
};
