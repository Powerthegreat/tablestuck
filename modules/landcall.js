const funcall = require("./funcall.js");
const lootcall = require("./lootcall.js");
const stifecall = require("./strifecall.js");
//10 dungeons, 10 villages, 15 return nodes, 10 constructs, 1 gate, 10 random loot, 65 nothing

//var output = [AREA TYPE,NUMBER OF ROOMS,[[roomType,roomLoot,roomName,roomVisite,occ,roomInv],[room2]]];
//default empty = [0,1,[0,random number,"Clearing",false,[underlings],[items]]]

var defaultEmpty = [0,1,[[[],[],"CLEARING",false,[],[]]]];
var defaultGate = [6,1,[[[],[],"GATE",false,[],[]]]];

function dubs(x){
  return Math.floor(Math.random() * x) + Math.floor(Math.random() * x);
}
//Land Key(0-9):
//EMPTY, DUNGEON, CONSTRUCT, NODE, VILLAGE, HOUSE, GATE, WALL, BOSS, DENIZEN

//10

//let defaultDungeon =[1,2,[[],[],"ROOM 1",false,[],[]],[[],[],"ROOM 2",false,[],[]]];
var defaultConstruct =[2,1,[[[],[],"LAND CONSTRUCT",false,[],[]]]];
var defaultNode =[3,1,[[[],[],"RETURN NODE",false,[],[]]]];
var defaultVillage =[4,2,[[[],[],"ROOM 1",false,[],[]],[[],[],"ROOM 2",false,[],[]]]];

exports.landGen = function(client,sec,gateCoor,message) {

  let outpostCheck = false;
  let outpostChance = 3;
  let section = [];
  for(i=0;i<11;i++){
    section.push([[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]],[0,1,[[[],[],"CLEARING",false,[],[]]]]]);
  }
  let dungeon = [];
  for(i=0;i<11;i++){
    dungeon.push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]]);
  }
