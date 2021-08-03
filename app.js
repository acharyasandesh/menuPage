var data = null;
function callAjax(){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'menu.json', false);
    xhr.onload = function(){
        data = JSON.parse(xhr.responseText);
    }
    xhr.send();
}

const menuContainer= document.querySelector('.menu-container');

const btnContainer = document.querySelector('.btn-container');

//load Items
window.addEventListener('DOMContentLoaded', function(){
    callAjax();
    displayMenuItems(data);
    createBtns();
})

function createBtns(){
    const categories = data.map(function(item){
        return item.category;
    });

    const uniqueCategories = data.reduce(function(values, item){
        if(!values.includes(item.category)){
            values.push(item.category);
        }
        return values;
    },['all'])

    // let uniqueCategories = ['all'];

    // //this is long method we can use reduce method instead
    // for (i in categories)
    // {
    //     if(!uniqueCategories.includes(categories[i])){
    //         uniqueCategories.push(categories[i]);
    //     }
    // }
    // console.log(uniqueCategories);
    const categoryBtns = uniqueCategories.map(function(category){
        return `<button class="filter-btn" type="button" data-id="${category}">${category}</button>`;
    })
    .join("");
    btnContainer.innerHTML = categoryBtns;
    const filterBtns= document.querySelectorAll('.filter-btn');

    //filter items
    filterBtns.forEach(function(btn){
        btn.addEventListener('click', function(e){
        const category = e.currentTarget.dataset.id;
        const menuCategory = data.filter(function(menuItem){
            if(menuItem.category === category){
                    return menuItem;
            }
        });
            if(category ==='all'){
                    displayMenuItems(data);
            }
            else{
                    displayMenuItems(menuCategory);
            }
        });
    });
}

function displayMenuItems(menuItems){
    let displayMenu = menuItems.map(function(item){
        return `<article class="menu-item">
        <img src=${item.img} alt=${item.title} class="photo"/>
        <div class="item-info">
            <header>
                <h4>${item.title} <span class="price">$${item.price}</span></h4>
            </header>
            <p class="item-text">${item.desc}</p>
        </div>
    </article>`;
    });
    displayMenu = displayMenu.join("");
    menuContainer.innerHTML = displayMenu;
}