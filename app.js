const choices = Array.from(document.querySelectorAll('.celebrities>ul:first-child>li'));
const cart = document.querySelector('.allitem')
const buttonCart = document.querySelector('.cart>button')
const allButtonsAdd = Array.from(document.querySelectorAll('.boutique>ul>li>button'))
const allPrices = Array.from(document.querySelectorAll('.boutique>ul>li>p'))
const allItems = Array.from(document.querySelectorAll('.boutique>ul>li>h4'))
const ul = document.querySelector('.ulallitem')
const errormoney = document.querySelector('.errormoney')
const successfullybuy = document.querySelector('.successfullybuy')
const h2Cart = document.querySelector('.cart>h2')

let allButtons = document.querySelectorAll('.buttonremoveitem')
let allItemsList = [];
let baseFortune = document.querySelector('.basefortune');
let spent = document.querySelector('.spent');
let total = document.querySelector('.total');
let allArticles = [];
let actualDiv = choices[1];
let baseFortuneMoney = baseFortune.innerText;
let spentMoney = 0;
let totalMoney = 211000000000;

cart.style.left = "-300px";
errormoney.style.left = "-30%"
successfullybuy.style.left = "-30%"

init()

function init(){
    selectMoney();
    openCloseCart();
    newItemCart();
}

function selectMoney(){
    choices.forEach((div) =>{

        div.addEventListener('click',()=>{
            if(actualDiv !== null){
                actualDiv.classList.remove('divClicked');
            }
            actualDiv = div;
            div.classList.add('divClicked')
            let baseMoney = document.querySelector('.divClicked>p');
            total.innerText = `Total: ${baseMoney.innerText}`;
            baseFortune.innerText = `Base Fortune: ${baseMoney.innerText}`;
            resetParameters();

        })


    })
}

function openCloseCart(){
    buttonCart.addEventListener('click',()=>{
        if(cart.style.left === "-300px"){
            cart.style.left = "0px";
        } else {
            cart.style.left = "-300px";
        };

    })
    
    h2Cart.addEventListener('click',()=>{
       cart.style.left = "-300px";  
    })
}

function newItemCart{
    allButtonsAdd.forEach((btn)=>{
        btn.addEventListener('click',()=>{

            price = allPrices[allButtonsAdd.indexOf(btn)];
            itemName = allItems[allButtonsAdd.indexOf(btn)];
            newprice = price.innerText.replaceAll('.','');
            newprice = newprice.replaceAll('$','');
            console.log(parseInt(newprice));
            console.log(totalMoney);
            if(parseInt(newprice) > parseInt(totalMoney)){
                console.log('YES');
                errormoney.style.left = "0";
                setTimeout("callBackError(errormoney)",2000)
            } else{

                var li = document.createElement('li');
                li.setAttribute('data-key',Date.now())
                var newItemPrice = document.createElement('p');
                newItemPrice.innerText = price.innerText;
                newItemPrice.style.color = "#333"
                newItemPrice.style.paddingBottom = "20px"
                newItemPrice.style.display = "inline-block";

                var newItemName = document.createElement('p');
                newItemName.innerText = `${itemName.innerText}: `;
                newItemName.style.color = "#333"
                newItemName.style.display = "inline-block";
                newItemName.style.marginRight = "5px";

                var button = document.createElement('button')
                button.innerText = "❌"
                button.className = 'buttonremoveitem'
                button.style.background = "transparent"
                button.style.position = "absolute"
                button.style.margin = "0";
                button.style.padding = "0 0 0 5px";
                button.setAttribute('data-key',Date.now())

                button.addEventListener('click',delItem);
                li.append(newItemName);
                li.append(newItemPrice);
                li.append(button)
                ul.append(li)
                allItemsList.push(li)

                buyItem(newprice);
                successfullybuy.style.left = "0";
                setTimeout("callBackError(successfullybuy)",2000)
            }

        })
    })
}

function delItem(e){
    allItemsList.forEach((el) =>{
        if(e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){
            el.remove();
            let prix = el.getElementsByTagName('p')[1].innerText
            newprice = prix.replaceAll('.','');
            newprice = newprice.replaceAll('$','');
            totalMoney+=parseInt(newprice);
            spentMoney-=parseInt(newprice);
            total.innerText = `Total: ${numberWithDot(totalMoney)}$`;
            spent.innerText = `Spent: ${numberWithDot(spentMoney)}$`;
        }
    })
}

function resetParameters(){
    spentMoney = 0;
    totalMoney = total.innerText.replaceAll('.','');
    totalMoney = totalMoney.replaceAll('$','');
    totalMoney = totalMoney.replaceAll('Total: ','');
    let allLi = document.querySelectorAll(".ulallitem>li")
    allLi.forEach((div)=>{
        div.remove();
    })

}

function buyItem(price){
    let priceInt = parseInt(price);
    spentMoney+=priceInt;
    totalMoney-=price;
    total.innerText = `Total: ${numberWithDot(totalMoney)}$`;
    spent.innerText = `Spent: ${numberWithDot(spentMoney)}$`;
}

function numberWithDot(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function callBackError(e){
    console.log(e);
    e.style.left = "-30%";
}