empty =[];
  for(i=0;i<11;i++){
    for(j=0;j<11;j++){
      empty.push([i,j]);
    }
  }

  let dunCount;
  let denizenCheck = false;
  //Creates the Gate on the Land
  let pos = (gateCoor[0]*11)+(gateCoor[1]);
  if (sec!=3){
  let gate = empty.splice(pos,1);
  section[gate[0][0]][gate[0][1]]=[6,1,[[[],[],"GATE",false,[],[]]]];
  } else {
    denizenCheck = true;
    let temp=empty.splice(60,1);
    section[temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DENIZEN LAIR ENTRANCE",false,[],[]]]];
    dungeon = dungeonGen(client,temp,sec,dungeon,message)[0];
  }
  if(sec>1){
    dunCount = 1;
  } else {
    dunCount =2;
  }
  for(j=3;j>0;j--){
    let length = 40;
  //Creates Dungeons
  for(i=0;i<dunCount;i++){
    if(!denizenCheck){
  let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
  length--;
  section[temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DUNGEON ENTRANCE",false,[],[]]]];
  //section[temp[0][0]][temp[0][1]]=[1,6,[funcall.roomGenCall(client,1,sec,1),funcall.roomGenCall(client,1,sec,2),funcall.roomGenCall(client,1,sec,3),funcall.roomGenCall(client,1,sec,4)]];
  dungeon = dungeonGen(client,temp,sec,dungeon,message)[0];
  }
  }
  //Creates a Village
  for(i=0;i<3;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    section[temp[0][0]][temp[0][1]]=[4,2,[[[],[],"ROOM 1",false,[],[]],[[],[],"ROOM 2",false,[],[]]]];
  }
  //Creates the Land Constructs
  for(i=0;i<3;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    section[temp[0][0]][temp[0][1]]=[2,1,[[[],[],"LAND CONSTRUCT",false,[],[]]]];
  }
  //Creates the return nodes
  for(i=0;i<4;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    section[temp[0][0]][temp[0][1]]=[3,1,[[[],[],"RETURN NODE",false,[],[]]]];
  }
  //Creates free loot
  for(i=0;i<3;i++){
    let temp=empty.splice(Math.floor(Math.random()*length)-1+(40*(j-1)),1);
    length--;
    section[temp[0][0]][temp[0][1]]=[0,1,[[[],[],"CLEARING",false,[],[lootcall.lootA(client, sec, dubs(8))]]]];
  }
  }
  if(sec==0){
    for(i=0;i<2;i++){
      let moon=[["PROSPIT","DERSE"],["pc","dc"]];
      let temp=empty.splice(Math.floor(Math.random()*empty.length));
      let transCount = client.landMap.get(message.guild.id+"medium","transCount");

      let transList = client.landMap.get(message.guild.id+"medium","transList");
      let transCode = "0000";
      let transCode1 = "0000";

      let moonCode = "0000";

      while(transList.includes(transCode)||transCode=="0000"){
        transCode = "";
        for(k=0;k<4;k++){
          transCode+= client.captchaCode[Math.floor(Math.random()*38)]
        }
      }

      transList.push(transCode);
      transCount++;

      while(transList.includes(transCode1)||transCode1=="0000"){
        transCode1 = "";
        for(k=0;k<4;k++){
          transCode1+= client.captchaCode[Math.floor(Math.random()*38)]
        }
      }

      transList.push(transCode1);
      transCount++;

      let transLocal = client.landMap.get(message.guild.id+"medium","transLocal");

      var transSet = {
        local:["s1",temp[0][0],temp[0][1],0,message.guild.id.concat(message.author.id)],
        target:`${message.guild.id}${transCode1}`
      }

      var transSet1 = {
        local:[moon[1][i],transLocal[0],transLocal[1],0,message.guild.id+"medium"],
        target:`${message.guild.id}${transCode}`
      }

      let castle = client.landMap.get(message.guild.id+"medium",moon[1][i]);

      castle[transLocal[0]][transLocal[1]][2][0][5].push(["TRANSPORTALIZER",`//jG${transCode1}`,1,1,[],"https://cdn.discordapp.com/attachments/808757312520585227/814690784209010738/TRANSPORTALIZER.png"])

      section[temp[0][0]][temp[0][1]]=[11,1,[[[],[],`${moon[0][i]} OUTPOST`,false,[],[["TRANSPORTALIZER",`//jG${transCode}`,1,1,[],"https://cdn.discordapp.com/attachments/808757312520585227/814690784209010738/TRANSPORTALIZER.png"]]]]];
      client.transMap.set(`${message.guild.id}${transCode}`,transSet);
      client.transMap.set(`${message.guild.id}${transCode1}`,transSet1);
      client.landMap.set(message.guild.id+"medium",transList,"transList");
      client.landMap.set(message.guild.id+"medium",transCount,"transCount");
      client.landMap.set(message.guild.id+"medium",castle,moon[1][i]);

    }
  }
return [section,dungeon];


}

function dungeonGen(client,roomCoor,sec,dungeon,message) {
  dungeon[roomCoor[0][0]][roomCoor[0][1]]=[1,1,[[[],[],"DUNGEON EXIT",false,[],[]]]];
  let s = 0;
  let lv2 = [];
  let lv3 = [];
  if(sec==0||sec==1){
  let direction=["x+","x-","y+","y-"];
    //roomCoor[0][0]+,roomCoor[0][0]-,roomCoor[0][1]+,roomCoor[0][1]-
    if(roomCoor[0][0]>5){
      removed = direction.splice(direction.indexOf("x+"),1);
    } else if(roomCoor[0][0]<5){
      removed = direction.splice(direction.indexOf("x-"),1);
    }
    if(roomCoor[0][1]>5){
      removed = direction.splice(direction.indexOf("y+"),1);
    } else if(roomCoor[0][1]<5){
      removed = direction.splice(direction.indexOf("y-"),1);
    }

s = sec+1;
let b = 0;
  for(o=0;o<s;o++) {
    switch (direction[Math.floor((Math.random() * direction.length))]) {
      case "x+":
        removed = direction.splice(direction.indexOf("x+"),1);
        for(k=0;k<5;k++){
            b++;

          if(dungeon[roomCoor[0][0]+k] [roomCoor[0][1]] [0] != 1 && dungeon[roomCoor[0][0]+k] [roomCoor[0][1]] [0] != 8){
            if ((b==5&&sec==0)||(b==10&&sec==1)){
              dungeon[roomCoor[0][0]+k] [roomCoor[0][1]] =[8,1,[[[],[],"BOSS ROOM",false,[
                client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], 'basilisk', message),
                client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], 'basilisk', message),
                client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]+k,roomCoor[0][1]], 'basilisk', message),
              ],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {

            dungeon[roomCoor[0][0]+k] [roomCoor[0][1]] = dungeonRoomGen(client,sec);
          }
        }
      }
      break;
      case "x-":
      removed = direction.splice(direction.indexOf("x-"),1);

        for(k=0;k<5;k++){
            b++;
          if(dungeon[roomCoor[0][0]-k] [roomCoor[0][1]] [0] != 1 && dungeon[roomCoor[0][0]-k] [roomCoor[0][1]] [0] != 8){
              if ((b==5&&sec==0)||(b==10&&sec==1)){
              dungeon[roomCoor[0][0]-k] [roomCoor[0][1]] =[8,1,[[[],[],"DUNGEON ROOM",false,[client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0]-k,roomCoor[0][1]], 'imp', message)],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {
            dungeon[roomCoor[0][0]-k] [roomCoor[0][1]] = dungeonRoomGen(client,sec);
            }
          }
        }

      break;
      case "y+":
      removed = direction.splice(direction.indexOf("y+"),1);

        for(k=0;k<5;k++){
          b++;
          if(dungeon[roomCoor[0][0]] [roomCoor[0][1]+k] [0] != 1 && dungeon[roomCoor[0][0]] [roomCoor[0][1]+k] [0] != 8 /*&& roomCoor[0][1]+k <= 10*/){
              if ((b==5&&sec==0)||(b==10&&sec==1)){
              dungeon[roomCoor[0][0]] [roomCoor[0][1]+k] =[8,1,[[[],[],"DUNGEON ROOM",false,[client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0],roomCoor[0][1]+k], 'imp', message)],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {
            dungeon[roomCoor[0][0]] [roomCoor[0][1]+k] = dungeonRoomGen(client,sec);
          }
          }

        }

      break;
      case "y-":
      removed = direction.splice(direction.indexOf("y-"),1);

        for(k=0;k<5;k++){
          b++;
          if(dungeon[roomCoor[0][0]] [roomCoor[0][1]-k] [0] != 1 && dungeon[roomCoor[0][0]] [roomCoor[0][1]-k] [0] != 8){
            if ((b==5&&sec==0)||(b==10&&sec==1)){
              dungeon[roomCoor[0][0]] [roomCoor[0][1]-k] =[8,1,[[[],[],"DUNGEON ROOM",false,[client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0],roomCoor[0][1]-k], 'imp', message)],[lootcall.lootA(client, sec, dubs(8))]]]];
            } else {
            dungeon[roomCoor[0][0]] [roomCoor[0][1]-k] = dungeonRoomGen(client,sec);
          }
          }

        }

      break;

    }
  }
} else if(sec==2){
  for(k=0;k<11;k++){
    if(dungeon[roomCoor[0][0]] [k] [0] != 1 && dungeon[roomCoor[0][0]] [k] [0] != 8){
      dungeon[roomCoor[0][0]] [k] = dungeonRoomGen(client,sec);
    }
  }

  for(k=0;k<11;k++){
    if(dungeon[k] [roomCoor[0][1]] [0] != 1 && dungeon[k] [roomCoor[0][1]] [0] != 8){
      dungeon[k] [roomCoor[0][1]] = dungeonRoomGen(client,sec);
    }
  }
  let bosscheck = false;
  switch(Math.floor((Math.random() * 1))){
    case 0:
    while(!bosscheck){
      let random = Math.floor((Math.random() * 11))
      if(dungeon[roomCoor[0][0]][random][0]==0||dungeon[roomCoor[0][0]][random][0]==10){
        dungeon[roomCoor[0][0]][random] = [8,1,[[[],[],"BOSS ROOM",false,[
          client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0],random], 'basilisk', message),
          client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0],random], 'basilisk', message),
          client.strifecall.dungeonSpawn(client, sec, [roomCoor[0][0],random], 'basilisk', message),
        ],[lootcall.lootA(client, sec, dubs(8))]]]];
        bosscheck=true;
      }
    }
    break;
    case 1:
      while(!bosscheck){
      let random = Math.floor((Math.random() * 11))
      if(dungeon[random][roomCoor[0][1]][0]==0||dungeon[roomCoor[0][0]][random][0]==10){
        dungeon[random][roomCoor[0][1]] = [8,1,[[[],[],"BOSS ROOM",false,[
          client.strifecall.dungeonSpawn(client, sec, [random,roomCoor[0][1]], 'basilisk', message),
          client.strifecall.dungeonSpawn(client, sec, [random,roomCoor[0][1]], 'basilisk', message),
          client.strifecall.dungeonSpawn(client, sec, [random,roomCoor[0][1]], 'basilisk', message),
        ],[lootcall.lootA(client, sec, dubs(8))]]]];
        bosscheck=true;
      }
    }
    break;
  }
