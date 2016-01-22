require(["gitbook", "jQuery"], function(gitbook, $) {
  gitbook.events.bind("page.change", function() {
    console.log("gitbook event: page.change");
  });
});
