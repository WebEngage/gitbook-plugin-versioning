require(["gitbook", "jQuery"], function(gitbook, $) {
    gitbook.events.bind('start', function (e, config) {
        console.log("gitbook event: start. Config: " + JSON.stringify(config));
    //     var conf = config['edit-link'];
    //     var label = conf.label;
    //     var base = conf.base;
    //     var lang = gitbook.state.innerLanguage;
    //     if (lang) {
    //         // label can be a unique string for multi-languages site
    //         if (typeof label === 'object') label = label[lang];

    //         lang = lang + '/';
    //     }

    //     // Add slash at the end if not present
    //     if (base.slice(-1) != "/") {
    //         base = base + "/";
    //     }

    //     gitbook.toolbar.createButton({
    //         icon: 'fa fa-edit',
    //         text: label,
    //         onClick: function() {
    //             var filepath = gitbook.state.filepath;

    //             window.open(base + lang + filepath);
    //         }
    //     });
    });

    gitbook.events.bind("page.change", function() {
        // ga('send', 'pageview', window.location.pathname+window.location.search);
        // ga('marketplace.send', 'pageview', window.location.pathname+window.location.search);
    });

    gitbook.events.bind("exercise.submit", function(e, data) {

    });
});
