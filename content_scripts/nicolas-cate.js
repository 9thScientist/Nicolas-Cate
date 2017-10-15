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
    
    for (let image of images) {
        image.src = imageURL; 
    }
}

/*
 * Sempre que recebe uma mensagem chama a função nicolasCate
 */
browser.runtime.onMessage.addListener(nicolasCate);
//chrome.runtime.onMessage.addListener(nicolasCate);
