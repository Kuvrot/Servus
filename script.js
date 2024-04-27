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

      let command = [];

      if (commands[0][i] == "servus"|| commands[0][i] == "cervus" || commands[0][i] == "bus" || commands[0][i] == "servers" || commands[0][i] == "servos" || commands[0][i] == "fergus" || commands[0][i] == "sorbus" || commands[0][i] == "ser" || commands[0][i] == "servir")
      {
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

        let l_bedroom = 0;
        let l_living = 0;
        let l_garden = 0;
        let l_fan = 0;
        let l_courtains = 0;
        let l_alarm = 0;
        let l_cameras = 0;
        let house  = false;

        if (commands[0][i+1] == "encender" || commands[0][i+1] == "prender"){
          if (commands[0][i+2] == "recámara" || commands[0][i+2] == "habitación" || commands[0][i+2] == "cuarto"){
              l_bedroom = 1;
          }

          if (commands[0][i+2] == "sala"){
            l_living = 1;
          }

          if (commands[0][i+2] == "jardin" || commands[0][i+2] == "jardín" ){
            l_garden = 1;
          }

          if (commands[0][i+2] == "ventilador"){
            l_fan = 1;
          }

          if (commands[0][i+2] == "cortinas"){
            l_courtains = 1;
          }

          if (commands[0][i+2] == "cámaras" || commands[0][i+2] == "camaras" || commands[0][i+2] == "vigiliancia"){
            l_cameras = 1;
          }

          house = true;
        }

        if (commands[0][i+1] == "apagar"){
          if (commands[0][i+2] == "recámara" || commands[0][i+2] == "habitación" || commands[0][i+2] == "cuarto"){
              l_bedroom = 0;
          }

          if (commands[0][i+2] == "sala"){
            l_living = 0;
          }

          if (commands[0][i+2] == "jardin" || commands[0][i+2] == "jardín" ){
            l_garden = 0;
          }

          if (commands[0][i+2] == "ventilador"){
            l_fan = 0;
          }

          if (commands[0][i+2] == "cortinas"){
            l_courtains = 0;
          }

          if (commands[0][i+2] == "cámaras" || commands[0][i+2] == "camaras" || commands[0][i+2] == "vigiliancia"){
            l_cameras = 0;
          }

          house = true;
        }

        if (house){
            fetch('https://65f0f7ddda8c6584131ca63f.mockapi.io/house/1', {
            method: 'PUT',
            body: JSON.stringify({
              luzRecamara: l_bedroom,
              luzSala : l_living,
              luzJardin : l_garden,
              ventilador : l_fan,
              cortinas : l_courtains,
              alarma : l_alarm,
              camaras : l_cameras
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          })
          .then(response => response.json())
          .then(data => console.log(data));
        }

        fetch('https://65f0f7ddda8c6584131ca63f.mockapi.io/Orders', {
        method: 'POST',
        body: JSON.stringify({
          order: commands[0]
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      .then(response => response.json())
      .then(data => console.log(data));

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

