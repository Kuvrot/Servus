// Verificar si el navegador soporta reconocimiento de voz
if ("webkitSpeechRecognition" in window){
  const recognition = new webkitSpeechRecognition();
  const resultDiv = document.getElementById("result");

  // Establecer el idioma de reconocimiento de voz
  recognition.lang = "es-ES";

  // Evento cuando la voz es detectada
  recognition.onresult = function (event) {
    const result = event.results[0][0].transcript; // Obtener el texto reconocido
    resultDiv.textContent = "Tuus servus hic est!, ego intellego: " + result;
    
    var commands = [];

    res = result.toLowerCase();
    res = res.replace(/[.,]/g , '');
    commands.push(res.split(' '));
    console.log(commands[0]);
    
    for (let i = 0; i < commands.length; i++){

      if (commands[0][i] == "servus"|| commands[0][i] == "cervus" || commands[0][i] == "bus" || commands[0][i] == "ver" || commands[0][i] == "servos" || commands[0][i] == "fergus")
      {
        if (commands[0][i + 1] == 'poner' || commands[0][i + 1] == 'pon')
        {
          if (commands[0][i + 2] == 'música')
          {
            window.open("https://www.youtube.com/watch?v=1OgAmsGxYYM&ab_channel=smalin");
          }else
          {

            let url = "https://www.youtube.com/results?search_query=";
      
            for (let j = i+2; j < commands[0].length; j++)
            {
                url = url + commands[0][j] + "+";
            }
            
            console.log(url);
            window.open(url);
          }
        }else if (commands[0][i + 1] == 'pregunta' || commands[0][i + 1] == 'buscar')
        {
            let url = "https://www.google.com/search?q=";
            for (let j = i+2; j < commands[0].length; j++)
            {
              url = url + commands[0][j] + "+";
            }
            
            console.log(url);
            window.open(url);

        }else if (commands[0][i + 1] == 'adiós' || commands[0][i + 1] == 'bye'){

          window.close();
          
        }

        break;
      }
    }  
    startListening();
  };

  // Evento de error
  recognition.onerror = function (event) {
    console.error("Error de reconocimiento de voz:", event.error);
    startListening();
  };

  function  startListening(){

    setTimeout(function() {
      recognition.start();
    }, 1000);

  }

  // Botón para iniciar el reconocimiento de voz

  recognition.start();
}