/*
[/][/][/]
[][][/]
[x][/][/]
*/
} else if(sec==3){
let emptyTiles=[];

let genDirection =["n","s","e","w"];
let pathStart = [[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]]];
let g = 0;
let denizen = false;
while(pathStart.length != 0){
console.log(pathStart);
let curx = pathStart[0][0];
let cury = pathStart[0][1];
let deleted = pathStart.splice(0,1);
let hitWall = false;
let curDirection;
if(g<4){
curDirection = genDirection[g];
g++;
} else {
curDirection = genDirection[Math.floor((Math.random()*4))];
}
while(!hitWall){
  //let hallLength = Math.floor((Math.random()*3))+1;
  switch (curDirection){
    case "n":
    for(m=0;m<2 && !hitWall;m++){
      if((--cury)<0){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[curx][0] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [curx,0], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }

      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  } if (Math.floor(Math.random()*2)==1 && g<4 &&!hitWall){
    pathStart.push([curx,cury]);
  }
   deleted = genDirection.splice(1,1);
    break;
    case "s":
    for(m=0;m<2 && !hitWall;m++){
      if((++cury)>10){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[curx][10] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [curx,10], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  } if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
    pathStart.push([curx,cury]);
  }
deleted = genDirection.splice(0,1);
    break;
    case "e":
    for(m=0;m<2 && !hitWall;m++){
      if((++curx)>10){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[10][cury] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [10,cury], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  }if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
      pathStart.push([curx,cury]);
    }
    deleted = genDirection.splice(3,1);
    break;
    case "w":
    for(m=0;m<2 && !hitWall;m++){
      if((--curx)<0){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[0][cury] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [0,cury], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  }if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
      pathStart.push([curx,cury]);
    }
    deleted = genDirection.splice(2,1);
    break;
  }
curDirection = genDirection[Math.floor((Math.random()*genDirection.length))];
genDirection =["n","s","e","w"];
}
}
if (denizen == false){
  roomToFill = emptyTiles.splice(Math.floor(Math.random()*emptyTiles.length)-1,1);
  dungeon [roomToFill[0][0]][roomToFill[0][1]] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
    client.strifecall.dungeonSpawn(client, sec, [roomToFill[0][0],roomToFill[0][1]], 'basilisk', message),],[lootcall.lootA(client, sec, dubs(8))]]]];
}
for (d=0;d<4;d++){
  roomToFill = emptyTiles.splice(Math.floor(Math.random()*emptyTiles.length)-1,1);
  dungeon [roomToFill[0][0]][roomToFill[0][1]] = [8,1,[[[],[],"DENIZEN MINION",false,[
    client.strifecall.dungeonSpawn(client, sec, [roomToFill[0][0],roomToFill[0][1]], 'basilisk', message),],[lootcall.lootA(client, sec, dubs(8))]]]];
}

} else if(sec=="m"){
let emptyTiles=[];

let genDirection =["n","s","e","w"];
let pathStart = [[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]],[roomCoor[0][0],roomCoor[0][1]]];
let g = 0;
let denizen = false;
while(pathStart.length != 0){
console.log(pathStart);
let curx = pathStart[0][0];
let cury = pathStart[0][1];
let deleted = pathStart.splice(0,1);
let hitWall = false;
let curDirection;
if(g<4){
curDirection = genDirection[g];
g++;
} else {
curDirection = genDirection[Math.floor((Math.random()*4))];
}
while(!hitWall){
  //let hallLength = Math.floor((Math.random()*3))+1;
  switch (curDirection){
    case "n":
    for(m=0;m<2 && !hitWall;m++){
      if((--cury)<0){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[curx][0] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [curx,0], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }

      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  } if (Math.floor(Math.random()*2)==1 && g<4 &&!hitWall){
    pathStart.push([curx,cury]);
  }
   deleted = genDirection.splice(1,1);
    break;
    case "s":
    for(m=0;m<2 && !hitWall;m++){
      if((++cury)>10){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[curx][10] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [curx,10], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  } if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
    pathStart.push([curx,cury]);
  }
deleted = genDirection.splice(0,1);
    break;
    case "e":
    for(m=0;m<2 && !hitWall;m++){
      if((++curx)>10){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[10][cury] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [10,cury], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  }if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
      pathStart.push([curx,cury]);
    }
    deleted = genDirection.splice(3,1);
    break;
    case "w":
    for(m=0;m<2 && !hitWall;m++){
      if((--curx)<0){
        hitWall=true;
        if(Math.floor(Math.random()*10)==0 && denizen == false){
          dungeon[0][cury] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
            client.strifecall.dungeonSpawn(client, sec, [0,cury], 'basilisk', message),
          ],[lootcall.lootA(client, sec, dubs(8))]]]];
          denizen=true;
        }
      } else {
        if(dungeon[curx][cury][0] == 7){
        dungeon[curx][cury] = dungeonRoomGen(client,sec);
        emptyTiles.push([curx,cury]);
      }
    }
  }if (Math.floor(Math.random()*2)==1 && g<4 && !hitWall){
      pathStart.push([curx,cury]);
    }
    deleted = genDirection.splice(2,1);
    break;
  }
curDirection = genDirection[Math.floor((Math.random()*genDirection.length))];
genDirection =["n","s","e","w"];
}
}
if (denizen == false){
  roomToFill = emptyTiles.splice(Math.floor(Math.random()*emptyTiles.length)-1,1);
  dungeon [roomToFill[0][0]][roomToFill[0][1]] = [9,1,[[[],[],"DENIZEN CHAMBER",false,[
    client.strifecall.dungeonSpawn(client, sec, [roomToFill[0][0],roomToFill[0][1]], 'basilisk', message),],[lootcall.lootA(client, sec, dubs(8))]]]];
}
for (d=0;d<4;d++){
  roomToFill = emptyTiles.splice(Math.floor(Math.random()*emptyTiles.length)-1,1);
  dungeon [roomToFill[0][0]][roomToFill[0][1]] = [8,1,[[[],[],"DENIZEN MINION",false,[
    client.strifecall.dungeonSpawn(client, sec, [roomToFill[0][0],roomToFill[0][1]], 'basilisk', message),],[lootcall.lootA(client, sec, dubs(8))]]]];
}

}

  return [dungeon,lv2,lv3];

}

function dungeonRoomGen(client,sec) {
  switch(Math.floor((Math.random() * 4))){

case 3:
return [10,1,[[[],[],"DUNGEON ROOM",false,[],[lootcall.lootB(client, sec, dubs(8))]]]];
break;
  default:
  return [10,1,[[[],[],"DUNGEON ROOM",false,[],[]]]];
  }

}


exports.moonGen = function(client,castleLocal,towerLocal,message){

  let section = [[],[],[],[],[],[],[],[],[],[]];
  for(i=0;i<11;i++){
//   prospit,derse,prospitmoon,dersemoon,pdungeon1,2,3,ddungeon1,2,3
    section[0].push([[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]]]);
    section[1].push([[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]]]);
    section[2].push([[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]],[10,1,[[[],[],"STREET",false,[],[]]]]]);
    section[3].push([[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]],[10,1,[[[],[],"ALLEYWAY",false,[],[]]]]]);

    section[4].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);
    section[5].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);
    section[6].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);

    section[7].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);
    section[8].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);
    section[9].push([[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]],[10,1,[[[],[],"CORRIDOR",false,[],[]]]]]);


  }

  let dungeon = [[],[],[],[]];
  for(i=0;i<11;i++){

    for(j=0;j<dungeon.length;j++){
      dungeon[j].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]])
    }
    /*
    dungeon[0].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]]);
    dungeon[1].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]]);
    dungeon[2].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]]);
    dungeon[3].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]]);*/
  }

  let castle = [[],[]];
  for(i=0;i<11;i++){

    for(j=0;j<castle.length;j++){
      castle[j].push([[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]  , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]] , [7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]],[7,1,[[[],[],"OUT OF BOUNDS",false,[],[]]]]])
    }
}



  //dungeon = dungeonGen(client,temp,sec,dungeon,message)[0];

  let select = [0,1,3,4,6,7,9,10]
  let empty = [];
  let empty2 = [];
  let empty3 = [];
  let empty4 = [];
  let empty5 = [];

  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty.push([select[i],select[j]]);
      empty2.push([select[i],select[j]]);
      empty3.push([select[i],select[j]]);
      empty4.push([select[i],select[j]]);
      empty5.push([select[i],select[j]]);
    }
  }
