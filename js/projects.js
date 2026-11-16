// Cadastro central dos projetos.
// Os dados dos outros grupos serão preenchidos quando as equipes os enviarem.

const projects = [
  {
    id: 1,
    group: "Grupo 01",
    title:
      "Monitoramento da Temperatura e Umidade do Ar em Ambientes Escolares",

    description:
      "Projeto de Internet das Coisas voltado ao monitoramento da temperatura e da umidade do ar em salas de aula, buscando identificar condições ambientais que favoreçam o conforto térmico, o bem-estar e a concentração dos estudantes.",

    objective:
      "Desenvolver um sistema de monitoramento utilizando ESP32 e sensor DHT22 para medir a temperatura e a umidade do ar em ambientes escolares, permitindo acompanhar essas informações remotamente e compreender como as condições ambientais podem influenciar o processo de aprendizagem.",

    operation:
      "O sistema utiliza um ESP32 conectado ao sensor DHT22, responsável por realizar as medições de temperatura e umidade do ambiente. Os dados coletados são enviados por meio de uma conexão Wi-Fi para a plataforma ThingSpeak, utilizando comunicação HTTP. Na plataforma em nuvem, as informações são armazenadas e apresentadas em gráficos, possibilitando acompanhar as variações das condições ambientais. A simulação do circuito e do funcionamento do dispositivo é realizada na plataforma Wokwi.",

    students: [
      "Raissa Bertini Musseli Da Silva",
      "Maria Clara Pereira Iotti",
      "Weverthon Miguel Souza Candido",
    ],

    teachers: [
      "Barbara Kathellen Andrade Porfirio",
      "Thaynara Cristina Maia dos Santos",
    ],

    sensors: ["Sensor DHT22"],

    technologies: ["ESP32", "Wokwi", "ThingSpeak"],

    components: ["ESP32", "Protoboard", "Resistores"],

    status: "Projeto desenvolvido",

    metadata: {
      institution: "Etec de Campo Limpo Paulista",
      course: "Informática para a Internet integrado ao Ensino Médio",
      platform: "ThingSpeak",
      updateInterval: "15 segundos",
      sensorReadingInterval: "Conforme execução do programa",
    },

    links: {
      thingspeak: "https://thingspeak.mathworks.com/channels/3578195",
    },

    thingspeak: {
      channelId: "3578195",
      readApiKey: "",
      results: 20,
      refreshInterval: 20000,

      fields: [
        {
          number: 1,
          name: "Temperatura",
          unit: "°C",
        },
        {
          number: 2,
          name: "Umidade do ar",
          unit: "%",
        },
      ],
    },
  },

  
{
    id: 2,
    group: "Grupo 02",
    title: "Monitoramento de Ruído com IoT Simulada",
    description: "Sistema de monitoramento da variação do nível de ruído utilizando ESP32 e um potenciômetro para simular diferentes intensidades sonoras, com armazenamento e visualização dos dados na plataforma ThingSpeak.",
    objective: "Desenvolver um sistema simulado capaz de acompanhar a variação do nível de ruído em um ambiente, realizando leituras analógicas, calculando médias e armazenando os resultados na nuvem com registro automático dos horários das medições.",
    operation: "O potenciômetro conectado ao GPIO 34 do ESP32 representa diferentes intensidades de ruído por meio da variação de um sinal analógico. O microcontrolador realiza 30 leituras consecutivas, calcula a média dos valores obtidos e envia o resultado ao ThingSpeak por meio de uma requisição HTTP GET. O envio ocorre a cada 20 segundos, e a plataforma registra automaticamente a data e o horário de cada atualização, permitindo acompanhar as variações em gráficos.",
    students: [
        "Enzo Fernandes",
        "Kayk Alex da Silva Bortolotti",
        "Samuel Felipe Ribeiro de Souza"
    ],
    teachers: [
        "Barbara Kathellen Andrade Porfirio",
        "Thaynara Cristina Maia dos Santos"
    ],
    sensors: [
        "Potenciômetro"
    ],
    technologies: [
        "ESP32",
        "Wokwi",
        "ThingSpeak"
    ],
    components: [
        "ESP32",
    ],
    status: "Projeto desenvolvido",
    metadata: {
        institution: "Etec de Campo Limpo Paulista",
        course: "Informática para a Internet integrado ao Ensino Médio",
        platform: "ThingSpeak",
        updateInterval: "20 segundos",
        sensorReadingInterval: "30 leituras consecutivas com intervalo de 5 milissegundos",
        sensorPin: "GPIO 34",
        measurementMethod: "Média de 30 leituras analógicas",
        measurementRange: "0 a 4095",
        observation: "Valores simulados de intensidade sonora, não representam medições reais em decibéis (dB)"
    },
    links: {
        wokwi: "https://wokwi.com/projects/480781533338820609",
        thingspeak: "https://thingspeak.mathworks.com/channels/3580056/private_show"
    },
    thingspeak: {
        channelId: "3580056",
        readApiKey: "",
        results: 20,
        refreshInterval: 20000,
        fields: [
            { number: 1, name: "Nível de ruído simulado", unit: "" }
        ]
    }
},

  {
    id: 3,
    group: "Grupo 03",
    title: "Lixeira Inteligente",
    description: "Sistema de monitoramento do nível de ocupação de uma lixeira utilizando sensor ultrassônico, ESP32 e integração com a plataforma ThingSpeak.",
    objective: "Desenvolver um sistema capaz de monitorar a ocupação de uma lixeira, calcular seu nível de preenchimento e disponibilizar os dados na nuvem para acompanhamento.",
    operation: "O sensor ultrassônico HC-SR04 realiza medições da distância entre o sensor e o conteúdo da lixeira. Com base nessas medições, o ESP32 calcula a porcentagem de ocupação e classifica o estado da lixeira. Três LEDs indicam as condições: verde para OK, amarelo para atenção e vermelho para cheia. Os dados são enviados ao ThingSpeak a cada 20 segundos.",
    students: [
        "Nicolly Bordignon de Oliveira",
        "Pedro Henrique Rozendo Gasparotto",
        "Samuel Fernandes Lima"
    ],
    teachers: [
        "Barbara Kathellen Andrade Porfirio",
        "Thaynara Cristina Maia dos Santos"
    ],
    sensors: [
        " Sensor HC-SR04"
    ],
    technologies: [
        "ESP32",
        "Wokwi",
        "ThingSpeak"
    ],
    components: [
        "ESP32",
        "LED verde",
        "LED amarelo",
        "LED vermelho",
        "3 resistores"
    ],
    status: "Projeto desenvolvido",
    metadata: {
        institution: "Etec de Campo Limpo Paulista",
        course: "Informática para a Internet integrado ao Ensino Médio",
        platform: "ThingSpeak",
        updateInterval: "20 segundos",
        sensorReadingInterval: "2 segundos",
        measurementMethod: "Mediana de cinco leituras do sensor",
        emptyDistance: "50 cm",
        fullDistance: "5 cm"
    },
    links: {
        wokwi: "https://wokwi.com/projects/480635679921625089",
        thingspeak: "https://thingspeak.mathworks.com/channels/3578586"
    },
    thingspeak: {
        channelId: "3578586",
        readApiKey: "",
        results: 20,
        refreshInterval: 20000,
        fields: [
            { number: 1, name: "Ocupação", unit: "%" },
            { number: 2, name: "Distância", unit: "cm" },
            { number: 3, name: "Status", unit: "" }
        ]
    }
},
  {
    id: 4,
    group: "Grupo 04",
    title: "Projeto 04 - informações em cadastro",
    description:
      "As informações deste projeto serão adicionadas após o recebimento dos dados do grupo.",
    objective: "",
    operation: "",
    students: [],
    teachers: [
      "Barbara Kathellen Andrade Porfirio",
      "Thaynara Cristina Maia dos Santos",
    ],
    sensors: [],
    technologies: [],
    components: [],
    status: "Aguardando cadastro",
    metadata: {},
    links: {},
    thingspeak: null,
  },
  
{
    id: 5,
    group: "Grupo 05",
    title: "Reservatório Inteligente",
    description: "Sistema simulado de monitoramento do nível e do volume de água de um reservatório, utilizando ESP32, sensor ultrassônico HC-SR04 e display LCD, com integração à plataforma ThingSpeak para visualização remota dos dados.",
    objective: "Desenvolver e simular um sistema inteligente capaz de medir o nível de água de um reservatório, calcular a porcentagem de preenchimento e o volume armazenado, classificar sua condição e apresentar as informações localmente e pela internet.",
    operation: "O sensor ultrassônico HC-SR04 mede a distância entre sua posição e a superfície da água. O ESP32 utiliza essa distância para calcular o percentual de preenchimento e estimar o volume armazenado, considerando uma capacidade de referência de 1.000 litros. O sistema classifica o reservatório em cinco estados: vazio, baixo, médio, alto e cheio. As informações são exibidas em um display LCD 20x4 e enviadas ao ThingSpeak a cada 20 segundos, permitindo acompanhar o nível, o volume, o estado e a variação do preenchimento por meio de gráficos.",
    students: [
        "Samuel de Lima Magno",
        "Murilo Domingos de Souza",
        "Pedro Luís de Souza"
    ],
    teachers: [
        "Barbara Kathellen Andrade Porfirio",
        "Thaynara Cristina Maia dos Santos"
    ],
    sensors: [
        "Sensor HC-SR04"
    ],
    technologies: [
        "ESP32",
        "Wokwi",
        "ThingSpeak"
    ],
    components: [
        "ESP32",
        "Display LCD 20x4",
        "Módulo I2C",
        "Fios de conexão"
    ],
    status: "Projeto desenvolvido",
    metadata: {
        institution: "Etec de Campo Limpo Paulista",
        course: "Informática para a Internet integrado ao Ensino Médio",
        platform: "ThingSpeak",
        updateInterval: "20 segundos",
        sensorTrigPin: "GPIO 5",
        sensorEchoPin: "GPIO 18",
        lcdAddress: "0x27",
        lcdDimensions: "20x4",
        reservoirCapacity: "1.000 litros",
        emptyDistance: "105 cm",
        fullDistance: "5 cm",
        classification: {
            empty: "0% a 5%",
            low: "Acima de 5% até 25%",
            medium: "Acima de 25% até 50%",
            high: "Acima de 50% até 75%",
            full: "Acima de 75% até 100%"
        }
    },
    links: {
        wokwi: "https://wokwi.com/projects/480221110015885313",
        thingspeak: "https://thingspeak.mathworks.com/channels/3571968",
        video: "https://youtu.be/rnpAkumU2A8?si=IlrvLMvZDoTmFPny"
    },
    thingspeak: {
        channelId: "3571968",
        readApiKey: "",
        results: 20,
        refreshInterval: 20000,
        fields: [
            { number: 1, name: "Nível de água", unit: "%" },
            { number: 2, name: "Volume armazenado", unit: "L" },
            { number: 3, name: "Estado do reservatório", unit: "" },
            { number: 4, name: "Variação do nível", unit: "p.p." }
        ]
    }
},

{
    id: 6,
    group: "Grupo 06",
    title: "Iluminação Inteligente (SmartLight)",
    description: "Sistema de iluminação automatizada que utiliza um sensor LDR para identificar a luminosidade do ambiente e controlar o acionamento de um LED, permitindo monitoramento dos dados pela plataforma ThingSpeak.",
    objective: "Demonstrar como a iluminação inteligente pode contribuir para a redução do desperdício de energia elétrica, proporcionando maior eficiência, praticidade e conforto por meio da automação.",
    operation: "O sensor LDR identifica a intensidade luminosa do ambiente e envia os valores ao ESP32. O microcontrolador interpreta as condições de luminosidade e controla o LED automaticamente, acendendo-o quando o ambiente está escuro e apagando-o quando há iluminação suficiente. Os dados são enviados pela conexão Wi-Fi ao ThingSpeak, onde ficam armazenados e são apresentados em gráficos.",
    students: [
        "Melissa Sofia Veiga",
        "Kemily Eduarda Pessoa Lucatelli",
        "Ana Clara Donegal"
    ],
    teachers: [
        "Barbara Kathellen Andrade Porfirio",
        "Thaynara Cristina Maia dos Santos"
    ],
    sensors: [
        "Sensor LDR"
    ],
    technologies: [
        "ESP32",
        "Wokwi",
        "ThingSpeak"
    ],
    components: [
        "ESP32",
        "LED"
    ],
    status: "Projeto desenvolvido",
    metadata: {
        institution: "Etec de Campo Limpo Paulista",
        course: "Informática para a Internet integrado ao Ensino Médio",
        platform: "ThingSpeak",
        monitoring: "Intensidade luminosa e condição do ambiente",
        automation: "Acionamento automático da iluminação conforme a luminosidade"
    },
    links: {
        wokwi: "https://wokwi.com/projects/479156222188282881",
        thingspeak: "https://thingspeak.mathworks.com/channels/3543400"
    },
    thingspeak: {
        channelId: "3543400",
        readApiKey: "",
        results: 20,
        refreshInterval: 20000,
        fields: [
            { number: 1, name: "Intensidade luminosa", unit: "" },
            { number: 2, name: "Condição do ambiente", unit: "" }
        ]
    }
},
  {
    id: 7,
    group: "Grupo 07",
    title: "Horta Inteligente",
    description: "Sistema de monitoramento de temperatura, umidade do ar e umidade do solo, utilizando ESP32, sensor DHT22 e potenciômetro para simular as condições de uma horta e identificar quando é necessário regar.",
    objective: "Desenvolver um sistema de monitoramento ambiental para uma horta, coletando dados de temperatura, umidade do ar e umidade do solo, armazenando e exibindo essas informações na nuvem e emitindo um alerta quando o solo estiver seco.",
    operation: "O sensor DHT22 realiza a leitura da temperatura e da umidade do ar, enquanto um potenciômetro simula o sensor de umidade do solo. O ESP32 processa os dados e os envia ao ThingSpeak a cada 15 segundos. Quando a umidade do solo fica abaixo de 40%, um LED acende para indicar a necessidade de regar. Quando a umidade atinge 40% ou mais, o LED permanece apagado.",
    students: [
        "Raphael Paiva dos Santos",
        "Pedro Henrique Neves Castilho",
        "Thailan Roberto Pinto Lage"
    ],
    teachers: [
        "Barbara Kathellen Andrade Porfirio",
        "Thaynara Cristina Maia dos Santos"
    ],
    sensors: [
        "Sensor DHT22",
        "Potenciômetro"
    ],
    technologies: [
        "ESP32",
        "Wokwi",
        "ThingSpeak"
    ],
    components: [
        "ESP32",
        "LED",
        "Protoboard",
        "Resistor"
    ],
    status: "Projeto desenvolvido",
    metadata: {
        institution: "Etec de Campo Limpo Paulista",
        course: "Informática para a Internet integrado ao Ensino Médio",
        platform: "ThingSpeak",
        updateInterval: "15 segundos",
        sensorReadingInterval: "1 segundo",
        soilMoistureAlert: "Abaixo de 40%",
        dht22Pin: "GPIO 15",
        potentiometerPin: "GPIO 34",
        ledPin: "GPIO 2"
    },
    links: {
        wokwi: "https://wokwi.com/projects/479815180123296769",
        thingspeak: "https://thingspeak.mathworks.com/channels/3566593"
    },
    thingspeak: {
        channelId: "3566593",
        readApiKey: "",
        results: 20,
        refreshInterval: 20000,
        fields: [
            { number: 1, name: "Umidade do solo", unit: "%" },
            { number: 2, name: "Temperatura", unit: "°C" },
            { number: 3, name: "Umidade do ar", unit: "%" }
        ]
    }
},
 {
    id: 8,
    group: "Grupo 08",
    title: "Sistema IoT de Monitoramento de Segurança (Vigia IoT)",
    description: "Sistema de monitoramento de segurança que utiliza um sensor PIR conectado ao ESP32 para detectar movimentos, contabilizar ocorrências e enviar informações para a plataforma ThingSpeak.",
    objective: "Desenvolver uma simulação de monitoramento de movimento utilizando ESP32 e sensor PIR, permitindo identificar ocorrências, armazenar os registros na nuvem e acompanhar os dados remotamente.",
    operation: "O sensor PIR identifica movimentos e envia um sinal digital ao ESP32 pelo GPIO 13. O microcontrolador identifica a transição do sinal de LOW para HIGH e incrementa o contador de detecções. LEDs verde e vermelho e um buzzer realizam a sinalização local. A cada 20 segundos, o ESP32 envia o estado do sensor, a quantidade acumulada de detecções e o número da medição ao ThingSpeak, onde os dados são armazenados e apresentados em gráficos.",
    students: [
        "Kaique Ruan Francelino Marcelli",
        "Luan Henrique dos Santos"
    ],
    teachers: [
        "Barbara Kathellen Andrade Porfirio",
        "Thaynara Cristina Maia dos Santos"
    ],
    sensors: [
        "Sensor PIR"
    ],
    technologies: [
        "ESP32",
        "Wokwi",
        "ThingSpeak"
    ],
    components: [
        "ESP32",
        "LED verde",
        "LED vermelho",
        "Buzzer"
    ],
    status: "Projeto desenvolvido",
    metadata: {
        institution: "Etec de Campo Limpo Paulista",
        course: "Informática para a Internet integrado ao Ensino Médio",
        platform: "ThingSpeak",
        updateInterval: "20 segundos",
        pirPin: "GPIO 13",
        greenLedPin: "GPIO 25",
        redLedPin: "GPIO 26",
        buzzerPin: "GPIO 27",
        detectionMethod: "Transição do sinal de LOW para HIGH"
    },
    links: {
        wokwi: "https://wokwi.com/projects/480596906630971393",
        thingspeak: "https://thingspeak.mathworks.com/channels/3551653"
    },
    thingspeak: {
        channelId: "3551653",
        readApiKey: "",
        results: 20,
        refreshInterval: 20000,
        fields: [
            { number: 1, name: "Estado do sensor", unit: "" },
            { number: 2, name: "Quantidade de detecções", unit: "" },
            { number: 3, name: "Número da medição", unit: "" }
        ]
    }
},
  {
    id: 9,
    group: "Grupo 09",
    title: "Biblioteca Inteligente",
    description: "Monitoramento da ocupação de um ambiente escolar.",
    objective:
      "Desenvolver um protótipo capaz de monitorar a ocupação de uma biblioteca escolar, estimando a quantidade de pessoas presentes e registrando entradas e saídas.",
    operation:
      "O sistema utiliza dois sensores ultrassônicos HC-SR04 para identificar a passagem de pessoas. Com base na sequência de acionamento dos sensores, o ESP32 estima a quantidade de pessoas presentes e contabiliza entradas e saídas.",
    students: [
      "Carlos Eduardo de Sousa Siqueira",
      "Oziel Pompilho dos Santos Júnior",
    ],
    teachers: [
      "Barbara Kathellen Andrade Porfirio",
      "Thaynara Cristina Maia dos Santos",
    ],
    sensors: ["2 sensores ultrassônicos HC-SR04"],
    technologies: ["ESP32", "Wokwi", "ThingSpeak"],
    components: ["4 LEDs indicadores", "Resistores", "Protoboard"],
    status: "Projeto desenvolvido",
    metadata: {
      capacity: "50 pessoas",
      interval: "20 segundos",
    },
    links: {
      simulation: "https://wokwi.com/projects/479990444909709313",
      dashboard: "https://thingspeak.mathworks.com/channels/3569472",
      video: "https://youtu.be/-hstfLsvyaY",
    },
    thingspeak: {
      channelId: "3569472",
      readApiKey: "",
      results: 20,
      refreshInterval: 20000,
      fields: [
        { number: 1, name: "Pessoas presentes", unit: "pessoas" },
        { number: 2, name: "Total de entradas", unit: "entradas" },
        { number: 3, name: "Total de saídas", unit: "saídas" },
      ],
    },
  },
  {
    id: 10,
    group: "Grupo 10",
    title: "Bicicletário Inteligente: Monitoramento da Ocupação de Vagas com ESP32, Wokwi e ThingSpeak",
    description: "Sistema de monitoramento da ocupação de quatro vagas de um bicicletário utilizando ESP32, sensores de presença simulados por chaves deslizantes e LEDs indicadores, com armazenamento e visualização dos dados na nuvem por meio da plataforma ThingSpeak.",
    objective: "Desenvolver um sistema de bicicletário inteligente capaz de monitorar a ocupação de quatro vagas, identificando a quantidade de vagas ocupadas e livres, calculando a taxa de ocupação e contabilizando o total de entradas de bicicletas, com envio, armazenamento e visualização dos dados na nuvem.",
    operation: "O ESP32 simulado no Wokwi realiza a leitura de quatro chaves deslizantes, que representam sensores de presença instalados nas vagas do bicicletário. Quando uma chave está ligada ao GND, a respectiva vaga é considerada ocupada, e o LED vermelho correspondente é aceso. O microcontrolador calcula a quantidade de vagas ocupadas, vagas livres, taxa de ocupação percentual e total acumulado de entradas de bicicletas. Em seguida, conecta-se à rede Wi-Fi simulada Wokwi-GUEST e envia os dados ao ThingSpeak por meio de uma requisição HTTP GET. O envio ocorre periodicamente a cada 20 segundos ou após mudanças no estado das vagas, respeitando o intervalo mínimo configurado de 16 segundos. O sistema também possui um modo automático que simula chegadas e saídas de bicicletas em intervalos aleatórios, permitindo visualizar as alterações na ocupação.",
    students: [
        "Murilo Victor Fernandes de Carvalho",
        "Otávio Medeiros Fuentes Garcia",
        "Lucas Souza Santos"
    ],
    teachers: [
        "Barbara Kathellen Andrade Porfirio",
        "Thaynara Cristina Maia dos Santos"
    ],
    sensors: [
        "4x Chaves deslizantes"
    ],
    technologies: [
        "ESP32",
        "Wokwi",
        "ThingSpeak",
    ],
    components: [
        "ESP32",
        "4 chaves deslizantes",
        "4 LEDs vermelhos",
        "4 resistores de 220 Ω"
    ],
    status: "Projeto desenvolvido",
    metadata: {
        institution: "Etec de Campo Limpo Paulista",
        course: "Informática para a Internet integrado ao Ensino Médio",
        platform: "ThingSpeak",
        projectName: "BikeSense",
        group: "Grupo 10",
        updateInterval: "20 segundos",
        minimumUpdateInterval: "16 segundos",
        sensorPin: "GPIO 13, GPIO 14, GPIO 27 e GPIO 26 (ESP32)",
        ledPins: "GPIO 4, GPIO 16, GPIO 17 e GPIO 18 (ESP32)",
        sensorReadingMethod: "Leitura digital utilizando INPUT_PULLUP",
        measurementRange: "0 a 4 vagas ocupadas; 0% a 100% de ocupação",
        measurementMethod: "Contagem de vagas ocupadas e livres, cálculo percentual da ocupação e contagem acumulada de entradas",
        simulationMode: "Automático, com mudanças aleatórias na ocupação das vagas",
        automaticSimulationInterval: "Entre 6 e 15 segundos para cada possível mudança",
        wifiNetwork: "Wokwi-GUEST",
        communicationProtocol: "HTTP GET",
        observation: "As chaves deslizantes simulam sensores de presença. Os dados são gerados em ambiente virtual e não representam a ocupação de um bicicletário físico.",
        collectionResults: "7 registros enviados em aproximadamente 10 minutos",
        averageOccupancy: "67,9%",
        maximumOccupancy: "100%",
        minimumOccupancy: "50%",
        totalEntries: "4 bicicletas"
    },
    links: {
        wokwi: "https://wokwi.com/projects/480781744121502721",
        thingspeak: "https://thingspeak.mathworks.com/channels/3580087"
    },
    thingspeak: {
        channelId: "3580087",
        writeApiKey: "",
        readApiKey: "",
        results: 20,
        refreshInterval: 20000,
        fields: [
            { number: 1, name: "Vagas ocupadas", unit: "vagas" },
            { number: 2, name: "Vagas livres", unit: "vagas" },
            { number: 3, name: "Taxa de ocupação", unit: "%" },
            { number: 4, name: "Total de entradas", unit: "bicicletas" }
        ]
    }
},
  {
    id: 11,
    group: "Grupo 11",
    title: "Monitoramento de Geladeira",
    description:
      "Acompanhamento da temperatura e umidade de uma geladeira em tempo real utilizando IoT.",
    objective:
      "Desenvolver um sistema de monitoramento remoto de temperatura e umidade de uma geladeira, utilizando ESP32, sensor DHT22, Wokwi e ThingSpeak, permitindo acompanhar as condições internas e identificar possíveis alterações que possam comprometer a conservação dos produtos.",
    operation:
      "O projeto utiliza um ESP32 conectado a um sensor DHT22 para realizar a leitura da temperatura e da umidade do ambiente interno de uma geladeira. Os dados são enviados periodicamente para a plataforma ThingSpeak, permitindo o acompanhamento remoto por meio de gráficos. O sistema também utiliza três LEDs para indicar as condições de temperatura: verde para situação normal, amarelo para atenção e vermelho para temperatura elevada. A comunicação é simulada por meio da rede Wi-Fi Wokwi-GUEST.",
    students: [
      "Thiago Enrique Dias de Lima",
      "Pietro de Lima Vila Nova",
      "Enzo Romano Alcântra Canciano",
    ],
    teachers: [
      "Barbara Kathellen Andrade Porfirio",
      "Thaynara Cristina Maia dos Santos",
    ],
    sensors: ["Sensor DHT22 (temperatura e umidade)"],
    components: [
      "ESP32 DevKit C V4",
      "Sensor DHT22",
      "LED verde",
      "LED amarelo",
      "LED vermelho",
      "3 resistores de 220 Ω",
      "Protoboard",
    ],
    status: "Projeto desenvolvido",
    thingspeak: {
      channelId: "3546842",
      readApiKey: "",
      results: 20,
      refreshInterval: 20000,
      fields: [
        {
          number: 1,
          name: "Temperatura",
          unit: "°C",
        },
        {
          number: 2,
          name: "Umidade",
          unit: "%",
        },
        {
          number: 3,
          name: "Estado da geladeira",
          unit: "",
        },
      ],
    },
    statusLevels: [
      {
        value: 0,
        name: "Normal",
        condition: "Temperatura menor ou igual a 4 °C",
        color: "green",
      },
      {
        value: 1,
        name: "Atenção",
        condition: "Temperatura acima de 4 °C até 5 °C",
        color: "yellow",
      },
      {
        value: 2,
        name: "Temperatura elevada",
        condition: "Temperatura acima de 5 °C",
        color: "red",
      },
    ],
    links: {
      wokwi: "https://wokwi.com/projects/478790899896893441",
      thingspeak: "https://thingspeak.mathworks.com/channels/3546842",
    },
    resultsSummary:
      "O projeto realizou testes simulados de monitoramento, registrando variações de temperatura e umidade no ThingSpeak. Os resultados demonstraram o funcionamento do envio de dados e da classificação dos estados da geladeira. Como melhoria, o grupo identificou a necessidade de tratar também temperaturas negativas, evitando que valores muito baixos sejam classificados como normais.",
  },
];
