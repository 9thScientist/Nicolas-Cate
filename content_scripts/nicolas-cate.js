function nicolasCate(request, sender, sendResponse) {
    changeEveryImage(request.imageURL);

    browser.runtime.onMessage.removeListener(nicolasCate);
    //chrome.runtime.onMessage.removeListener(nicolasCate);
}

/*
 * Procura todas as imagens na pagina,
 * substitui pela imagem dada
 */
function changeEveryImage(imageURL) {
    var images = document.getElementsByTagName('img');
    var r = imageURL === "random";
    
    for (let image of images) {
        image.src = (r) ? cat() : imageURL; 
    }
}

function cat(){
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://thecatapi.com/api/images/get?format=xml&type=jpg", false);
  xhr.send( null );

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xhr.responseText,"text/xml");

  return xmlDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue;
}

/*
 * Sempre que recebe uma mensagem chama a função nicolasCate
 */
browser.runtime.onMessage.addListener(nicolasCate);
//chrome.runtime.onMessage.addListener(nicolasCate);