/*
  let empty2 = [];
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty2.push([select[i],select[j]]);
    }
  }

  let empty3 = [];
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty3.push([select[i],select[j]]);
    }
  }

  let empty4 = [];
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty4.push([select[i],select[j]]);
    }
  }

  let empty5 = [];
  for(i=0;i<8;i++){
    for(j=0;j<8;j++){
      empty5.push([select[i],select[j]]);
    }
  }
*/

  section[0][5][5]=[13,1,[[[],[],"CHAIN",false,[],[]]]];
  section[1][5][5]=[13,1,[[[],[],"CHAIN",false,[],[]]]];
  section[2][5][5]=[13,1,[[[],[],"CHAIN",false,[],[]]]];
  section[3][5][5]=[13,1,[[[],[],"CHAIN",false,[],[]]]];

  section[2][towerLocal[0]][towerLocal[1]]=[11,1,[[[],[],"PROSPIT TOWER BASE",true,[],[]]]];
  section[3][towerLocal[0]][towerLocal[1]]=[11,1,[[[],[],"DERSE TOWER BASE",true,[],[]]]];
  empty.splice(select.indexOf(towerLocal[0])*8+select.indexOf(towerLocal[1]),1);

  section[0][castleLocal[0]][castleLocal[1]]=[12,1,[[[],[],"PROSPIT CASTLE",true,[],[]]]];
  section[1][castleLocal[0]][castleLocal[1]]=[12,1,[[[],[],"DERSE CASTLE",true,[],[]]]];
  empty2.splice(select.indexOf(castleLocal[0])*8+select.indexOf(castleLocal[1]),1);
  let transLocal=[0,0];
  //castle generation
  castle[0][5][5]=[12,1,[[[],[],"CASTLE ENTRANCE",true,[],[]]]];
  castle[1][5][5]=[12,1,[[[],[],"CASTLE ENTRANCE",true,[],[]]]];

  castle[0][4][5]=[10,1,[[[],[],"HALL",true,[],[]]]];
  castle[0][3][5]=[8,1,[[[],[],"THRONE ROOM",true,[],[]]]];
  castle[0][5][4]=[19,1,[[[],[],"TRANSPORTALIZER HUB",true,[],[]]]];

  castle[1][4][5]=[10,1,[[[],[],"HALL",true,[],[]]]];
  castle[1][3][5]=[8,1,[[[],[],"THRONE ROOM",true,[],[]]]];
  castle[1][5][4]=[19,1,[[[],[],"TRANSPORTALIZER HUB",true,[],[]]]];

  transLocal=[5,4];
  //end castle generation

  section.push(castle[0]);
  section.push(castle[1]);
  section.push(transLocal);
//Prospit / Derse Main

