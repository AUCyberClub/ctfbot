import Storage from './storage';
import Convo from './../data/convo.json';

class Bot {
  constructor(){
    console.log(Convo);
    this.storage = Storage();
    this.name = this.storage.getUserName();
    this.pass = false;
    this.questionLength = 11;
    this.registered = (this.name);
    this.answering = null;
    if(!this.name){
      this.storage.addToChatHistory("bot", "Merhaba, benim adım Lynx, senin ekran adın nedir?");
    }else{
      this.storage.addToChatHistory("bot", "Tekrar hoşgeldin "+this.name+", şifreni yaz ve gerçekten sen olduğunu doğrulamama yardım et.");
    }
  }

  tell(val, info){
    let answer = null;
    if(!this.storage.getUserName()){
      this.storage.setUserName(val);
      answer = "Hoşgeldin "+val+", bir şifre yaz, bu şifreyi sonrasında gerçekten sen olduğunu doğrulamada kullanacağım.";
    }

    if(!answer && this.storage.getUserName() && !this.pass){
      if(this.registered){
        if(true){ // this.check(userName, this.pass);
          answer = "Doğru şifre, hadi başlayalım. [BİLGİ]";
          this.pass = true;
        }else{
          answer = "Yanlış şifre, tekrar dene.";
        }
      }else{
        answer = "Tamamdır, birdahakine seni hatırlayacağım, hadi başlayalım. [BİLGİ]";
        this.pass = true;
        // this.register(userName, this.pass);
      }
      val = "**********";
    }

    if(this.answering){
      if(true){ // check if the answer is right.
        answer = "Doğru cevap! [PUAN]";
      }else{
        answer = "Yanlış cevap!";
      }
      this.answering = null;
    }

    if(info == "BİLGİ"){
      val = "Nasıl kullanacağım hakkında bilgi verir misin?";
      answer = "Soruları listelemek için 'soruları listele' yaz ve istediğin soruyu seç.";
    }

    if(info == "PUAN" || val.includes('puan')){
      val = "Puanımı göster";
      answer = "Puanın: 2314"; // get point from api
    }

    if(val == 'soruları listele' || val == 'soruları göster'){
      answer = "Tüm sorular: [1][2][3][4][5][6][7][8][9][10][11]"; //get questions from api
    }

    if(val == 'çözülmemiş soruları listele' || val == 'çözülmemiş soruları göster'){
      answer = "Çözülmemiş sorular: [1][4][6][10][11]"; // get unsolved questions form api
    }

    Convo.forEach(c => {
      let check = false;
      c.question.forEach(cq => {
        check = check || val.includes(cq);
      });
      if(check){
        answer = c.answer[rand(0, c.answer.length)];
      }
    });


// array button controllers

    let q = 1;
    while(1){
      if(info == q || (val.includes("göster") && val.split(".")[0] == q)){
        val = q +". soruyu göster";
        answer = q +". sorunun dosyasını indirin veya soruyu cevaplayın. [İNDİR="+q+"][CEVAPLA="+q+"]";
      }
      q++;
      if(q > this.questionLength) break;
    }

    q = 1;
    while(1){
      if(info == "CEVAPLA="+q || (val.includes("cevapla") && val.split(".")[0] == q)){
        val = q +". soruyu cevapla";
        answer = q +". sorunun cevabını girin";
        this.answering = q;
      }
      q++;
      if(q > this.questionLength) break;
    }

    q = 1;
    while(1){
      if(info == "İNDİR="+q || (val.includes("indir") && val.split(".")[0] == q)){
        val = q +". soruyu indir";
        answer = q +". soru indirildi [CEVAPLA="+q+"]";
        this.answering = q;
      }
      q++;
      if(q > this.questionLength) break;
    }



    if(!answer){
      answer = "Anlamadım!";
    }
    this.storage.addToChatHistory("user", val);
    this.storage.addToChatHistory("bot", answer);
  }
}

let _bot = new Bot();

export default function get(){
  return _bot;
}

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
