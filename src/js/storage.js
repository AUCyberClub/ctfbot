
class Storage {
  constructor(){
    console.log("> Storage object created");
    localStorage.setItem("history", "[]");
    if(!localStorage.getItem("userName")){
      this.setUserName('');
    }
  }

  getHistoryArray(){
    return JSON.parse(localStorage.getItem("history"));
  }

  getUserName(){
    return localStorage.getItem("userName");
  }
  setUserName(uName){
    localStorage.setItem("userName", uName);
  }

  setHistoryArray(historyArray){
    localStorage.setItem("history", JSON.stringify(historyArray));
    return true;
  }

  addToChatHistory(from, text){
    console.log("Adding to history": text);
    let historyArray = this.getHistoryArray();
    if(historyArray.length > 10){
      historyArray.shift();
    }
    historyArray.push({from, text});
    this.setHistoryArray(historyArray);
  }
}

let _storage = new Storage();
export default function get(){
  return _storage;
}
