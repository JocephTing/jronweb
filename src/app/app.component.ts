import { Component } from '@angular/core';
declare var tronWeb: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jronweb';

  getTronWeb() {
    if(tronWeb && tronWeb.defaultAddress.base58){
      console.log("Yes, catch it:", tronWeb.defaultAddress.base58);
      tronWeb.trx.getBalance(tronWeb.defaultAddress.base58).then((result: any) => {
        console.log("and your balance is :", result)
      })
    }
    else {
      console.log("error");
    }
  }

  async signSomething() {
    var bla = "foo bar"
    var blahex = tronWeb.toHex(bla);
    var signature = await tronWeb.trx.sign(blahex);
    console.log(signature)
  }

  async interactWithContract() {
    let contract = await tronWeb.contract().at("TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs");
    try {
      let res = await contract.transfer('TQHMWoWU8dewkYMzG2xpdybuDqoXZqFe39', 5000000).send({
        feeLimit:100_000,
        callValue:0,
        shouldPollResponse:true
      });
      console.log(res);
    }
    catch (error) {
      console.log(error);
    }
  }
}
