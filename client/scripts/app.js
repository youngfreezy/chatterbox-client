
var app = {};

app.init = function(){

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
    var message = this.escape(obj.text)
    var $chat = $('<div></div>').html(message);
    
    // var $frame = $('<div></div').addClass('chatFrame');
    // $("#chats").prepend($frame);
    // $(".chatFrame").prepend($chatHeader);
    // $(".chatFrame").prepend($message);
    $('#chats').append($chat);
    // var $text = $('<p></p>');
    // $text.text(message.text);

    // var $message = $('<p></p>').addClass('chat');
    // $message.append($text);
    
    


      
    
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

  // app.get = function(){
  // }
  
$(document).ready(function() {
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

  // app.get();
})
  


