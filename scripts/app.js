// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-msg');  
const rooms = document.querySelector('.chat-rooms');

// add anew chat
newChatForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message  = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(()=>{ newChatForm.reset() })
    .catch(err=>{ console.log(err)})
});

// update username
newNameForm.addEventListener('submit', e=>{
    e.preventDefault();
    // Update name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset the form
    newNameForm.reset();
    // Show then hide the update Message
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(()=>updateMssg.innerText ='' , 3000)   
});

// update the chat room
rooms.addEventListener('click', e =>{
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear(); 
       chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat))
    }
});


// Check localstorage for a name
const username = localStorage.username ? localStorage.username :'anon';



const chatUI = new ChatUI(chatList);

// Class instances 
const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats(data=>chatUI.render(data)); 

