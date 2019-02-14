<template>
  <div class="chat container">
    <h2 class="center teal-text">ChatRoom</h2>
    <button class="btn btn-small center" @click="clearChat">clear chat</button>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li>
            <span class="teal-text">Admin</span>
            <span class="grey-text text-darken-3">Hello there!</span>
            <span class="grey-text time">Feb 14.2019 6:40</span>
          </li>
          <li v-for="message in messages" :key="message.id">
            <div class="delMsg" @click="deleteMessage(message.id)">+</div>
            <span class="teal-text">{{message.name}}</span>
            <span class="grey-text text-darken-3">{{message.content}}</span>
            <span class="grey-text time">{{message.timestamp}}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name"/>
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from "@/components/NewMessage";
import db from "@/firebase/init";
import moment from "moment";

export default {
  name: "Chat",
  props: ["name"],
  components: {
    NewMessage
  },
  data() {
    return {
      messages: []
    };
  },
  methods: {
    clearChat() {
      this.messages = [];
    },

    deleteMessage(id) {
      // delete message from firestore
      db.collection("messages")
        .doc(id)
        .delete()
        .then(() => {
          this.messages = this.messages.filter(message => {
            return message.id != id;
          });
        });
    }
  },
  created() {
    let ref = db.collection("messages").orderBy("timestamp");

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          // pushing messages from firestore to messages array in data
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format("lll")
          });
        }
      });
    });
  }
};
</script>

<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}

.chat span {
  font-size: 1.4em;
}

.chat .time {
  display: block;
  font-size: 0.8em;
}

.messages {
  max-height: 300px;
  overflow: auto;
}

.messages::-webkit-scrollbar {
  width: 6px;
}

.messages::-webkit-scrollbar-track {
  background: #ddd;
}

.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}

.messages li {
 position: relative;
 padding-left: 20px;
 transition: .3s ease;
}

.messages li:hover:not(:first-of-type){
    margin-left: 20px;
}

.delMsg {
    position: absolute;
    left: -13px;
    top: 5px;
    transform: rotate(45deg);
    font-size: 25px;
    cursor: pointer;
    color: red;
}
</style>
