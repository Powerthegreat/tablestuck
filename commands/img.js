
 exports.run = async function(client, message, args){
if(!args[0]){
  message.channel.send("Please include the text you want to display in this image!");
  return;
}
let msg=``;
for(i=0;args[i];i++){
  msg+=`${args[i]} `;
}
client.Canvas.registerFont("./miscsprites/fontstuck.ttf",{family:`FONTSTUCK`});
const canvas = client.Canvas.createCanvas(230,50);
	const ctx = canvas.getContext('2d');
  function applyText(canvas, msg, width){
  let fontsize = 24
  ctx.font = `bold ${fontsize}px FONTSTUCK`;
     while (ctx.measureText(msg).width > width){
  ctx.font = `bold ${fontsize -= 2}px FONTSTUCK`;
  }
    return ctx.font;
  }
  ctx.textBaseline = "middle";
  ctx.font = applyText(canvas,msg,220);
  ctx.lineWidth = 10;
let tempcolor;
  switch(msg.substring(0,2)){
    case `no`:
    tempcolor= `#6D6D6D`;
    break;
    case `ac`:
    tempcolor=  `#6688FE`;
    break;
    case `ar`:
    tempcolor= `#9B38F4`;
    break;
    case `as`:
    tempcolor=  `#ffae00`;
    break;
    case `ab`:
    tempcolor=  `#ffe91f`;
    break;
    default:
    tempcolor= `#6D6D6D`;
}
ctx.fillStyle = "#ffffff";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle = tempcolor;
ctx.strokeRect(0,0,canvas.width,canvas.height);


ctx.fillStyle = tempcolor;
ctx.fillText(msg.toUpperCase(),10,28);

const attachment = new client.Discord.MessageAttachment(canvas.toBuffer(), 'weaponattack.png');
message.channel.send(attachment);
return;
}
