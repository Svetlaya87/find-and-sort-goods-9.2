const URL = 'https://fakestoreapi.com/products';
let divRow = document.querySelector('#goodsPlace');
function render(products) {
    divRow.innerHTML = products.map(item => `

    <div class="cell p-2">
        <div class="card p-2 pt-4 h-100 shadow">
            <img src="${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description.substring(0, 100)}...</p>
            <h4 class='text-end'>$${item.price}</h4>
            </div>
        </div>
    </div>`).join('');
};



(async function(){

    

    let products = await fetch(URL);

        products = await products.json();
        
    

   
    let SortPriceDown = document.getElementById('sortPriceDown');
    let SortPriceUp = document.getElementById('sortPriceUp');
    
    // вывожу сразу картинки с сортировкой по возрастанию
   /* products.sort(
        function(a, b) {
             return a.price - b.price;
        }
    );*/
    render(products);
   

    
    console.log(products);
    
   // функция для сорт по убыванию,  goods параметр- массив с товарами   
    function sortPriceDown(goods){
            SortPriceDown.addEventListener('click', function(){
                goods.sort(
                function(a, b) {
                    return -(a.price - b.price);
                }
            );
            render(goods);
            
        });
    };
    // конец функции сортировки по убыванию
    sortPriceDown(products); // вызов функции по убыванию


    
    
    //функция для сортировки возрастанию goods параметр- массив с товарами 
    function sortPriceUp(goods){
        SortPriceUp.addEventListener('click', function(){
            goods.sort(
                function(a, b) {
                    return a.price - b.price;
                }
            );
            render(goods);    
        
        });
    };
    //конец функции сортировки по возрастанию

    sortPriceUp(products); //вызов функции по возрастанию         
        /***поиск */
        //хотела обернуть эту часть кода в функцию divRow.onload, но почему-то не работает, поэтому убрала
            let searchInput=document.getElementById('searchInput');
            searchInput.addEventListener('input',function(){
                console.log(searchInput.value);
                let s=searchInput.value.toLowerCase();//выражение,которое вводим в строке поиск

                let fiterGoods = products.filter(item=> item.title.toLowerCase().includes(s));
                console.log(fiterGoods);
                render(fiterGoods); 
                sortPriceDown(fiterGoods);
                sortPriceUp(fiterGoods); 



            });


        


})();