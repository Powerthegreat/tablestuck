const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");
const landcall = require("../modules/landcall.js");

const gateReq = [0,200,400,800,1600,3200,6400,12800];


exports.run = (client, message, args) => {

  if(funcall.regTest(client, message, message.author) == false){
    message.channel.send("You're not a registered player!");
    return;
  }

  if(strifecall.strifeTest(client, message, message.author) == true){
    message.channel.send("You can't do that in Strife! You need to either win the Strife or leave Strife using Abscond!");
    return;
  }

//determine player location

  var charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
  var occset = [true,charid];

  let local = client.playerMap.get(charid,"local");
  let land = local[4];
  let sec = client.landMap.get(land,local[0]);
  let area = sec[local[1]][local[2]];
  let room = area[2][local[3]];

//check if player is in house

  if(area[0]==5){

    if(!args[0]){

      //if no arguments, list all gates

      let gristSpent = client.landMap.get(local[4],"spent");
      let gate = client.landMap.get(local[4],"gate");

      gateSend = new client.Discord.MessageEmbed()
      .setTitle(`${client.playerMap.get(local[4],"name").toUpperCase()}'S GATES`)
      .setColor("#29b5d3")
      .addField("**Gate Reached**",gate)
      .addField("**Grist to next Gate**",gateReq[gate+1]-gristSpent)
      .addField("**Gates**",`**[${gate >= 1 ? "1" : "X"}] ${client.emojis.cache.get('736006488086282261')} GATE 1**\n
      **[${gate >= 2 ? "2" : "X"}] ${client.emojis.cache.get('736006488086282261')} GATE 2**\n
      **[${gate >= 3 ? "3" : "X"}] ${client.emojis.cache.get('736006488086282261')} GATE 3**\n
      **[${gate >= 4 ? "4" : "X"}] ${client.emojis.cache.get('736006488086282261')} GATE 4**\n
      **[${gate >= 5 ? "5" : "X"}] ${client.emojis.cache.get('736006488086282261')} GATE 5**\n
      **[${gate >= 6 ? "6" : "X"}] ${client.emojis.cache.get('736006488086282261')} GATE 6**\n
      **[${gate >= 7 ? "7" : "X"}] ${client.emojis.cache.get('736006488086282261')} GATE 7**\n`);

      message.channel.send(gateSend);

      return;
    }

    value = parseInt(args[0], 10);
    if(isNaN(value) || value<1 || value>7){
      message.channel.send("That is not a valid argument!");
      return;
    }
    let gate = client.landMap.get(local[4],"gate");

    //check if selected gate is available

    if(value>gate){
      if (client.traitcall.traitCheck(client,charid,"ROCKET")[1]||client.traitcall.traitCheck(client,charid,"SPACE")) {
        message.channel.send("House hasn't been built high enough to reach that gate, but you don't care, you can fly!");
      } else {
        message.channel.send("House hasn't been built high enough to reach that gate! Have your SERVER player build up your house with >build");
        return;
      }
    }

    let sburbClient;
    let clientid;
    let clientGates;

    switch(value){
      //if fist gate selected, change player location to location of first gate on land
      case 1:
        sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
        local = ["s1",Math.floor(Math.random() * 11),Math.floor(Math.random() * 11),0,land];
        message.channel.send("Entering the FIRST GATE!");
        funcall.actionCheck(client,message);
        sec = client.landMap.get(local[4],local[0]);
        console.log(sec[local[1]][local[2]][2]);
        sec[local[1]][local[2]][2][local[3]][4].push(occset);
        sec[local[1]][local[2]][2][local[3]][3]=true;
        client.landMap.set(local[4],sec,local[0]);
        client.playerMap.set(charid,local,"local");
        client.funcall.sleepHeal(client,charid);
      break;
      case 2:
      //if second gate is selected, check if server player is connected and entered
        sburbClient = client.playerMap.get(local[4],"client");
        clientid =message.guild.id.concat(sburbClient)
        console.log(sburbClient);
        if(sburbClient== "NA"){
          message.channel.send("This gate does not lead anywhere!");
          return;
        } else if(client.landMap.get(clientid,"enter")==false){
          message.channel.send("This gate does not lead anywhere!");
          return;
        }
        clientGates = client.landMap.get(clientid,"gates");
        sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
        local = ["s1",clientGates[0][0],clientGates[0][1],0,clientid];
        //local = clientGates[0];
        message.channel.send("Entering the SECOND GATE!");
        funcall.actionCheck(client,message);
        sec = client.landMap.get(local[4],local[0]);
        sec[local[1]][local[2]][2][local[3]][4].push(occset);
        sec[local[1]][local[2]][2][local[3]][3]=true;
        client.landMap.set(local[4],sec,local[0]);
        client.playerMap.set(charid,local,"local");
        client.funcall.sleepHeal(client,charid);
      break;

      case 3:
      sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
        local = ["s2",Math.floor(Math.random() * 11),Math.floor(Math.random() * 11),0,land];
        message.channel.send("Entering the THIRD GATE!");
        funcall.actionCheck(client,message);
        sec = client.landMap.get(local[4],local[0]);
        sec[local[1]][local[2]][2][local[3]][4].push(occset);
        sec[local[1]][local[2]][2][local[3]][3]=true;
        client.landMap.set(local[4],sec,local[0]);
        client.playerMap.set(charid,local,"local");
        client.funcall.sleepHeal(client,charid);
      break;
      case 4:
        sburbClient = client.playerMap.get(local[4],"client");
        clientid =message.guild.id.concat(sburbClient)

        if(sburbClient== "NA"){
          message.channel.send("This gate does not lead anywhere!");
          return;
        } else if(client.landMap.get(clientid,"enter")==false){
          message.channel.send("This gate does not lead anywhere!");
          return;
        }
        clientGates = client.landMap.get(clientid,"gates");
        sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
        local = ["s2",clientGates[1][0],clientGates[1][1],0,clientid];
        message.channel.send("Entering the FOURTH GATE!");
        funcall.actionCheck(client,message);
        sec = client.landMap.get(local[4],local[0]);
        sec[local[1]][local[2]][2][local[3]][4].push(occset);
        sec[local[1]][local[2]][2][local[3]][3]=true;
        client.landMap.set(local[4],sec,local[0]);
        client.playerMap.set(charid,local,"local");
        client.funcall.sleepHeal(client,charid);
      break;

      case 5:
      sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
        local = ["s3",Math.floor(Math.random() * 11),Math.floor(Math.random() * 11),0,land];
        message.channel.send("Entering the FIFTH GATE!");
        funcall.actionCheck(client,message);
        sec = client.landMap.get(local[4],local[0]);
        sec[local[1]][local[2]][2][local[3]][4].push(occset);
        sec[local[1]][local[2]][2][local[3]][3]=true;
        client.landMap.set(local[4],sec,local[0]);
        client.playerMap.set(charid,local,"local");
        client.funcall.sleepHeal(client,charid);
      break;
      case 6:
        sburbClient = client.playerMap.get(local[4],"client");
        clientid =message.guild.id.concat(sburbClient)

        if(sburbClient== "NA"){
          message.channel.send("This gate does not lead anywhere!");
          return;
        } else if(client.landMap.get(clientid,"enter")==false){
          message.channel.send("This gate does not lead anywhere!");
          return;
        }
        clientGates = client.landMap.get(clientid,"gates");
        sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
        local = ["s3",clientGates[2][0],clientGates[2][1],0,clientid];
        message.channel.send("Entering the SIXTH GATE!");
        funcall.actionCheck(client,message);
        sec = client.landMap.get(local[4],local[0]);
        sec[local[1]][local[2]][2][local[3]][4].push(occset);
        sec[local[1]][local[2]][2][local[3]][3]=true;
        client.landMap.set(local[4],sec,local[0]);
        client.playerMap.set(charid,local,"local");
        client.funcall.sleepHeal(client,charid);
      break;

      case 7:
      sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
        local = ["s4",Math.floor(Math.random() * 11),Math.floor(Math.random() * 11),0,land];
        message.channel.send("Entering the SEVENTH GATE!");
        funcall.actionCheck(client,message);
        sec = client.landMap.get(local[4],local[0]);
        sec[local[1]][local[2]][2][local[3]][4].push(occset);
        sec[local[1]][local[2]][2][local[3]][3]=true;
        client.landMap.set(local[4],sec,local[0]);
        client.playerMap.set(charid,local,"local");
        client.funcall.sleepHeal(client,charid);
      break;

    }
    landcall.drawMap(client,message,true);


    /*local = ["s1",Math.floor(Math.random() * 11),Math.floor(Math.random() * 11),0,land];
    sec = client.landMap.get(land,local[0]);

    sec[local[1]][local[2]][2][local[3]][4].push(occset);

    client.playerMap.set(charid,local,"local");

    message.channel.send("Entering the FIRST GATE!");

    client.landMap.set(local[4],sec,local[0]); */

  } else if(area[0]==3){

    //if location is return node, send player to house on land

    sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);

    local = ["h",0,0,0,land];

    sec = client.landMap.get(land,local[0]);

    client.playerMap.set(charid,local,"local");

    sec[local[1]][local[2]][2][local[3]][4].push(occset);

    message.channel.send("Returning home");
    funcall.actionCheck(client,message);

    client.landMap.set(local[4],sec,local[0]);

  } else if(area[0]==6) {
    let server = client.playerMap.get(local[4],"server");
    let serverid =message.guild.id.concat(server);
    if(server == "NA"){
      message.channel.send("This gate does not lead anywhere!");
      return;
    } else if(client.landMap.get(serverid,"enter")==false){
      message.channel.send("This gate does not lead anywhere!");
      return;
    }

    message.channel.send("Entering the gate!");
    funcall.actionCheck(client,message);
    sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
    local = ["h",0,0,0,serverid];

    client.playerMap.set(charid,local,"local");

    sec = client.landMap.get(land,local[0]);

    sec[local[1]][local[2]][2][local[3]][4].push(occset);

    client.landMap.set(local[4],sec,local[0]);
    client.funcall.sleepHeal(client,charid);

  } else if(area[0]==1){


    sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
   if(local[0].length==2){

     local[0]+="d";
    message.channel.send("Entering the Dungeon!");
    funcall.actionCheck(client,message);
    landcall.drawMap(client,message,true);

   } else {
     local[0]=local[0].slice(0,-1);
    message.channel.send("Leaving the Dungeon!");
    funcall.actionCheck(client,message);
    landcall.drawMap(client,message,true);
   }
   sec = client.landMap.get(land,local[0]);
   sec[local[1]][local[2]][2][local[3]][4].push(occset);
   sec[local[1]][local[2]][2][local[3]][3]=true;
   client.playerMap.set(charid,local,"local");
   client.landMap.set(local[4],sec,local[0]);
   client.funcall.sleepHeal(client,charid);
 } else if(area[0]==13){

   sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
   if(local[0].length==2){
     local[0]=local[0].slice(0,-1);
     funcall.actionCheck(client,message);
     landcall.drawMap(client,message,true);
   }else{
     local[0]+="m";
    funcall.actionCheck(client,message);
    landcall.drawMap(client,message,true);
   }
   sec = client.landMap.get(land,local[0]);
   sec[local[1]][local[2]][2][local[3]][4].push(occset);
   sec[local[1]][local[2]][2][local[3]][3]=true;
   client.playerMap.set(charid,local,"local");
   client.landMap.set(local[4],sec,local[0]);
   message.channel.send("Crossing the Chain!");
   client.funcall.sleepHeal(client,charid);

 } else if(area[0]==46){

   sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
   let floor = parseInt(local[0].charAt(local[0].length-1),10);

  if(isNaN(floor)){
    local[0]+="1";
    funcall.actionCheck(client,message);
    landcall.drawMap(client,message,true);
  }else{
    local[0]=local[0].slice(0,-1)+`${(floor+1)}`;
    funcall.actionCheck(client,message);
    landcall.drawMap(client,message,true);
  }
  sec = client.landMap.get(land,local[0]);
  sec[local[1]][local[2]][2][local[3]][4].push(occset);
  sec[local[1]][local[2]][2][local[3]][3]=true;
  client.playerMap.set(charid,local,"local");
  client.landMap.set(local[4],sec,local[0]);
  message.channel.send("Descending deeper into the dungeon!");
  client.funcall.sleepHeal(client,charid);

}  else if(area[0]==47){
  sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
  let floor = parseInt(local[0].charAt(local[0].length-1),10);

if(isNaN(floor)){
  message.channel.send("Already on Top floor");
  return;
}

if(floor<3){

  local[0]=local[0].slice(0,-1);
  funcall.actionCheck(client,message);
  landcall.drawMap(client,message,true);

}else{
  local[0]=local[0].slice(0,-1)+`${(floor-1)}`;
  funcall.actionCheck(client,message);
  landcall.drawMap(client,message,true);
}
  sec = client.landMap.get(land,local[0]);
  sec[local[1]][local[2]][2][local[3]][4].push(occset);
  sec[local[1]][local[2]][2][local[3]][3]=true;
  client.playerMap.set(charid,local,"local");
  client.landMap.set(local[4],sec,local[0]);
  message.channel.send("Ascending the staircase!");
  client.funcall.sleepHeal(client,charid);

} else if(area[0]==12){

  sec[local[1]][local[2]][2][local[3]][4].splice(room[4].findIndex(occpos => occpos[1] === occset[1]),1);
 if(local[0].charAt(local[0].length-1)!="c"){

   local[0]+="c";
   local[1]=5;
   local[2]=5;
  message.channel.send("Entering the castle!");
  funcall.actionCheck(client,message);
  landcall.drawMap(client,message,true);

 } else {
   if(client.landMap.has(local[4],"castleLocal")){
     castleLocal =client.landMap.get(local[4],"castleLocal");
     local[1]=castleLocal[0];
     local[2]=castleLocal[1];
   }
   local[0]=local[0].slice(0,-1);
  message.channel.send("Leaving the castle");
  funcall.actionCheck(client,message);
  landcall.drawMap(client,message,true);
 }
 sec = client.landMap.get(land,local[0]);
 console.log(local[0]);
 sec[local[1]][local[2]][2][local[3]][4].push(occset);
 sec[local[1]][local[2]][2][local[3]][3]=true;
 client.playerMap.set(charid,local,"local");
 client.landMap.set(local[4],sec,local[0]);
 client.funcall.sleepHeal(client,charid);

}


  else {
    message.channel.send("You can't do that here!")
  }

}
