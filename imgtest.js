// Import library
var douyu = require('douyu');

// Initialize Room entity
var roomID = "301049";
var room = new douyu.ChatRoom(roomID);

// System level events handler
room.on('connect', function(message){
	console.log('DouyuTV ChatRoom #' + roomID + ' connected.');
});
room.on('error', function(error){
	console.error('Error: ' + error.toString());
});
room.on('close', function(hasError){
	console.log('DouyuTV ChatRoom #' + roomID + ' disconnected' + hasError ? ' because of error.' : '.');
});

// Chat server events
// room.on('chatmsg', function(message){
// 	console.log('[' + message.nn + ']: ' + message.txt);
// });

//gift
room.on('dgb', function(message){
	console.log('[' + message.nn + ']: ' + message.gfid+'*'+message.gfcnt);
});

// Knock, knock ...
room.open();