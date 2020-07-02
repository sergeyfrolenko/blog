/* eslint-disable no-undef */
$(function() {
  // toggle !!
  var flag = true;
  $('.switch-button').on('click', function(e) {
    e.preventDefault();

    if (flag) {
      flag = false;
      $('.auth-signin').show('slow');
      $('.auth-login').hide();
    } else {
      flag = true;
      $('.auth-login').show('slow');
      $('.auth-signin').hide();
    }
  });
});
/* eslint-enable no-undef */
