import React from 'react';

// Componente de hoja reutilizable
const Leaf = ({ type = "round", width = 80, height = 50, color = "#6DC75B", rotate = 0, style = {} }) => {
  const styles = {
    transform: `rotate(${rotate}deg)`,
    ...style
  };

  let path = "";

  switch (type) {
    case "round":
      path = `M ${width / 2} 0 A ${width / 2} ${height / 2} 0 1 1 ${width / 2} ${height} A ${width / 2} ${height / 2} 0 1 1 ${width / 2} 0`;
      break;
    case "ellipse":
      path = `M ${width / 2} 0 A ${width / 2} ${height / 2} 0 1 0 ${width / 2} ${height} A ${width / 2} ${height / 2} 0 1 0 ${width / 2} 0`;
      break;
    case "drop":
      path = `M ${width / 2} 0 C ${width} ${height / 3}, ${width} ${height}, ${width / 2} ${height} C 0 ${height}, 0 ${height / 3}, ${width / 2} 0`;
      break;
    case "irregular":
      path = `M ${width / 2} 0 C ${width} ${height / 5}, ${width} ${height}, ${width / 2} ${height} C 0 ${height}, 0 ${height / 3}, ${width / 2} 0`;
      break;
    default:
      path = "";
  }

  return (
    <svg width={width} height={height} style={styles}>
      <path d={path} fill={color} />
    </svg>
  );
};
// Lista de imágenes de los científicos
const scientistImages = [
  { name: "Jakob Uszkoreit", url: "https://framerusercontent.com/images/eGxXGn6TuV3KwVcPn3K8AlYbU.jpg" },
  { name: "Illia Polosukhin", url: "https://avatars.githubusercontent.com/u/175486?v=4" },
  { name: "Ashish Vaswani", url: "https://media.licdn.com/dms/image/v2/C5603AQEDhAJzTfYLvA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1650996874298?e=2147483647&v=beta&t=hiPmTXkMBcUqL5dR0DB2vN2f7B8s-kZqwDAR3CUS4ms" },
  { name: "Niki Parmar", url: "https://miro.medium.com/0*iH1nF6xxkDvFWRmt" },
  { name: "Łukasz Kaiser", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTTgzjvbGfLljo4uw75VxwQdmCMxb7cP75JA&s" },
  { name: "Aidan Gomez", url: "https://imageio.forbes.com/specials-images/imageserve/6727cca8288cbea3540c2dca/0x0.jpg?format=jpg&crop=2394,2393,x559,y0,safe&height=416&width=416&fit=bounds" },
  { name: "Llion Jones", url: "https://venturecafeglobal.org/wp-content/uploads/sites/16/2025/02/AI-Lilon-Jones.png" },
  { name: "Noam Shazeer", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwXSTwFg8_EDwc_c0ErK3wQ1872MucyvUEwg&s" },
];



// Fotos flotantes de fondo
const FloatingScientistImages = ({ position = "start" }) => {
  const justify = position === "start" ? "justify-center mt-10" : "justify-center mt-20 mb-20";


  return (
    <div className={`pointer-events-none z-[9999] w-full flex flex-wrap ${justify} gap-10 p-6`}>
      {scientistImages.map((img, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-2 pointer-events-none animate-bounce-slow"
          style={{ animationDelay: `${i * 0.3}s` }}
        >
          <div
            className="rounded-full overflow-hidden shadow-2xl border-4 border-amber-900 hover:scale-110 transition-transform duration-500"
            style={{ width: "130px", height: "130px" }}
          >
            <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
          </div>
          <p className="text-amber-900 font-bold text-sm bg-amber-200 px-3 py-1 rounded-full shadow-md border border-amber-700">
            {img.name}
          </p>
        </div>
      ))}
    </div>
  );
};


// Animaciones
const styles = `
@keyframes floating {
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-12px) scale(1.03); }
  100% { transform: translateY(0px) scale(1); }
}

@keyframes bounceSlow {
  0% { transform: translateY(0); }
  50% { transform: translateY(-18px); }
  100% { transform: translateY(0); }
}

.animate-floating {
  animation: floating 6s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounceSlow 5s ease-in-out infinite;
}
`;


const TransformerTree = () => {
  // Hojas de fondo con diferentes tipos
  const backgroundLeaves = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    type: ["round", "ellipse", "drop", "irregular"][Math.floor(Math.random() * 4)],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    rotation: Math.random() * 360,
    size: Math.random() * 40 + 30,
    color: ["#6DC75B", "#5BB84A", "#4A9E3A", "#62C559", "#3C8E35"][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-amber-50 p-8 overflow-x-auto relative">
      {/* Fotos de científicos al INICIO del árbol */}
      <FloatingScientistImages position="start" />
      {/* Hojas de fondo realistas */}
      {backgroundLeaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute opacity-20 pointer-events-none"
          style={{
            left: leaf.left,
            top: leaf.top,
          }}
        >
          <Leaf
            type={leaf.type}
            width={leaf.size}
            height={leaf.size * 0.7}
            color={leaf.color}
            rotate={leaf.rotation}
          />
        </div>
      ))}

      <div className="max-w-6xl mx-auto flex flex-col items-center relative pt-8">

        {/* Copa del árbol - Título */}
        <div className="relative z-20 mb-0">
          {/* Hojas decorativas alrededor del título */}
          <div className="absolute -top-12 -left-16">
            <Leaf type="drop" width={60} height={70} color="#4EB14A" rotate={-30} />
          </div>
          <div className="absolute -top-16 -right-12">
            <Leaf type="ellipse" width={70} height={50} color="#62C559" rotate={25} />
          </div>
          <div className="absolute -bottom-8 -left-20">
            <Leaf type="irregular" width={50} height={60} color="#3C8E35" rotate={45} />
          </div>
          <div className="absolute -bottom-10 -right-16">
            <Leaf type="round" width={55} height={55} color="#6BAE3F" rotate={-20} />
          </div>

          <div className="absolute -inset-8 bg-gradient-to-br from-green-700 via-green-600 to-green-800 rounded-full opacity-40 blur-2xl"></div>
          <div className="absolute -inset-6 bg-gradient-to-br from-green-600 via-green-500 to-green-700 rounded-full opacity-50 blur-xl"></div>
          <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-amber-50 px-12 py-6 rounded-full shadow-2xl border-4 border-amber-900">
            <h1 className="text-3xl font-bold text-center">Historia de los TRANSFORMERS en IA</h1>
            <p className="text-sm text-center mt-2 text-green-100">8 científicos anónimos que cambiaron el mundo</p>
          </div>
        </div>

        {/* ESPACIO PARA LÍNEAS */}
        <div className="w-full h-24 relative">
          {/* Línea vertical desde título */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-amber-950 z-0"
            style={{ top: '0', height: '60px' }}></div>

          {/* Barra horizontal para 3 frutos */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-2 bg-amber-950 z-0"
            style={{ top: '60px', width: '600px' }}></div>

          {/* Líneas verticales a cada fruto */}
          <div className="absolute z-0" style={{ top: '62px', left: 'calc(50% - 200px)', width: '2px', height: '38px', background: '#78350f' }}></div>
          <div className="absolute z-0" style={{ top: '62px', left: 'calc(50% - 1px)', width: '2px', height: '38px', background: '#78350f' }}></div>
          <div className="absolute z-0" style={{ top: '62px', left: 'calc(50% + 198px)', width: '2px', height: '38px', background: '#78350f' }}></div>
        </div>

        {/* Sección 1: Impacto Global - 3 frutos */}
        <div className="relative z-10 mb-0 flex gap-8 justify-center w-full max-w-5xl">
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-5 rounded-3xl shadow-2xl border-4 border-amber-800 w-52">
              <p className="font-bold text-center text-amber-950 text-lg">ChatGPT</p>
              <p className="text-xs text-center text-amber-900 mt-2">IA conversacional mundial</p>
              <p className="text-xs text-center text-amber-800 mt-1 italic">Base: GPT-1, 2, 3.5, 4</p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-red-400 via-red-500 to-red-600 p-5 rounded-3xl shadow-2xl border-4 border-red-900 w-52">
              <p className="font-bold text-center text-white text-lg">AlphaFold</p>
              <p className="text-xs text-center text-red-100 mt-2">Premio Nobel Química 2024</p>
              <p className="text-xs text-center text-red-200 mt-1 italic">Predicción de proteínas</p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-5 rounded-3xl shadow-2xl border-4 border-orange-900 w-52">
              <p className="font-bold text-center text-white text-lg">Waymo</p>
              <p className="text-xs text-center text-orange-100 mt-2">Coches autónomos</p>
              <p className="text-xs text-center text-orange-200 mt-1 italic">Conducción inteligente</p>
            </div>
          </div>
        </div>

        {/* ESPACIO PARA LÍNEAS */}
        <div className="w-full h-24 relative">
          {/* Línea vertical convergente */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-amber-950 z-0"
            style={{ top: '0', height: '96px' }}></div>
        </div>

        {/* Placa central - EL TRANSFORMADOR */}
        <div className="relative z-10 mb-0">
          <div className="bg-gradient-to-br from-yellow-600 via-amber-700 to-amber-900 text-amber-50 p-8 rounded-3xl shadow-2xl border-8 border-amber-950 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-6">EL TRANSFORMADOR</h2>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="bg-amber-950/60 p-4 rounded-xl border-2 border-amber-700">
                <p className="font-bold text-amber-200">Fecha:</p>
                <p className="text-amber-100">Mayo - Diciembre 2017</p>
              </div>
              <div className="bg-amber-950/60 p-4 rounded-xl border-2 border-amber-700">
                <p className="font-bold text-amber-200">Lugar:</p>
                <p className="text-amber-100">Google Research, California</p>
              </div>
              <div className="bg-amber-950/60 p-4 rounded-xl border-2 border-amber-700">
                <p className="font-bold text-amber-200">Paper:</p>
                <p className="text-amber-100">"Attention is All You Need"</p>
              </div>
              <div className="bg-amber-950/60 p-4 rounded-xl border-2 border-amber-700">
                <p className="font-bold text-amber-200">Extensión:</p>
                <p className="text-amber-100">15 páginas revolucionarias</p>
              </div>
              <div className="bg-amber-950/60 p-4 rounded-xl border-2 border-amber-700">
                <p className="font-bold text-amber-200">Logro:</p>
                <p className="text-amber-100">Superó récord BLEU</p>
              </div>
              <div className="bg-amber-950/60 p-4 rounded-xl border-2 border-amber-700">
                <p className="font-bold text-amber-200">Entrenamiento:</p>
                <p className="text-amber-100">Básico: 12h | Grande: 3.5 días</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-amber-950 p-4 rounded-xl text-center font-bold shadow-lg border-2 border-yellow-700 mb-3">
              "Software que permite a las máquinas imitar y superar la inteligencia humana"
            </div>
            <div className="bg-green-900/40 p-3 rounded-xl border border-green-600">
              <p className="text-xs text-green-200 italic text-center">
                Inspiración: Película "Arrival" - Los extraterrestres comunicándose con símbolos complejos
              </p>
            </div>
          </div>
        </div>

        {/* ESPACIO PARA LÍNEAS */}
        <div className="w-full h-32 relative">
          {/* Línea vertical desde placa central */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-amber-950 z-0"
            style={{ top: '0', height: '80px' }}></div>

          {/* Barra horizontal para 4 ramas */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-2 bg-amber-950 z-0"
            style={{ top: '80px', width: '1000px' }}></div>

          {/* Líneas verticales a cada rama */}
          <div className="absolute z-0" style={{ top: '82px', left: 'calc(50% - 375px)', width: '2px', height: '46px', background: '#78350f' }}></div>
          <div className="absolute z-0" style={{ top: '82px', left: 'calc(50% - 125px)', width: '2px', height: '46px', background: '#78350f' }}></div>
          <div className="absolute z-0" style={{ top: '82px', left: 'calc(50% + 125px)', width: '2px', height: '46px', background: '#78350f' }}></div>
          <div className="absolute z-0" style={{ top: '82px', left: 'calc(50% + 375px)', width: '2px', height: '46px', background: '#78350f' }}></div>
        </div>

        {/* 4 Ramas principales con información */}
        <div className="relative z-10 w-full max-w-6xl mb-0">
          <div className="grid grid-cols-4 gap-4">

            {/* Rama 1: Características */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 text-amber-50 p-4 rounded-2xl shadow-xl border-4 border-amber-950">
                <h3 className="font-bold text-center mb-3 text-base">CARACTERÍSTICAS</h3>
                <div className="space-y-2 text-xs">
                  <div className="bg-green-800/80 p-2 rounded-lg border border-green-600">
                    <p className="font-semibold text-green-100">Atención global</p>
                    <p className="text-green-200 text-xs">Procesa todo simultáneamente</p>
                  </div>
                  <div className="bg-green-800/80 p-2 rounded-lg border border-green-600">
                    <p className="font-semibold text-green-100">Mapas vectores</p>
                    <p className="text-green-200 text-xs">Conecta todos los términos</p>
                  </div>
                  <div className="bg-green-700/80 p-2 rounded-lg border border-green-500">
                    <p className="font-semibold text-green-100">Supera RNNs/LSTM</p>
                    <p className="text-green-200 text-xs">Sin límites de contexto</p>
                  </div>
                  <div className="bg-green-700/80 p-2 rounded-lg border border-green-500">
                    <p className="font-semibold text-green-100">Multimodal</p>
                    <p className="text-green-200 text-xs">Texto, imagen, música</p>
                  </div>
                  <div className="bg-green-600/80 p-2 rounded-lg border border-green-400">
                    <p className="font-semibold text-green-100">Encoder-Decoder</p>
                    <p className="text-green-200 text-xs">Dos pasos de transformación</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rama 2: Los 8 Científicos */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 text-amber-50 p-4 rounded-2xl shadow-xl border-4 border-amber-950">
                <h3 className="font-bold text-center mb-3 text-base">8 CIENTÍFICOS</h3>
                <div className="space-y-1 text-xs">
                  <div className="bg-emerald-800/80 p-1.5 rounded-lg border border-emerald-600">
                    <p className="font-bold text-emerald-100">1. Jakob Uszkoreit</p>
                    <p className="text-emerald-200 text-xs">Alemania - Líder. Hijo de Hans</p>
                  </div>
                  <div className="bg-emerald-800/80 p-1.5 rounded-lg border border-emerald-600">
                    <p className="font-bold text-emerald-100">2. Illia Polosukhin</p>
                    <p className="text-emerald-200 text-xs">Ucrania - Co-creador. Idea "Arrival"</p>
                  </div>
                  <div className="bg-emerald-700/80 p-1.5 rounded-lg border border-emerald-500">
                    <p className="font-bold text-emerald-100">3. Ashish Vaswani</p>
                    <p className="text-emerald-200 text-xs">India - Prodigio. 2 carreras a 16 años</p>
                  </div>
                  <div className="bg-emerald-700/80 p-1.5 rounded-lg border border-emerald-500">
                    <p className="font-bold text-emerald-100">4. Niki Parmar</p>
                    <p className="text-emerald-200 text-xs">India - Única mujer. Luchadora</p>
                  </div>
                  <div className="bg-teal-800/80 p-1.5 rounded-lg border border-teal-600">
                    <p className="font-bold text-teal-100">5. Łukasz Kaiser</p>
                    <p className="text-teal-200 text-xs">Polonia - El adulto. Ahora en OpenAI</p>
                  </div>
                  <div className="bg-teal-800/80 p-1.5 rounded-lg border border-teal-600">
                    <p className="font-bold text-teal-100">6. Aidan Gomez</p>
                    <p className="text-teal-200 text-xs">Canadá - Becario 21 años. Hinton</p>
                  </div>
                  <div className="bg-teal-700/80 p-1.5 rounded-lg border border-teal-500">
                    <p className="font-bold text-teal-100">7. Llion Jones</p>
                    <p className="text-teal-200 text-xs">Gales - Sugirió título Beatles</p>
                  </div>
                  <div className="bg-teal-700/80 p-1.5 rounded-lg border border-teal-500">
                    <p className="font-bold text-teal-100">8. Noam Shazeer</p>
                    <p className="text-teal-200 text-xs">USA - Gandalf. "Quizá querías decir"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rama 3: Empresas */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 text-amber-50 p-4 rounded-2xl shadow-xl border-4 border-amber-950">
                <h3 className="font-bold text-center mb-3 text-base">EMPRESAS</h3>
                <div className="space-y-2 text-xs">
                  <div className="bg-lime-800/80 p-2 rounded-lg border border-lime-600">
                    <p className="font-bold text-lime-100">Google Research</p>
                    <p className="text-lime-200 text-xs">• Cuna del Transformer</p>
                    <p className="text-lime-200 text-xs">• Edificios 1945/1965</p>
                    <p className="text-lime-200 text-xs">• Perdió a los 8 creadores</p>
                    <p className="text-lime-200 text-xs">• Café del 1965 era mejor</p>
                  </div>
                  <div className="bg-lime-700/80 p-2 rounded-lg border border-lime-500">
                    <p className="font-bold text-lime-100">OpenAI</p>
                    <p className="text-lime-200 text-xs">• Elon Musk cofundó 2015</p>
                    <p className="text-lime-200 text-xs">• Sam Altman aprovechó</p>
                    <p className="text-lime-200 text-xs">• Creó GPT-1, 2, ChatGPT</p>
                    <p className="text-lime-200 text-xs">• Łukasz trabaja allí</p>
                  </div>
                  <div className="bg-lime-700/80 p-2 rounded-lg border border-lime-500">
                    <p className="font-bold text-lime-100">Nvidia</p>
                    <p className="text-lime-200 text-xs">• Chips de entrenamiento</p>
                    <p className="text-lime-200 text-xs">• Valoración: $3.4 trillones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rama 4: Startups */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 text-amber-50 p-4 rounded-2xl shadow-xl border-4 border-amber-950">
                <h3 className="font-bold text-center mb-3 text-base">STARTUPS</h3>
                <div className="space-y-1 text-xs">
                  <div className="bg-green-800/80 p-1.5 rounded-lg border border-green-600">
                    <p className="font-bold text-green-100">Character AI</p>
                    <p className="text-green-200 text-xs">Noam - Google $2.7B</p>
                  </div>
                  <div className="bg-green-800/80 p-1.5 rounded-lg border border-green-600">
                    <p className="font-bold text-green-100">Adept AI</p>
                    <p className="text-green-200 text-xs">Ashish/Niki - Amazon $1B</p>
                  </div>
                  <div className="bg-green-700/80 p-1.5 rounded-lg border border-green-500">
                    <p className="font-bold text-green-100">Essential AI</p>
                    <p className="text-green-200 text-xs">Ashish/Niki - Automatizar</p>
                  </div>
                  <div className="bg-green-700/80 p-1.5 rounded-lg border border-green-500">
                    <p className="font-bold text-green-100">Inceptive</p>
                    <p className="text-green-200 text-xs">Jakob - Vacunas con IA</p>
                  </div>
                  <div className="bg-emerald-800/80 p-1.5 rounded-lg border border-emerald-600">
                    <p className="font-bold text-emerald-100">Sakana AI</p>
                    <p className="text-emerald-200 text-xs">Llion - IA + Naturaleza</p>
                  </div>
                  <div className="bg-emerald-800/80 p-1.5 rounded-lg border border-emerald-600">
                    <p className="font-bold text-emerald-100">Cohere</p>
                    <p className="text-emerald-200 text-xs">Aidan - $5.5B empresas</p>
                  </div>
                  <div className="bg-emerald-700/80 p-1.5 rounded-lg border border-emerald-500">
                    <p className="font-bold text-emerald-100">Near Protocol</p>
                    <p className="text-emerald-200 text-xs">Illia - Blockchain $6B</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ESPACIO PARA LÍNEAS */}
        <div className="w-full h-32 relative">
          {/* Línea vertical convergente */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-amber-950 z-0"
            style={{ top: '0', height: '80px' }}></div>

          {/* Barra horizontal para 3 raíces */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-2 bg-amber-950 z-0"
            style={{ top: '80px', width: '800px' }}></div>

          {/* Líneas verticales a cada raíz */}
          <div className="absolute z-0" style={{ top: '82px', left: 'calc(50% - 267px)', width: '2px', height: '46px', background: '#78350f' }}></div>
          <div className="absolute z-0" style={{ top: '82px', left: 'calc(50% - 1px)', width: '2px', height: '46px', background: '#78350f' }}></div>
          <div className="absolute z-0" style={{ top: '82px', left: 'calc(50% + 265px)', width: '2px', height: '46px', background: '#78350f' }}></div>
        </div>

        {/* Información de raíces - 3 bloques */}
        <div className="relative z-10 w-full max-w-6xl mb-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-stone-800 to-stone-900 text-amber-100 p-5 rounded-2xl shadow-xl border-4 border-stone-950">
              <p className="font-bold text-center mb-3 text-amber-300 text-base">CONTEXTO 2017</p>
              <p className="text-xs text-amber-200">• IA completamente estancada</p>
              <p className="text-xs text-amber-200">• Alexa/Siri muy limitados</p>
              <p className="text-xs text-amber-200">• Traductores muy pobres</p>
              <p className="text-xs text-amber-200">• RNNs se liaban con textos largos</p>
              <p className="text-xs text-amber-200">• China parecía adelantada</p>
            </div>

            <div className="bg-gradient-to-br from-stone-800 to-stone-900 text-amber-100 p-5 rounded-2xl shadow-xl border-4 border-stone-950">
              <p className="font-bold text-center mb-3 text-amber-300 text-base">LECCIONES CLAVE</p>
              <p className="text-xs text-amber-200">• Equipos pequeños = más potentes</p>
              <p className="text-xs text-amber-200">• Deadlines impulsan logros</p>
              <p className="text-xs text-amber-200">• Dilema del innovador (Google)</p>
              <p className="text-xs text-amber-200">• Perseverancia ante obstáculos</p>
              <p className="text-xs text-amber-200">• Fecha límite: 19 mayo 2017</p>
            </div>

            <div className="bg-gradient-to-br from-stone-800 to-stone-900 text-amber-100 p-5 rounded-2xl shadow-xl border-4 border-stone-950">
              <p className="font-bold text-center mb-3 text-amber-300 text-base">RESULTADOS</p>
              <p className="text-xs text-amber-200">• Modelo básico: 12 horas</p>
              <p className="text-xs text-amber-200">• Superó TODOS los competidores</p>
              <p className="text-xs text-amber-200">• Modelo grande: 3.5 días</p>
              <p className="text-xs text-amber-200">• Mejor que traducción humana</p>
              <p className="text-xs text-amber-200">• Presentado: 6 dic 2017</p>
            </div>
          </div>
        </div>

        {/* Suelo final ampliado con más información */}
        <div className="relative z-10 w-full mt-0">
          <div className="bg-gradient-to-b from-green-800 via-green-900 to-green-950 rounded-t-lg shadow-xl relative overflow-hidden border-4 border-green-950 p-8">
            <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end justify-around px-2 opacity-30">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="w-0.5 bg-gradient-to-t from-green-600 to-green-400" style={{ height: `${Math.random() * 30 + 15}px` }}></div>
              ))}
            </div>

            {/* Hojas decorativas en el suelo */}
            <div className="absolute top-4 left-10 opacity-40">
              <Leaf type="drop" width={40} height={50} color="#4EB14A" rotate={-45} />
            </div>
            <div className="absolute top-8 right-16 opacity-40">
              <Leaf type="ellipse" width={35} height={25} color="#62C559" rotate={60} />
            </div>
            <div className="absolute bottom-16 left-32 opacity-40">
              <Leaf type="irregular" width={30} height={35} color="#3C8E35" rotate={120} />
            </div>
            <div className="absolute bottom-12 right-28 opacity-40">
              <Leaf type="round" width={38} height={38} color="#6BAE3F" rotate={-80} />
            </div>

            <div className="relative z-10 space-y-4">
              <p className="text-amber-50 font-bold text-2xl text-center bg-green-950/80 px-6 py-3 rounded-full border-2 border-green-600 shadow-lg">
                Aquí nació la revolución de la IA Generativa
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto mt-6">
                <div className="bg-amber-900/80 p-4 rounded-xl border-2 border-amber-600">
                  <p className="text-amber-100 font-bold mb-2">Cronología clave:</p>
                  <p className="text-xs text-amber-200">• Mayo 2017: Inicio proyecto</p>
                  <p className="text-xs text-amber-200">• 19 Mayo 2017: Envío del paper</p>
                  <p className="text-xs text-amber-200">• 6 Dic 2017: Presentación NIPS</p>
                  <p className="text-xs text-amber-200">• 2018: Éxodo de Google comienza</p>
                </div>

                <div className="bg-purple-900/80 p-4 rounded-xl border-2 border-purple-600">
                  <p className="text-purple-100 font-bold mb-2">Encuentros clave:</p>
                  <p className="text-xs text-purple-200">• Pasillo edificio 1945: Illia conoce Jakob</p>
                  <p className="text-xs text-purple-200">• Cafetería 1965: Noam se une</p>
                  <p className="text-xs text-purple-200">• La mejor máquina de café de Google</p>
                </div>

                <div className="bg-blue-900/80 p-4 rounded-xl border-2 border-blue-600 col-span-2">
                  <p className="text-blue-100 font-bold mb-2 text-center">Cita del video:</p>
                  <p className="text-sm text-blue-200 italic text-center">
                    "Sin estos 15 folios, ChatGPT no existiría hoy. Sin estos 15 folios, Nvidia no tendría el valor de más de 3.400 millones de dólares en bolsa. Sin estos 15 folios, no podremos movernos en un robotaxi en unos años."
                  </p>
                  <p className="text-xs text-blue-300 text-center mt-2">- Gustavo Entrala, 2024</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-12 bg-gradient-to-b from-amber-900 to-stone-900 rounded-b-lg shadow-lg"></div>
        </div>

      </div>
    </div>
  );
};

export default TransformerTree;