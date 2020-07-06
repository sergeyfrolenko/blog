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

// registration
$('.reg-btn').on('click', e=>{
  e.preventDefault();
  const data = {
    login: $('#signin-login').val(),
    pass: $('#signin-pass').val(),
    passCheck: $('#signin-pass-check').val()
  };

  $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/api/auth/register'
    }).done(function(data) {
      if (!data.ok) {
        $('p.error').remove();
        $('.auth-signin h2').after('<p class="error">' + data.error + '</p>');
        if (data.fields) {
          data.fields.forEach(function(item) {
            $('input[name=' + item + ']').addClass('error');
          });
        }
      } else {
        $('.auth-signin h2').after('<p class="success">Success!</p>');
      }
    });
});
