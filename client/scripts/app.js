
var app = {};
var rooms = {};
var storage = [];
var friends = [];

var user;
window.user = [];
window.user.posts = {};


app.init = function(){
  this.fetch();
  user = window.location.search.slice(10);
  setTimeout(this.createRooms, 3000);
  // app.createRooms();
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

var d;
app.fetch = function(){
    $.ajax({
              url: 'https://api.parse.com/1/classes/chatterbox',
              type: 'GET',
              data: 'JSONP',
              contentType: 'application/json',
              success: function(data) {
                data.results.reverse();
                d = data.results.slice();
                for (var i = 0; i <= data.results.length; i++) {
                  //bolding messages from friends:

                  // if (data.results[i].username && friends.indexOf(data.results[i].username) !== -1) {
                  //     data.results[i].$text.css('font-weight', 'bold')
                  //   }

                  if (data.results[i] && data.results[i].username && data.results[i].text) {
                    
                    if (data.results[i].roomname !== undefined && data.results[i].roomname !== null ) {
                      //.indexOf('undefined') === -1
                      //check here if username is in friends. if it is, bold the text. 
                      rooms[data.results[i].roomname] = data.results[i].roomname;
                      room = $('.selector').val();
                      if(room === data.results[i].roomname) {
                        app.addMessage(data.results[i]);
                      
                      } 
                    }
                    // else {
                    //   app.addMessage(data.results[i]);
                    // }
                  }
                }
                return data;
              },
              error: function (data) {
                // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
                console.error('chatterbox: Failed to load message');
              }
          });
friended();
  return d;
};

app.createRooms = function() {
  //rooms is an object
  var select = $(".selector")
  var filtered = _.reject(rooms, function(room){
    return room === "undefined" || room === "null" || room === "" || room === undefined;
  });
  // select.childNodes.remove();

  _.each(filtered, function(item) {
 
      select.append($("<option/>").attr("value", item).text(item));
      // //console.log(key);
     
    });


  // $(".selector").append(select);
};

app.addFriends = function(node){
     node.addClass('friend');
    node.css("font-weight", "bold");

}
app.enterRoom = function(room){
  $('.chat').fadeOut(1000, function() {
    $(this).remove();
  });
  var rooms = app.fetch();
  // debugger;
  rooms = _.filter(rooms, function(r) {
    return r.roomname === room;
  });
  _.each(rooms, function(obj) {
    app.addMessage(obj);
  });

}
// console.log(rooms);
app.init();
setInterval(function() {  
  app.fetch();

}, 3000);

//implement room selector access the rooms property and append it after the button.
//filter by room -- only show messages associated with each room.


  var sendText = function() {
    console.log("I'm clicked!");
    var content = {};
    content.username = user;
    content.text = $('#usertext').val();
    content.roomname = $('.selector').val();
    // content.roomname  = 
    console.log(content);
    app.send(content);
   $('#usertext').val('');
  };

  $('#usertext').on("keydown", function(e) {
    if (e.keyCode === 13) {
      sendText();
    }
  }); 

  $('#userbutton').on("click", function() {
    sendText(); 
  });

  $('.selector').on("change", function() {
    var roomChoice = $('.selector').val();
    app.enterRoom(roomChoice);
  });

//adding .username is a way to get around dynamically created elements
  function friended(){
  $('#chats').on("click", ".username", function(e){
    //we want to allow people to be friends, so add a class of friends to this username
    // console.log(e);
    // friends.push(e.currentTarget.innerHTML);
    //e.preventDefault();
    $(".username").siblings().css("font-weight", "bold");
    //addClass('.friends')
   
  })}


// console.log(friends);


