// project list for small devices
function toggleProject() {
  $('.project-title').click(function() {
    $(this).parent().find('.project-toggle').slideToggle();
    $(this).find('.fa').toggleClass('rotated');
  });
}

// konami code handler
function konamiCode() {
    var allowedKeys = {37: 'left', 38: 'up', 39: 'right', 40: 'down', 65: 'a', 66: 'b'};
    var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
    var konamiCodePosition = 0;

    document.addEventListener('keydown', function(e) {
      var key = allowedKeys[e.keyCode];
      var requiredKey = konamiCode[konamiCodePosition];
      if (key == requiredKey) {
        konamiCodePosition++;
        if (konamiCodePosition == konamiCode.length) {
          activateCheats();
        }
      } else {
        konamiCodePosition = 0;
      }
    });

    function activateCheats() {
      $('#konami').modal('show');
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

  $('body').keydown(function(e) {
    if(e.keyCode == 27) { // escape key pressed
      $("ul#school-list > li").flip(false);
    }
  });
}

// modal handler
function gradesModal() {
  $('#grades').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);

    var school = button.data('school'); // extract info from data-* attributes
    var datagrades = button.data('grades'); // string
    var grades = datagrades.substring(1, datagrades.length - 2).split("},"); // adapt the format to be JSON like
    $.each(grades, function(i, v) { grades[i] = v + "}" });

    var modal = $(this);
    modal.find('.modal-title').text('Grades at ' + school);
    modal.find('.grades-body').load('grades.html');
    $.each(grades, function(index, value) {
      var obj = eval('(' + value + ')');
      modal.find('.select-menu').append('<li data-href="' + obj['gradesfile'] + '">' + obj['period'] + '</li>');
    });

    modal.find('.select-menu li').click(function() {
      modal.find('.grades-body').load('grades-' + $(this).attr('data-href') + '.html');
    });
  });

  $('#grades').on('hide.bs.modal', function(event) {
    $(this).find('.select-menu').html(''); // remove all added elements
  });
}

// scrollspy handler
function scrollspyHandler() {
  $('#scrollspy').on('activate.bs.scrollspy', function () {
    $("#scrollspy ul.sublist li.active2").removeClass("active2"); // reset all active2 sublists
    var activated = $("#scrollspy ul.sublist > li.active");
    if (activated.length > 0) {
      var curr = activated.prev();
      while (curr.length > 0) {
        // check if the element pointed is at the same offset from the top of the document
        if ($('#' + curr.text().split(' ').join('_')).offset().top == $('#' + activated.text().split(' ').join('_')).offset().top) {
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
  toggleProject();
}


$(function(){
  'use strict';
  $('[data-spy=affix]').each(function () { // set education affix position
    $(this).affix({offset: {top: 70}});
    $(this).affix('checkPosition');
  });
  ready();
  gradesModal();
});
