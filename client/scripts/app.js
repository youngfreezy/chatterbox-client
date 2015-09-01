
var app = {};

app.init = function(){
  this.fetch();
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
    $('#chats').append($chat);
  };

  app.send = function(obj){

    return setInterval(function(){
      $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: 'JSONP',
      contentType: 'application/json',
      success: function(data) {
        data.results.reverse();
        for (var i = 0; i <= data.results.length; i++) {
          var message = escape(data.results[i]);
          if (message.username !== undefined && message.text !== undefined) {
            // this.addMessage(message);
        }
          }
        
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to load message');
      }
    });
    }, 1000);

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
  
// $(document).ready(function() {

//   // app.get();
// })
app.init();


