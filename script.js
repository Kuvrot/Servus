// Verificar si el navegador soporta reconocimiento de voz
if ("webkitSpeechRecognition" in window){
  const recognition = new webkitSpeechRecognition();
  const resultDiv = document.getElementById("result");

  // Establecer el idioma de reconocimiento de voz
  recognition.lang = "es-ES";

  // Evento cuando la voz es detectada
  recognition.onresult = function (event) {
    const result = event.results[0][0].transcript; // Obtener el texto reconocido
    resultDiv.textContent = "Tuus servus hic est!, ego intellego: \"" + result + "\"";
    
    var commands = [];

    res = result.toLowerCase();
    res = res.replace(/[.,?!¿¡]/g , '');
    commands.push(res.split(' '));
    console.log(commands[0]);
    
    for (let i = 0; i < commands.length; i++){

      if (commands[0][i] == "servus"|| commands[0][i] == "cervus" || commands[0][i] == "bus" || commands[0][i] == "servers" || commands[0][i] == "servos" || commands[0][i] == "fergus" || commands[0][i] == "sorbus" || commands[0][i] == "ser" || commands[0][i] == "servir")
      {

        fetch('https://65f0f7ddda8c6584131ca63f.mockapi.io/Orders', {
        method: 'POST',
        body: JSON.stringify({
          order: commands[0][i+1]
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
  .then(response => response.json())
  .then(data => console.log(data));


        if (commands[0][i + 1] == 'poner' || commands[0][i + 1] == 'pon')
        {
          if (commands[0][i + 2] == 'música')
          {
            window.open("https://www.youtube.com/watch?v=spytsVjyARw&ab_channel=Kuvrot");
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
        }else if (commands[0][i + 1] == 'pregunta' || commands[0][i + 1] == 'buscar' || commands[0][i + 1] == 'busca')
        {
            let url = "https://www.google.com/search?q=";
            for (let j = i+2; j < commands[0].length; j++)
            {
              url = url + commands[0][j] + "+";
            }
            
            console.log(url);
            window.open(url);

        }else if (commands[0][i + 1] == 'adiós' || commands[0][i + 1] == 'bye' || commands[0][i + 1] == 'vale'){

          window.close();
          
        }else if (commands[0][i + 1] == 'nuevo' || commands[0][i + 1] == 'nueva'){
          window.open("https://google.com");
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

