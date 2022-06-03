if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready() {
var RemZenbilBtn = document.getElementsByClassName('btn-remove')
for (var i = 0; i < RemZenbilBtn.length; i++) {
	var btn = RemZenbilBtn[i]
	btn.addEventListener('click', remov)

}
console.log(RemZenbilBtn);


var quantityInputs = document.getElementsByClassName('zenbil-item-input')
for ( var i = 0; i <quantityInputs.length; i++) {
	var input = quantityInputs[i]
	input.addEventListener('change' , quantityChanged)
}


var addButton =document.getElementsByClassName('add-btn')
for (var i = 0; i < addButton.length; i++) {
    var addBtn = addButton[i]
    addBtn.addEventListener('click', addToZenbil)
}
console.log(addButton);
}





function addToZenbil(event) {
    var addbtn =event.target
    var shopItem = addbtn.parentElement.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText
    var waga = shopItem.getElementsByClassName('waga')[0].innerText
    
    addItemToZenbil(title, waga)
    updZenbilTotal()
}
function addItemToZenbil(title,waga) {
    var zenbilRow = document.createElement('div')
    zenbilRow.classList.add('zenbil-row')
    var zenbilItem = document.getElementsByClassName('zenbil')[0]
    var zenbilRowContents = `
    <div class="zenbil-item">
      <span >${title}</span>
      <span class="zenbil-waga">${waga}</span>
      
      <span ><input class="zenbil-item-input" type="number" min="1" value='1'></span>
      <span><button type="button" class="btn-remove">remove</button></span>
      

    </div>

    `
    zenbilRow.innerHTML = zenbilRowContents
    zenbilItem.append(zenbilRow)
    zenbilRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    zenbilRow.getElementsByClassName('zenbil-item-input')[0].addEventListener('change', quantityChanged)


}



function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updZenbilTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updZenbilTotal()
}










function remov(event) {
	{
	var btnClicked = event.target
	btnClicked.parentElement.parentElement.remove()
	updZenbilTotal()
	}
}



function updZenbilTotal() {
	var zenbilitemcontainer = document.getElementsByClassName('zenbil')[0]
	
	var cartrows =zenbilitemcontainer.getElementsByClassName ('zenbil-item')
	var total = 0
	for (var i = 0; i < cartrows.length; i++) {
		var cartrow = cartrows[i]
		var wagaelement = cartrow.getElementsByClassName('zenbil-waga')[0]
		var quantityelement = cartrow.getElementsByClassName('zenbil-item-input')[0]
		var waga= parseFloat(wagaelement.innerText.replace('birr', ''))
		var quantity = quantityelement.value
		total = total + (waga * quantity)
		
	}
	document.getElementsByClassName('total-waga')[0].innerText = total
}
