import Storage from './storage';


class Bot {
  constructor(){
    this.storage = Storage();
    this.name = this.storage.getUserName();
    this.pass = false;
    this.registered = (this.name);
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
          answer = "Doğru şifre, hadi başlayalım.";
          this.pass = true;
        }else{
          answer = "Yanlış şifre, tekrar dene.";
        }
      }else{
        answer = "Tamamdır, birdahakine seni hatırlayacağım, hadi başlayalım.";
        this.pass = true;
        // this.register(userName, this.pass);
      }
      val = "**********";
    }

    if(info == "BİLGİ"){
      answer = "Soruları listelemek için 'soruları listele' yaz ve istediğin soruyu seç.";
    }

    if(val == 'soruları listele' || val == 'soruları göster'){
      answer = "[1][2][3][4][5][6][7][8][9][10][11]";
    }


    if(val == 'çözülmemiş soruları listele' || val == 'çözülmemiş soruları göster'){
      answer = "[1][4][6][10][11]";
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
