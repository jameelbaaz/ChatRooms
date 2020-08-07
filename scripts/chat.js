// adding new chat documents
// setting up real-time listener to get new chats
// updating the username
// updating the room

class Chatroom{
    constructor(room, username){
     this.room = room;
     this.username = username;
     this.chats = db.collection('chats');
     this.unsub;
    }

    async addChat(message){
        // format a chat obj
        const now = new Date();
        const chat = {
                message,
                username: this.username,
                room: this.room,
                created_at: firebase.firestore.Timestamp.fromDate(now)
             };
            //  Save the chat doc
            const response = await this.chats.add(chat);
            return response;
    }

    // Real-time listener
    getChats(callback){
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change=>{
                if(change.type === 'added'){
                    // Update the ui
                    callback(change.doc.data())
                }
            })
        });
    }

    
    // Update Username
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }

    // Update rooms
    updateRoom(room){
        this.room = room;
        console.log(room);
        if(this.unsub){
            this.unsub();
        }


    }


}


