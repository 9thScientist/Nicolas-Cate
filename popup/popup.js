document.getElementById('nicolas').addEventListener("click", () => {
    changeImage('nicolas');
});

document.getElementById('cat').addEventListener("click", () => {
    changeImage('cat')
});

document.getElementById('reset').addEventListener("click", () => {
    browser.tabs.reload();
    //chrome.tabs.reload();
});

/*
 * Função chamada sempre que um botão é clicado.
 * Escolhe a imagem a alterar e procede à substituição.
 */
function changeImage(replacement) {
    // Buscar o URL da imagem escolhida
    var image = getImageURL(replacement);
	
    // Toma partido da permissão tabs e
    // injeta nicolas-cate.js na tab ativa
    browser.tabs.executeScript(null, {
    //chrome.tabs.executeScript(null, {
	file: "/content_scripts/nicolas-cate.js"
    });

    // Browser.tabs.query devolve todas as tabs que respeitem
    // um dado parâmetro
    browser.tabs.query({
    //chrome.tabs.query({
	active: true,  // A tab tem de estar ativa na sua janela
	currentWindow: true // A tab deve estar na janela ativa
    }).then((tabs) => { 
    //},(tabs) => { 
	// Quando a query retornar a lista de tabs,
	// enviamos o URL da imagem escolhida
	browser.tabs.sendMessage(tabs[0].id, {imageURL: image});
	//chrome.tabs.sendMessage(tabs[0].id, {imageURL: image});
    });
}

/* 
 * Devolve o URL da imagem pedida
 */
function getImageURL(image) {
    switch(image) {
	case "nicolas": 
	    return browser.extension.getURL("/images/nicolas.jpg");
	    //return chrome.extension.getURL("/images/nicolas.jpg");
	case "cat":
	    return browser.extension.getURL("/images/cat.jpg");
	    //return chrome.extension.getURL("/images/cat.jpg");
    }
}