for(i=0;i<2;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[14,1,[[[],[],"POLICE STATION",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[14,1,[[[],[],"POLICE STATION",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[16,1,[[[],[],"COURT",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[16,1,[[[],[],"COURT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[17,1,[[[],[],"HOSPITAL",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[17,1,[[[],[],"HOSPITAL",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[18,1,[[[],[],"BANK",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[18,1,[[[],[],"BANK",false,[],[]]]];
}
for(i=0;i<2;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[19,1,[[[],[],"POST OFFICE",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[19,1,[[[],[],"POST OFFICE",false,[],[]]]];
}
for(i=0;i<4;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[20,1,[[[],[],"MILITARY OUTPOST",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[20,1,[[[],[],"MILITARY OUTPOST",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[21,1,[[[],[],"GUILD HALL",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[21,1,[[[],[],"GUILD HALL",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[22,1,[[[],[],"THEATRE",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[22,1,[[[],[],"THEATRE",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[23,1,[[[],[],"BINGO HALL",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[23,1,[[[],[],"CASINO",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[24,1,[[[],[],"MUSEUM",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[24,1,[[[],[],"MUSEUM",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[25,1,[[[],[],"LIBRARY",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[25,1,[[[],[],"LIBRARY",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[26,1,[[[],[],"RESTAURANT",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[26,1,[[[],[],"RESTAURANT",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[27,1,[[[],[["CAPTCHALOGUE CARD","11111111",1,4,[]]],"GENERAL STORE",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[27,1,[[[],[["CAPTCHALOGUE CARD","11111111",1,4,[]]],"GENERAL STORE",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[28,1,[[[],[],"CANDY SHOP",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[29,1,[[[],[],"BUTCHER",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[31,1,[[[],[],"TAILOR",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[30,1,[[[],[],"ARMORY",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  section[0][temp[0][0]][temp[0][1]]=[32,1,[[[],[],"JEWELER",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[32,1,[[[],[],"JEWELER",false,[],[]]]];
}





while(empty2.length>0){
  let temp=empty2.splice(Math.floor(Math.random()*empty2.length)-1,1);

  let ran = Math.floor(Math.random()*6);

  if(ran == 0){
    section[0][temp[0][0]][temp[0][1]]=[0,1,[[[],[],"PUBLIC PARK",false,[],[]]]];
    section[1][temp[0][0]][temp[0][1]]=[0,1,[[[],[],"ABANDONED BUILDING",false,[],[]]]];
  } else {
  section[0][temp[0][0]][temp[0][1]]=[45,1,[[[],[],"APPARTMENT",false,[],[]]]];
  section[1][temp[0][0]][temp[0][1]]=[45,1,[[[],[],"SLUMS",false,[],[]]]];
}
}


for(i=0;i<2;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[14,1,[[[],[],"POLICE STATION",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[14,1,[[[],[],"POLICE STATION",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[17,1,[[[],[],"HOSPITAL",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[17,1,[[[],[],"HOSPITAL",false,[],[]]]];
}
for(i=0;i<2;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[19,1,[[[],[],"POST OFFICE",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[19,1,[[[],[],"POST OFFICE",false,[],[]]]];
}
for(i=0;i<4;i++){
  let tempRan = Math.floor(Math.random()*empty.length)-1;
  let temp=empty.splice(tempRan,1);

  section[2][temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DUNGEON ENTRANCE",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DUNGEON ENTRANCE",false,[],[]]]];
  section[4][temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DUNGEON EXIT",false,[],[]]]];
  section[7][temp[0][0]][temp[0][1]]=[1,1,[[[],[],"DUNGEON EXIT",false,[],[]]]];

  empty3.splice(empty3.findIndex(tile => tile[0] == temp[0][0] && tile[1] == temp[0][1]),1)
}
for(i=0;i<5;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[26,1,[[[],[],"RESTAURANT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[26,1,[[[],[],"RESTAURANT",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[27,1,[[[],[],"GENERAL STORE",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[27,1,[[[],[],"GENERAL STORE",false,[],[]]]];
}
for(i=0;i<5;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[32,1,[[[],[],"JEWELER",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[32,1,[[[],[],"JEWELER",false,[],[]]]];
}

for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[33,1,[[[],[],"TIME MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[33,1,[[[],[],"TIME MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[34,1,[[[],[],"SPACE MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[34,1,[[[],[],"SPACE MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[35,1,[[[],[],"LIGHT MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[35,1,[[[],[],"LIGHT MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[36,1,[[[],[],"VOID MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[36,1,[[[],[],"VOID MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[37,1,[[[],[],"LIFE MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[37,1,[[[],[],"LIFE MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[38,1,[[[],[],"DOOM MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[38,1,[[[],[],"DOOM MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[39,1,[[[],[],"BREATH MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[39,1,[[[],[],"BREATH MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[40,1,[[[],[],"BLOOD MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[40,1,[[[],[],"BLOOD MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[41,1,[[[],[],"HOPE MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[41,1,[[[],[],"HOPE MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[42,1,[[[],[],"RAGE MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[42,1,[[[],[],"RAGE MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[43,1,[[[],[],"MIND MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[43,1,[[[],[],"MIND MONUMENT",false,[],[]]]];
}
for(i=0;i<1;i++){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  section[2][temp[0][0]][temp[0][1]]=[44,1,[[[],[],"HEART MONUMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[44,1,[[[],[],"HEART MONUMENT",false,[],[]]]];
}

while(empty.length>0){
  let temp=empty.splice(Math.floor(Math.random()*empty.length)-1,1);

  let ran = Math.floor(Math.random()*6);

  if(ran == 0){
    section[2][temp[0][0]][temp[0][1]]=[0,1,[[[],[],"PUBLIC PARK",false,[],[]]]];
    section[3][temp[0][0]][temp[0][1]]=[0,1,[[[],[],"ABANDONED BUILDING",false,[],[]]]];
  } else {
  section[2][temp[0][0]][temp[0][1]]=[45,1,[[[],[],"APPARTMENT",false,[],[]]]];
  section[3][temp[0][0]][temp[0][1]]=[45,1,[[[],[],"SLUMS",false,[],[]]]];
}
}

  for(i=0;i<3;i++){
    let tempRan = Math.floor(Math.random()*empty3.length)-1;
    let temp=empty3.splice(tempRan,1);

    section[4][temp[0][0]][temp[0][1]]=[46,1,[[[],[],"DESCENDING STAIRS",false,[],[]]]];
    section[7][temp[0][0]][temp[0][1]]=[46,1,[[[],[],"DESCENDING STAIRS",false,[],[]]]];
    section[5][temp[0][0]][temp[0][1]]=[47,1,[[[],[],"ASCENDING STAIRS",false,[],[]]]];
    section[8][temp[0][0]][temp[0][1]]=[47,1,[[[],[],"ASCENDING STAIRS",false,[],[]]]];

    empty4.splice(empty4.findIndex(tile => tile[0] == temp[0][0] && tile[1] == temp[0][1]),1)
  }

  for(i=0;i<2;i++){
    let tempRan = Math.floor(Math.random()*empty4.length)-1;
    let temp=empty4.splice(tempRan,1);

    section[5][temp[0][0]][temp[0][1]]=[46,1,[[[],[],"DOWNSTAIRS ENTRANCE",false,[],[]]]];
    section[8][temp[0][0]][temp[0][1]]=[46,1,[[[],[],"DOWNSTAIRS ENTRANCE",false,[],[]]]];
    section[6][temp[0][0]][temp[0][1]]=[47,1,[[[],[],"ASCENDING STAIRS",false,[],[]]]];
    section[9][temp[0][0]][temp[0][1]]=[47,1,[[[],[],"ASCENDING STAIRS",false,[],[]]]];

    empty5.splice(empty5.findIndex(tile => tile[0] == temp[0][0] && tile[1] == temp[0][1]),1)
  }

  while(empty3.length>0){
    let temp=empty3.splice(Math.floor(Math.random()*empty3.length)-1,1);
    section[4][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
    section[7][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
  }
  while(empty4.length>0){
    let temp=empty4.splice(Math.floor(Math.random()*empty4.length)-1,1);
    section[5][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
    section[8][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
  }
  while(empty5.length>0){
    let temp=empty5.splice(Math.floor(Math.random()*empty5.length)-1,1);
    section[6][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
    section[9][temp[0][0]][temp[0][1]]=[15,1,[[[],[],"PRISON CELL",false,[],[]]]];
  }

  return section;
}




exports.drawMap = async function(client,message,mini) {

  let charid = client.playerMap.get(message.guild.id.concat(message.author.id),"control");
let local = client.playerMap.get(charid,`local`);
let input = client.landMap.get(local[4],local[0]);
let aspect;

try {
  aspect = client.landMap.get(local[4],"aspect");
  if(aspect = `undefined`){
    aspect = "BREATH";
  }
} catch(err){
  aspect = "BREATH";
}
//loading all of the images I need. This might be stupid inefficent, but I need to at least see what it looks like at it's worst.
const ax = await client.Canvas.loadImage(`./MAP/x.png`);
const ax0 = await client.Canvas.loadImage(`./MAP/0.png`);
const ax1 = await client.Canvas.loadImage(`./MAP/1.png`);
const ax2 = await client.Canvas.loadImage(`./MAP/2.png`);
const ax3 = await client.Canvas.loadImage(`./MAP/3.png`);
const ax4 = await client.Canvas.loadImage(`./MAP/4.png`);
const ax5 = await client.Canvas.loadImage(`./MAP/5.png`);
const ax6 = await client.Canvas.loadImage(`./MAP/6.png`);
const ax7 = await client.Canvas.loadImage(`./MAP/7.png`);
const ax8 = await client.Canvas.loadImage(`./MAP/8.png`);
const ax9 = await client.Canvas.loadImage(`./MAP/9.png`);
const ax10 = await client.Canvas.loadImage(`./MAP/10.png`);
const blank = await client.Canvas.loadImage(`./MAP/BLANK.png`);
const plblank = await client.Canvas.loadImage(`./MAP/PLBLANK.png`);
const fog = await client.Canvas.loadImage(`./MAP/FOGBLANK.png`);
const player = await client.Canvas.loadImage(`./MAP/PLAYER.png`);
const plplayer = await client.Canvas.loadImage(`./MAP/PLPLAYER.png`);
const playerf = await client.Canvas.loadImage(`./MAP/PLAYERF.png`);
const dungeon = await client.Canvas.loadImage(`./MAP/DUNGEON.png`);
const pldungeon = await client.Canvas.loadImage(`./MAP/PLDUNGEON.png`);
const dungeonf = await client.Canvas.loadImage(`./MAP/DUNGEONF.png`);
const village = await client.Canvas.loadImage(`./MAP/VILLAGE.png`);
const plvillage = await client.Canvas.loadImage(`./MAP/PLVILLAGE.png`);
const villagef = await client.Canvas.loadImage(`./MAP/VILLAGEF.png`);
const maspect = await client.Canvas.loadImage(`./MAP/${aspect}.png`);
const plaspect = await client.Canvas.loadImage(`./MAP/PL${aspect}.png`);
const aspectf = await client.Canvas.loadImage(`./MAP/${aspect}F.png`);
const node = await client.Canvas.loadImage(`./MAP/NODE.png`);
const plnode = await client.Canvas.loadImage(`./MAP/PLNODE.png`);
const nodef = await client.Canvas.loadImage(`./MAP/NODEF.png`);
const gate = await client.Canvas.loadImage(`./MAP/GATE.gif`);
const plgate = await client.Canvas.loadImage(`./MAP/PLGATE.gif`);
const drgate = await client.Canvas.loadImage(`./MAP/DRGATE.gif`);
const boss = await client.Canvas.loadImage(`./MAP/BOSS.png`);
const plboss = await client.Canvas.loadImage(`./MAP/BOSSPL.png`);
const bossf = await client.Canvas.loadImage(`./MAP/BOSSFOG.png`);
const denizen = await client.Canvas.loadImage(`./MAP/DENIZEN.png`);
const pldenizen = await client.Canvas.loadImage(`./MAP/DENIZENPL.png`);
const denizenf = await client.Canvas.loadImage(`./MAP/DENIZENFOG.png`);
const darkblank = await client.Canvas.loadImage(`./MAP/DARKBLANK.png`);

const plprison = await client.Canvas.loadImage(`./MAP/PLPRISON.png`);
const prison = await client.Canvas.loadImage(`./MAP/PRISON.png`);
const plbank = await client.Canvas.loadImage(`./MAP/PLBANK.png`);
const bank = await client.Canvas.loadImage(`./MAP/BANK.png`);
const pllibrary = await client.Canvas.loadImage(`./MAP/PLLIBRARY.png`);
const library = await client.Canvas.loadImage(`./MAP/LIBRARY.png`);
const plpolice = await client.Canvas.loadImage(`./MAP/PLPOLICE.png`);
const police = await client.Canvas.loadImage(`./MAP/POLICE.png`);
const plpostal = await client.Canvas.loadImage(`./MAP/PLPOSTAL.png`);
const postal = await client.Canvas.loadImage(`./MAP/POSTAL.png`);
const plcasino = await client.Canvas.loadImage(`./MAP/PLCASINO.png`);
const casino = await client.Canvas.loadImage(`./MAP/CASINO.png`);
const plstore = await client.Canvas.loadImage(`./MAP/PLSTORE.png`);
const store = await client.Canvas.loadImage(`./MAP/STORE.png`);
const plrestaurant = await client.Canvas.loadImage(`./MAP/PLRESTAURANT.png`);
const restaurant = await client.Canvas.loadImage(`./MAP/RESTAURANT.png`);
const pltheatre = await client.Canvas.loadImage(`./MAP/PLTHEATRE.png`);
const theatre = await client.Canvas.loadImage(`./MAP/THEATRE.png`);
const plarmory = await client.Canvas.loadImage(`./MAP/PLARMORY.png`);
const armory = await client.Canvas.loadImage(`./MAP/ARMORY.png`);
const plhaberdashery = await client.Canvas.loadImage(`./MAP/PLHABERDASHERY.png`);
const haberdashery = await client.Canvas.loadImage(`./MAP/HABERDASHERY.png`);
const plcandyshop = await client.Canvas.loadImage(`./MAP/PLCANDYSHOP.png`);
const candyshop = await client.Canvas.loadImage(`./MAP/CANDYSHOP.png`);
const plbutcher = await client.Canvas.loadImage(`./MAP/PLBUTCHER.png`);
const butcher = await client.Canvas.loadImage(`./MAP/BUTCHER.png`);
const plcourt = await client.Canvas.loadImage(`./MAP/PLCOURT.png`);
const court = await client.Canvas.loadImage(`./MAP/COURT.png`);
const plappartment = await client.Canvas.loadImage(`./MAP/PLAPPARTMENT.png`);
const appartment = await client.Canvas.loadImage(`./MAP/APPARTMENT.png`);
const plroad = await client.Canvas.loadImage(`./MAP/PLROAD.png`);
const road = await client.Canvas.loadImage(`./MAP/ROAD.png`);
const chain = await client.Canvas.loadImage(`./MAP/CHAIN.png`);
const plchain = await client.Canvas.loadImage(`./MAP/PLCHAIN.png`);
const tower = await client.Canvas.loadImage(`./MAP/TOWERS.png`);
const pltower = await client.Canvas.loadImage(`./MAP/PLTOWERS.png`);
const castle = await client.Canvas.loadImage(`./MAP/CASTLE.png`);
const plcastle = await client.Canvas.loadImage(`./MAP/PLCASTLE.png`);

const time = await client.Canvas.loadImage(`./MAP/TIME.png`);
const pltime = await client.Canvas.loadImage(`./MAP/PLTIME.png`);
const space = await client.Canvas.loadImage(`./MAP/SPACE.png`);
const plspace = await client.Canvas.loadImage(`./MAP/PLSPACE.png`);
const light = await client.Canvas.loadImage(`./MAP/LIGHT.png`);
const pllight = await client.Canvas.loadImage(`./MAP/PLLIGHT.png`);
const mvoid = await client.Canvas.loadImage(`./MAP/VOID.png`);
const plvoid = await client.Canvas.loadImage(`./MAP/PLVOID.png`);
const life = await client.Canvas.loadImage(`./MAP/LIFE.png`);
const pllife = await client.Canvas.loadImage(`./MAP/PLLIFE.png`);
const doom = await client.Canvas.loadImage(`./MAP/DOOM.png`);
const pldoom = await client.Canvas.loadImage(`./MAP/PLDOOM.png`);
const breath = await client.Canvas.loadImage(`./MAP/BREATH.png`);
const plbreath = await client.Canvas.loadImage(`./MAP/PLBREATH.png`);
const blood = await client.Canvas.loadImage(`./MAP/BLOOD.png`);
const plblood = await client.Canvas.loadImage(`./MAP/PLBLOOD.png`);
const hope = await client.Canvas.loadImage(`./MAP/HOPE.png`);
const plhope = await client.Canvas.loadImage(`./MAP/PLHOPE.png`);
const rage = await client.Canvas.loadImage(`./MAP/RAGE.png`);
const plrage = await client.Canvas.loadImage(`./MAP/PLRAGE.png`);
const mind = await client.Canvas.loadImage(`./MAP/MIND.png`);
const plmind = await client.Canvas.loadImage(`./MAP/PLMIND.png`);
const heart = await client.Canvas.loadImage(`./MAP/HEART.png`);
const plheart = await client.Canvas.loadImage(`./MAP/PLHEART.png`);
const museum = await client.Canvas.loadImage(`./MAP/MUSEUM.png`);
const plmuseum = await client.Canvas.loadImage(`./MAP/PLMUSEUM.png`);
const hospital = await client.Canvas.loadImage(`./MAP/HOSPITAL.png`);
const plhospital = await client.Canvas.loadImage(`./MAP/PLHOSPITAL.png`);
const guild = await client.Canvas.loadImage(`./MAP/GUILD.png`);
const plguild = await client.Canvas.loadImage(`./MAP/PLGUILD.png`);
const jeweler = await client.Canvas.loadImage(`./MAP/JEWELER.png`);
const pljeweler = await client.Canvas.loadImage(`./MAP/PLJEWELER.png`);
const military = await client.Canvas.loadImage(`./MAP/MILITARY.png`);
const plmilitary = await client.Canvas.loadImage(`./MAP/PLMILITARY.png`);
const ascend = await client.Canvas.loadImage(`./MAP/ASCEND.png`);
const plascend = await client.Canvas.loadImage(`./MAP/PLASCEND.png`);
const fascend = await client.Canvas.loadImage(`./MAP/FASCEND.png`);
const descend = await client.Canvas.loadImage(`./MAP/DESCEND.png`);
const pldescend = await client.Canvas.loadImage(`./MAP/PLDESCEND.png`);
const fdescend = await client.Canvas.loadImage(`./MAP/FDESCEND.png`);
const froad = await client.Canvas.loadImage(`./MAP/FOGROAD.png`);
const fprison = await client.Canvas.loadImage(`./MAP/FOGPRISON.png`);
let legend = [ax,ax0,ax1,ax2,ax3,ax4,ax5,ax6,ax7,ax8,ax9,ax10,blank,plblank,fog,player,plplayer,playerf,dungeon,pldungeon,dungeonf,village,plvillage,villagef,maspect,plaspect,aspectf,node,plnode,nodef,gate,plgate,drgate,boss,plboss,bossf,denizen,pldenizen,denizenf,prison,plprison,fprison,bank,plbank,library,pllibrary,police,plpolice,postal,plpostal,casino,plcasino,store,plstore,restaurant,plrestaurant,theatre,pltheatre,armory,plarmory,haberdashery,plhaberdashery,candyshop,plcandyshop,butcher,plbutcher,court,plcourt,appartment,plappartment,road,plroad,froad,chain,plchain,tower,pltower,castle,plcastle,time,pltime,space,plspace,light,pllight,mvoid,plvoid,life,pllife,doom,pldoom,breath,plbreath,blood,plblood,hope,plhope,rage,plrage,mind,plmind,heart,plheart,museum,plmuseum,hospital,plhospital,guild,plguild,jeweler,pljeweler,military,plmilitary,ascend,plascend,fascend,descend,pldescend,fdescend];
if(!mini){
const canvas = client.Canvas.createCanvas(404,424);
const ctx = canvas.getContext('2d');
const background = await client.Canvas.loadImage('./background.jpg');
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#3e3e3e';
ctx.lineWidth = 10;
ctx.strokeRect(0, 0, canvas.width, canvas.height);
 //landcall.landGen(client,0,[5,5]);
/*
section[gate[0][0]][gate[0][1]]=defaultGate;
*/

let sectionTitleImg = await client.Canvas.loadImage(`./MAP/SECTION 1.png`);
  switch(local[0]){
    case "s2":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/SECTION 2.png`);
    break;
    case "s3":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/SECTION 3.png`);
    break;
    case "s4":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/SECTION 4.png`);
    break;
    case "s1d":
    case "s2d":
    case "s3d":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/DUNGEONTITLE.png`);
    break;
    case "s4d":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/DENIZENLAIRTITLE.png`);
    break;
    case "p":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/PR.png`);
    break;
    case "pm":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/PROSPIT_MOON.png`);
    break;
    case "d":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/DERSE.png`);
    break;
    case "dm":
    sectionTitleImg = await client.Canvas.loadImage(`./MAP/DERSE_MOON.png`);
    break;
  }

ctx.drawImage(sectionTitleImg,5,5,394,32);


 for(k=0;k<12;k++){
   ctx.drawImage(legend[k],5+(32.8*k),37,32.8,32.8);
}
for(i=0;i<11;i++){
  ctx.drawImage(legend[i+1],5,5+(32*(i+2)),32.8,31);
    for(j=0;j<11;j++){
            //comment out this if check to turn off fog of war on the main map
      if(!input[i][j][2][0][3]&&local[0]!="p"&&local[0]!="d"&&local[0]!="pm"&&local[0]!="dm"&&local[0]!="pc"&&local[0]!="dc"){
          ctx.drawImage(fog,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);

      } else {
        let tile = 0;
        if(i==local[1]&& j==local[2]){
          tile = 1;
        }
       //str=`${client.emojis.cache.get("760188336245309512")}`;
       switch(input[i][j][0]){
         case 0:
         let player = false;
         if(input[i][j][2][0][4].length > 0){
         for(k=0;k<input[i][j][2][0][4].length;k++){
           if(input[i][j][2][0][4][k][0]&& input[i][j][2][0][4][k][1]!=charid){
             player=true;
           }
         }}
         if(player){

           ctx.drawImage(legend[15+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         } else {

           ctx.drawImage(legend[12+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         }
         break;
         case 1:
           ctx.drawImage(legend[18+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         break;
         case 2:
          ctx.drawImage(legend[24+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         break;
         case 3:
           ctx.drawImage(legend[27+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         break;
         case 4:
           ctx.drawImage(legend[21+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         break;
         case 6:
           ctx.drawImage(legend[30+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
         break;
         case 7:
          ctx.drawImage(darkblank,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 8:
            ctx.drawImage(legend[33+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 9:
            ctx.drawImage(legend[36+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 10:
          ctx.drawImage(legend[legend.indexOf(road)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 11:
          ctx.drawImage(legend[legend.indexOf(tower)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 12:
          ctx.drawImage(legend[legend.indexOf(castle)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 13:
          ctx.drawImage(legend[legend.indexOf(chain)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 14:
          ctx.drawImage(legend[legend.indexOf(police)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 15:
          ctx.drawImage(legend[legend.indexOf(prison)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 16:
          ctx.drawImage(legend[legend.indexOf(court)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 17:
          ctx.drawImage(legend[legend.indexOf(hospital)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 18:
          ctx.drawImage(legend[legend.indexOf(bank)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 19:
          ctx.drawImage(legend[legend.indexOf(postal)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 20:
          ctx.drawImage(legend[legend.indexOf(military)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 21:
          ctx.drawImage(legend[legend.indexOf(guild)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 22:
          ctx.drawImage(legend[legend.indexOf(theatre)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 23:
          ctx.drawImage(legend[legend.indexOf(casino)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 24:
          ctx.drawImage(legend[legend.indexOf(museum)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 25:
          ctx.drawImage(legend[legend.indexOf(library)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 26:
          ctx.drawImage(legend[legend.indexOf(restaurant)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 27:
          ctx.drawImage(legend[legend.indexOf(store)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 28:
          ctx.drawImage(legend[legend.indexOf(candyshop)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 29:
          ctx.drawImage(legend[legend.indexOf(butcher)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 30:
          ctx.drawImage(legend[legend.indexOf(armory)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 31:
          ctx.drawImage(legend[legend.indexOf(haberdashery)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 32:
          ctx.drawImage(legend[legend.indexOf(jeweler)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 33:
          ctx.drawImage(legend[legend.indexOf(time)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 34:
          ctx.drawImage(legend[legend.indexOf(space)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 35:
          ctx.drawImage(legend[legend.indexOf(light)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 36:
          ctx.drawImage(legend[legend.indexOf(mvoid)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 37:
          ctx.drawImage(legend[legend.indexOf(life)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 38:
          ctx.drawImage(legend[legend.indexOf(doom)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 39:
          ctx.drawImage(legend[legend.indexOf(breath)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 40:
          ctx.drawImage(legend[legend.indexOf(blood)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 41:
          ctx.drawImage(legend[legend.indexOf(hope)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 42:
          ctx.drawImage(legend[legend.indexOf(rage)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 43:
          ctx.drawImage(legend[legend.indexOf(mind)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 44:
          ctx.drawImage(legend[legend.indexOf(heart)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 45:
          ctx.drawImage(legend[legend.indexOf(appartment)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 46:
          ctx.drawImage(legend[legend.indexOf(descend)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;
          case 47:
          ctx.drawImage(legend[legend.indexOf(ascend)+tile],5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
          break;

         default:
           ctx.drawImage(ax,5+(32.8*(j+1)),5+(32*(i+2)),32.8,31);
       }
    }
  }
}

let attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'landmap.png');
message.channel.send(attachment);
} else {

const canvas = client.Canvas.createCanvas(192,192);
const ctx = canvas.getContext('2d');

for(i=-1;i<2;i++){
  for (j=-1;j<2;j++){
    let tile = 0;
     if(j + local[2] > 10 || j + local[2] < 0 || i +local[1] > 10 || i + local[1] <0){
    ctx.drawImage(darkblank,(64*(j+1)),(64*(i+1)),64,64);
    } else {
      if(i==0 && j==0){
        tile = 1;
      } else if(!input[i+local[1]][j+local[2]][2][0][3]&&local[0]!="p"&&local[0]!="d"&&local[0]!="pm"&&local[0]!="dm"){
        tile = 2;
      //} else if(i==local[1]&& j==local[2]){
      }
      switch(input[i+local[1]][j+local[2]][0]){
        case 0:
        let player = false;

        if(input[i+local[1]][j+local[2]][2][0][4].length > 0){
        for(k=0;k<input[i+local[1]][j+local[2]][2][0][4].length;k++){
          if(input[i+local[1]][j+local[2]][2][0][4][k][0] && input[i+local[1]][j+local[2]][2][0][4][k][1]!=charid){
            player=true;
          }
        }}
        if(player){

          ctx.drawImage(legend[15+tile],(64*(j+1)),(64*(i+1)),64,64);
        } else {

          ctx.drawImage(legend[12+tile],(64*(j+1)),(64*(i+1)),64,64);
        }
        break;
        case 1:
          ctx.drawImage(legend[18+tile],(64*(j+1)),(64*(i+1)),64,64);
        break;
        case 2:
         ctx.drawImage(legend[24+tile],(64*(j+1)),(64*(i+1)),64,64);
        break;
        case 3:
          ctx.drawImage(legend[27+tile],(64*(j+1)),(64*(i+1)),64,64);
        break;
        case 4:
          ctx.drawImage(legend[21+tile],(64*(j+1)),(64*(i+1)),64,64);
        break;
        case 6:
          ctx.drawImage(legend[30+tile],(64*(j+1)),(64*(i+1)),64,64);
        break;
        case 7:
         ctx.drawImage(darkblank,(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 8:
           ctx.drawImage(legend[33+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 9:
           ctx.drawImage(legend[36+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 10:
         ctx.drawImage(legend[legend.indexOf(road)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 11:
         ctx.drawImage(legend[legend.indexOf(tower)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 12:
         ctx.drawImage(legend[legend.indexOf(castle)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 13:
         ctx.drawImage(legend[legend.indexOf(chain)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 14:
         ctx.drawImage(legend[legend.indexOf(police)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 15:
         ctx.drawImage(legend[legend.indexOf(prison)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 16:
         ctx.drawImage(legend[legend.indexOf(court)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 17:
         ctx.drawImage(legend[legend.indexOf(hospital)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 18:
         ctx.drawImage(legend[legend.indexOf(bank)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 19:
         ctx.drawImage(legend[legend.indexOf(postal)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 20:
         ctx.drawImage(legend[legend.indexOf(military)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 21:
         ctx.drawImage(legend[legend.indexOf(guild)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 22:
         ctx.drawImage(legend[legend.indexOf(theatre)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 23:
         ctx.drawImage(legend[legend.indexOf(casino)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 24:
         ctx.drawImage(legend[legend.indexOf(museum)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 25:
         ctx.drawImage(legend[legend.indexOf(library)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 26:
         ctx.drawImage(legend[legend.indexOf(restaurant)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 27:
         ctx.drawImage(legend[legend.indexOf(store)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 28:
         ctx.drawImage(legend[legend.indexOf(candyshop)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 29:
         ctx.drawImage(legend[legend.indexOf(butcher)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 30:
         ctx.drawImage(legend[legend.indexOf(armory)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 31:
         ctx.drawImage(legend[legend.indexOf(haberdashery)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 32:
         ctx.drawImage(legend[legend.indexOf(jeweler)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 33:
         ctx.drawImage(legend[legend.indexOf(time)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 34:
         ctx.drawImage(legend[legend.indexOf(space)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 35:
         ctx.drawImage(legend[legend.indexOf(light)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 36:
         ctx.drawImage(legend[legend.indexOf(mvoid)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 37:
         ctx.drawImage(legend[legend.indexOf(life)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 38:
         ctx.drawImage(legend[legend.indexOf(doom)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 39:
         ctx.drawImage(legend[legend.indexOf(breath)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 40:
         ctx.drawImage(legend[legend.indexOf(blood)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 41:
         ctx.drawImage(legend[legend.indexOf(hope)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 42:
         ctx.drawImage(legend[legend.indexOf(rage)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 43:
         ctx.drawImage(legend[legend.indexOf(mind)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 44:
         ctx.drawImage(legend[legend.indexOf(heart)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 45:
         ctx.drawImage(legend[legend.indexOf(appartment)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 46:
         ctx.drawImage(legend[legend.indexOf(descend)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         case 47:
         ctx.drawImage(legend[legend.indexOf(ascend)+tile],(64*(j+1)),(64*(i+1)),64,64);
         break;
         default:
           ctx.drawImage(ax,(64*(j+1)),(64*(i+1)),64,64);
      }
    }
  }
  }
  attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'landmap.png');
  message.channel.send(attachment);
return;
}
}

exports.underlingCheck = function(occList) {
  check = false;
  if(occList.length>0){
    for(i=0;i<occList.length;i++){
      if(occList[i][0]==false){
        check=true;
      }
    }
  }

  return check;
}

exports.carSpawn = function(client,local,lunar,sessionID){

  let picList = [["https://media.discordapp.net/attachments/808757312520585227/814739963824439296/dersite_short.png","https://media.discordapp.net/attachments/808757312520585227/814739982748221480/dersite_normal.png","https://media.discordapp.net/attachments/808757312520585227/814740004618240050/dersite_tall.png","https://media.discordapp.net/attachments/808757312520585227/814740019902021652/dersite_beefy.png"],["https://media.discordapp.net/attachments/808757312520585227/814740073681518612/prospitian_short.png","https://media.discordapp.net/attachments/808757312520585227/814740091306115112/prospitian_normal.png","https://media.discordapp.net/attachments/808757312520585227/814740144933830666/prospitian_tall.png","https://media.discordapp.net/attachments/808757312520585227/814740171705548861/prospitian_beefy.png"]];
  let typeList = ["stout carapacian","medium carapacian","tall carapacian","large carapacian"];
  let lunarList = [["derse","prospit"],["dersite","prospitian"]];
  let repList = [[1000000,-1000000],[-1000000,1000000]]

  let num = Math.floor(Math.random()*4);

  let npcCount = client.landMap.get(sessionID+"medium","npcCount");

  let occ = []

  for(i=0;i<num;i++){

    npcCount++;

  let type = Math.floor(Math.random()*4);

  let npcSet = {
    name: `${lunarList[1][lunar]}`,
    possess:[],
    type: typeList[type],
    faction: lunarList[0][lunar],
    vit:client.underlings[typeList[type]].vit,
    gel:client.underlings[typeList[type]].vit,
    grist: "diamond",
    strife:false,
    pos:0,
    alive:true,
    local:local,
    sdex:[],
    equip:0,
    trinket:[],
    armor:[],
    spec:[],
    equip:0,
    scards:1,
    kinds:[],
    port:1,
    modus:"STACK",
    cards:4,
    prototype:[],
    prospitRep:repList[lunar][1],
    derseRep:repList[lunar][0],
    underlingRep:0,
    playerRep:0,
    consortRep:0,
    prefTarg:[],
    xp:0,
    rung:0,
    b:0,
    bio:`A ${lunarList[1][lunar]} ${typeList[type]}`,
    img:picList[lunar][type]
  }

  let id = `n${sessionID}/${npcCount}`;

  client.playerMap.set(id,npcSet);

  let occSet = [false,id];

  occ.push(occSet)
}
client.landMap.set(sessionID+"medium",npcCount,"npcCount");
return occ;
}
