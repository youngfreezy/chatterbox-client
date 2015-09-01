
var app = {};

var user;
window.user = [];
window.user.posts = {};


app.init = function(){
  this.fetch();
  user = window.location.search.slice(10);
};
  app.escape = function(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  app.addMessage = function(obj) {
    // // debugger;
    // var message = this.escape(obj.text);
    // var username = this.escape(obj.username);
    var $chat = $('<div></div>').addClass('chat');
    var $username = $('<div></div>').addClass('username').text(obj.username);
    var $text = $('<p></p>').text(obj.text);
    $chat.prepend($username);
    $chat.append($text);
    $('#chats').prepend($chat);
  };

  app.send = function(obj){
      var data = obj;
      console.log("sending" + data);
      $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
      });
  }

  app.fetch = function(){
    setInterval(function() {
      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        data: 'JSONP',
        contentType: 'application/json',
        success: function(data) {
          data.results.reverse();
          for (var i = 0; i <= data.results.length; i++) {
            if (data.results[i] && data.results[i].username && data.results[i].text) {
              // var message = app.escape(data.results[i].text);
              app.addMessage(data.results[i]);
            }
          }
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to load message');
        }
    });

    }, 3000);
  };

app.init();
  $('#userbutton').on("click", function() {
      console.log("I'm clicked!");
      var content = {};
      content.username = user;
      content.text = $('#usertext').val();
      console.log(content);
      app.send(content);
  });




