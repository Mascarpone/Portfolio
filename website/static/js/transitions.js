$(function(){
  'use strict';
  var $page = $('#transitions'),
      options = {
        debug: true,
        prefetch: true,
        cacheLength: 2,
        onStart: {
          duration: 250, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();
            // Reverse default navbar animation before changing the page
            $("ul#navbar li.active a").toggleClass("exiting");
            // Change the css of the body for affix in Education page
            if ({{ body }}) { $("body").css("position", "relative"); }
            else { $("body").css("position", ""); }
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
          }
        }
      },
      smoothState = $page.smoothState(options).data('smoothState');
});

