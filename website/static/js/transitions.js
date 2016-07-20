function konamiCode() {
    // a key map of allowed keys
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      65: 'a',
      66: 'b'
    };
    
    // the 'official' Konami Code sequence
    var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
    
    // a variable to remember the 'position' the user has reached so far.
    var konamiCodePosition = 0;
    
    // add keydown event listener
    document.addEventListener('keydown', function(e) {
      // get the value of the key code from the key map
      var key = allowedKeys[e.keyCode];
      // get the value of the required key from the konami code
      var requiredKey = konamiCode[konamiCodePosition];
      
      // compare the key with the required key
      if (key == requiredKey) {
        
        // move to the next key in the konami code sequence
        konamiCodePosition++;
        
        // if the last key is reached, activate cheats
        if (konamiCodePosition == konamiCode.length)
        activateCheats();
      } else
      konamiCodePosition = 0;
    });
    
    function activateCheats() {
      alert("cheats activated");
    }
}

// education schools animation
function schoolsAnimation() {
  $("ul#school-list > li").each(function() {
    var elem = $(this);
    elem.flip({ trigger: 'manual' });
    elem.find(".showmore-button").each(function() {
      $(this).click(function() { elem.flip('toggle'); });
    });
  });
  
  // escape key down closes everything
  $('body').keydown(function(e) {
    // ESCAPE key pressed
    if(e.keyCode == 27) {
        $("ul#school-list > li").flip(false);
    }
  });
}

// modal handler
function gradesModal() { 
  $('#grades').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var school = button.data('school'); // Extract info from data-* attributes
    $(this).find('.modal-title').text('Grades at ' + school);
  });
}

// scrollspy handler
function scrollspyHandler() {
  $('#scrollspy').on('activate.bs.scrollspy', function () {
    // reset all active2 sublists
    $("#scrollspy ul.sublist li.active2").removeClass("active2");
    
    // activate the good list items
    var activated = $("#scrollspy ul.sublist > li.active");
    // check if a sublist item is activated
    if (activated.length > 0) { 
      var curr = activated.prev(); 
      while (curr.length > 0) {
        // check if the element pointed is at the same offset from the top of the document
        if ($('#' + curr.text()).offset().top == $('#' + activated.text()).offset().top) { 
          curr.addClass("active2");
        }
        curr = curr.prev();
      }
    }
  });
}

function ready() {
  schoolsAnimation();
  scrollspyHandler();
  konamiCode();
  gradesModal();
}


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
            
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            
            // Inject the new content
            $container.html($newContent);
            
            // set education affix position
            $('[data-spy=affix]').each(function () { 
              $(this).affix({offset: {top: 70}});
              $(this).affix('checkPosition'); 
            });
              
            ready();
          }
        }
      },
      smoothState = $page.smoothState(options).data('smoothState');
      
      ready();
});

