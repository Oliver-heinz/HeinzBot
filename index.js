const Discord = require('discord.js');
const client = new Discord.Client();

// 토큰 주소 1 (서버용)
  const token = process.argv.length == 2 ? process.env.token : "";
//
// 토큰 주소 2 (테스트용)
//const token = 'NzMyMjY5MzQzNTM0MjE5MzM0.Xwyvew.K94apE-V6s2zTwSDQ8fAw6gul_M';


const welcomeChannelName = "💬자유채팅";
const welcomeChannelComment = "님 어서오세요.";

//const byeChannelName = "💬자유채팅";
//const byeChannelComment = "님 안녕히 가세요.";

client.on('ready', () => {
  console.log('[HEINZ] 봇이 실행되었습니다.');
  client.user.setPresence({ game: { name: 'Heinz' }, status: 'online' })
});


client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "유저"));
});

/*
client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});
*/

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '!help' || message.content == '!도움말' || message.content == '!명령어') {
    let img = 'https://cdn.discordapp.com/avatars/732269343534219334/b0f63348500ff956cf64bc7662d8c63d.png?size=128';
    let embed = new Discord.RichEmbed()
      .setAuthor('하인즈 도움말', img)
      .setThumbnail(img)
      .addField('!<help>,<도움말>,<명령어>', 'Heinz 봇의 명령어를 출력합니다.')
      .addField('!<서버상태>', '실시간으로 서버 상태를 불러옵니다.')
      .addField('!<도메인>', '현재 사용중인 도메인 정보를 알려드립니다.')
      .addField('!<배율정보>', '현재 설정 되어있는 서버 배율 정보를 불러옵니다.')
      .addBlankField()
      .setTimestamp()
      .setFooter('Heinz', img)

    message.channel.send(embed)
  } else if(message.content == '!서버상태') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '온/오프 :', desc: 'ON'},
      {name: '서버상태 :', desc: '쾌적'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('하인즈 서버상태', helpImg)
      .setColor('#186de6')
      .setFooter(`Heinz`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Server: ', commandStr);

    message.channel.send(embed)


  } else if(message.content == '!배율정보') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let commandList = [
      {name: '경험치 :', desc: '1000배'},
      {name: '메소 :', desc: '50배'},
      {name: '드랍률 :', desc: '1배'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('하인즈 배율정보', helpImg)
      .setColor('#186de6')
      .setFooter(`Heinz`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Server: ', commandStr);

    message.channel.send(embed)


  } else if(message.content == '!도메인') {
    let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let embed = new Discord.RichEmbed()
      .setAuthor('하인즈 도메인', helpImg)
      .setColor('#186de6')
      .setFooter(`Heinz`)
      .setTimestamp()
    
    embed.addField('http://하인즈.com','※ 블라인드시 도메인이 변경될수있음');

    message.channel.send(embed)


  } else if(message.content.startsWith('!공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!공지'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('Heinz')
        .setColor('#186de6')
        .setFooter(`Heinz`)
        .setTimestamp()
  
      embed.addField('공지: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!공지2')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!공지2'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);