const STORY = {
  start: {
    chapter:"CAPÍTULO I", location:"A CIDADE SEM NOME", symbol:"◈",
    title:"O homem que acordou sem nome",
    text:[
      "Você acorda em uma praça que não reconhece. Não sabe de onde veio. Não sabe seu nome.",
      "Ao redor, centenas de pessoas caminham em silêncio. Todas seguem a mesma direção. Ninguém parece perguntar para onde está indo.",
      "Um velho sentado junto a uma fonte observa você.",
      "“A primeira escolha é simples”, ele diz. “Você pode descobrir quem é… ou pode deixar que o mundo decida por você.”"
    ],
    choices:[
      {label:"Perguntar ao velho quem sou.", effect:{reason:1,autonomy:1}, next:"oldman"},
      {label:"Seguir a multidão.", effect:{will:1}, next:"crowd"},
      {label:"Ignorar todos e explorar a praça.", effect:{courage:1,autonomy:1}, next:"explore"}
    ]
  },

  oldman:{
    chapter:"CAPÍTULO I", location:"A FONTE", symbol:"☉", title:"O espelho",
    text:[
      "O velho tira um pequeno espelho do bolso e entrega a você.",
      "“Eu poderia lhe dizer quem você é. Mas então essa resposta seria minha, não sua.”",
      "No reflexo, você percebe algo estranho: seu rosto muda conforme você pensa em uma resposta.",
      "“Identidade é descoberta ou construção?”"
    ],
    choices:[
      {label:"Acredito que exista um eu verdadeiro para descobrir.", effect:{reason:1,will:1}, item:"Espelho", next:"cave"},
      {label:"Acredito que eu me torno aquilo que escolho.", effect:{autonomy:2}, next:"cave"},
      {label:"Talvez não exista um eu verdadeiro.", effect:{reason:2}, next:"cave"}
    ]
  },

  crowd:{
    chapter:"CAPÍTULO I", location:"A AVENIDA", symbol:"∞", title:"O caminho pronto",
    text:[
      "Você segue a multidão. Ninguém manda que você continue. Mesmo assim, seus pés continuam.",
      "Depois de alguns minutos, percebe que todos carregam uma pequena placa no peito.",
      "Na sua está escrito: “ACEITÁVEL”.",
      "Uma mulher ao lado pergunta: “Você escolheu isso?”"
    ],
    choices:[
      {label:"Sim. Se estou aqui, devo ter escolhido.", effect:{will:1}, next:"conform"},
      {label:"Não. Apenas continuei andando.", effect:{autonomy:2}, next:"cave"},
      {label:"Arrancar a placa.", effect:{courage:2,autonomy:1}, next:"cave"}
    ]
  },

  explore:{
    chapter:"CAPÍTULO I", location:"A PRAÇA", symbol:"△", title:"A porta",
    text:[
      "Atrás da fonte existe uma porta que ninguém parece notar.",
      "Você abre.",
      "Do outro lado há uma sala completamente branca. No centro, uma única pergunta escrita no chão:",
      "“Se ninguém pudesse julgá-lo, o que você faria?”"
    ],
    choices:[
      {label:"Escrever: “Eu faria aquilo que desejo.”", effect:{will:2}, next:"cave"},
      {label:"Escrever: “Eu faria aquilo que considero correto.”", effect:{reason:2}, next:"cave"},
      {label:"Não escrever nada.", effect:{autonomy:1,courage:1}, next:"cave"}
    ]
  },

  conform:{
    chapter:"CAPÍTULO II", location:"O SALÃO", symbol:"♟", title:"O preço de pertencer",
    text:[
      "A multidão entra em um salão. Um homem de terno anuncia:",
      "“Aqui ninguém precisa escolher. Nós já decidimos o que é uma vida boa.”",
      "Ele oferece comida, dinheiro e segurança.",
      "“Em troca, você só precisa parar de fazer perguntas.”"
    ],
    choices:[
      {label:"Aceitar a segurança.", effect:{will:-1}, item:"Moeda de Ouro", next:"trial"},
      {label:"Perguntar quem decidiu o que é uma vida boa.", effect:{reason:2}, next:"trial"},
      {label:"Recusar e sair.", effect:{autonomy:2,courage:1}, next:"trial"}
    ]
  },

  cave:{
    chapter:"CAPÍTULO II", location:"A CAVERNA", symbol:"●", title:"Sombras",
    text:[
      "Você chega a uma caverna. Pessoas estão sentadas olhando para uma parede.",
      "Na parede aparecem imagens de suas próprias vidas: fracassos, desejos, lembranças e medos.",
      "Um prisioneiro sussurra:",
      "“Se uma mentira nos faz felizes, por que deveríamos desejar a verdade?”"
    ],
    choices:[
      {label:"A verdade vale mesmo quando dói.", effect:{reason:2,courage:1}, next:"absurd"},
      {label:"Felicidade pode ser mais importante que verdade.", effect:{will:2}, next:"pleasure"},
      {label:"Eu não sei. Quero investigar.", effect:{reason:1,autonomy:1}, next:"absurd"}
    ]
  },

  pleasure:{
    chapter:"CAPÍTULO III", location:"O JARDIM", symbol:"☾", title:"O jardim tranquilo",
    text:[
      "Depois da caverna, você encontra um jardim silencioso.",
      "Uma mulher oferece vinho, comida e descanso.",
      "“Não precisamos conquistar o mundo”, ela diz. “Talvez uma vida boa seja simplesmente uma vida sem perturbação desnecessária.”",
      "Mas ao longe alguém grita por ajuda."
    ],
    choices:[
      {label:"Ficar. Minha paz também importa.", effect:{will:2}, next:"trial"},
      {label:"Ajudar. O sofrimento do outro importa.", effect:{empathy:2,courage:1}, next:"trial"},
      {label:"Perguntar se minha paz é egoísmo.", effect:{reason:1,empathy:1}, next:"trial"}
    ]
  },

  absurd:{
    chapter:"CAPÍTULO III", location:"A PONTE", symbol:"☼", title:"O absurdo",
    text:[
      "Na ponte, um homem empurra uma pedra montanha acima. Ela sempre cai.",
      "Ele recomeça.",
      "Você pergunta: “Qual é o sentido?”",
      "Ele sorri: “Talvez a pergunta esteja errada.”"
    ],
    choices:[
      {label:"Criar meu próprio sentido.", effect:{autonomy:2,will:2}, next:"power"},
      {label:"Se não existe sentido, nada importa.", effect:{will:2,reason:1}, next:"power"},
      {label:"Continuar procurando um sentido objetivo.", effect:{reason:2}, next:"power"}
    ]
  },

  trial:{
    chapter:"CAPÍTULO IV", location:"O TRIBUNAL", symbol:"⚖", title:"A escolha impossível",
    text:[
      "Você entra em um tribunal.",
      "Dois desconhecidos estão diante de você. Um deles será condenado por um crime que você sabe que não cometeu.",
      "O juiz oferece uma saída: mentir e salvar a pessoa, ou dizer a verdade e permitir que o sistema prossiga.",
      "“O que importa mais: a regra ou a pessoa?”"
    ],
    choices:[
      {label:"A verdade não deve ser sacrificada.", effect:{reason:2}, next:"power"},
      {label:"Salvar a pessoa é mais importante.", effect:{empathy:2,courage:1}, next:"power"},
      {label:"Manipular o juiz sem mentir.", effect:{autonomy:2,reason:1}, next:"power"}
    ]
  },

  power:{
    chapter:"CAPÍTULO V", location:"A TORRE", symbol:"♜", title:"O poder",
    text:[
      "No topo da torre, você encontra o governante da cidade.",
      "Ele oferece poder absoluto.",
      "“Com poder suficiente”, diz ele, “você poderá impedir guerras, fome e sofrimento.”",
      "“Mas precisará decidir pelos outros.”"
    ],
    choices:[
      {label:"Aceitar. Um bom governante pode proteger pessoas.", effect:{will:2,autonomy:-1}, next:"eternal"},
      {label:"Recusar. Ninguém deveria possuir esse poder.", effect:{autonomy:2,reason:1}, next:"eternal"},
      {label:"Aceitar, mas impor limites a mim mesmo.", effect:{reason:1,will:1,autonomy:1}, next:"eternal"}
    ]
  },

  eternal:{
    chapter:"CAPÍTULO VI", location:"A SALA DO RETORNO", symbol:"∞", title:"O eterno retorno",
    text:[
      "Uma porta se abre.",
      "Do outro lado está você mesmo.",
      "Ele diz: “Tudo que você viveu acontecerá novamente. Exatamente igual. Para sempre.”",
      "“Se soubesse disso, você escolheria viver esta mesma vida outra vez?”"
    ],
    choices:[
      {label:"Sim. Eu aceitaria minha vida inteira.", effect:{will:3}, next:"ending"},
      {label:"Não. Eu mudaria tudo.", effect:{autonomy:2}, next:"ending"},
      {label:"Eu não preciso gostar de tudo para aceitar tudo.", effect:{reason:2,will:1}, next:"ending"}
    ]
  },

  ending:{
    chapter:"FINAL", location:"DIANTE DO ESPELHO", symbol:"◈", title:"Quem você se tornou?",
    text:[
      "O espelho aparece novamente.",
      "Agora ele não mostra seu rosto. Mostra todas as escolhas que você fez.",
      "A cidade desaparece.",
      "Você finalmente entende: a pergunta nunca foi “qual filosofia está certa?”.",
      "A pergunta era: “que tipo de pessoa suas escolhas estão construindo?”"
    ],
    choices:[
      {label:"Olhar para o espelho.", effect:{}, next:"final"}
    ]
  },

  final:{
    chapter:"FIM", location:"O ESPELHO", symbol:"✦", title:"Seu caminho",
    text:["Você não encontrou uma resposta definitiva. Encontrou algo mais difícil: responsabilidade pelas próprias escolhas."],
    choices:[]
  }
};
