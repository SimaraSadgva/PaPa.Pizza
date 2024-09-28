// async function fetchData(url) {
//     const res = await fetch(url);
//     return res.json()
// }

// let DATA = []

// async function datalar() {
//     DATA = await fetchData("https://raw.githubusercontent.com/TheOksigen/purfect_data/refs/heads/main/papajosn.json");
//     show()
// }



let cards = document.querySelector('.cards')


// function show() {
//     let kod = '';
//     DATA.forEach(card => {
//         kod += `
//         <div class="lg:flex justify-center items-center">
//             <div onclick="popup('${card.img}', '${card.name}', '${card.price}', '${card.id}')" class="w-[310px] h-[350px] w-full m-3 shadow-md">
//                 <img src="${card.img}" alt="" class="object-cover object-center w-full h-[200px] ">
//                 <div class="justify-between p-2 space-y-4">
//                     <div class="space-y-2">
//                       <div class="flex justify-between">
//                         <h2 class="text-xl font-bold ">${card.name}</h2>
//                         <button type="button" class="bg-green-600 whitespace-nowrap h-[40px] text-white uppercase font-bold p-2 rounded-md">bunu seç</button>
//                       </div>
//                         <p class="dark:text-gray-800">${card.composition}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>`;
//     });
//     cards.innerHTML = kod;
//   }
//   show()
//   datalar()

  const popupDiv = document.getElementById("popupDiv")

function popup(img, name, price, id) {
    popupDiv.innerHTML = `
        <div class="grid place-items-center fixed h-full w-full top-0 left-0 inset-0 z-[90] bg-[#00000098]"> 
            <div class="border border-red-700 max-w-[400px] p-4 font-bold bg-white">
                <div onclick="secbagla()" class="text-right pb-2 cursor-pointer">Bağla 🗙</div>
                <div class="w-full">
                    <img src="${img}" alt="">
                    <h1 class="font-bold text-[20px]">${name}</h1>
                    <div class="flex rounded my-2">
                        <a class="bg-green-500 w-[50%] text-center text-white py-1" href="">Ənənəvi</a>
                        <a class="bg-gray-200 w-[50%] text-center text-green-700 py-1" href="">Nazik</a>
                    </div>
                    <div class="py-1 font-semibold w-full">
                        <select class="bg-[#AD0F14] outline-none px-1 text-[15px] text-white w-full h-[30px]">
                            <option value="5.5">Mini pizza, 15 sm - 5.5 M </option>
                            <option value="11">Kiçik, 23 sm - 11 M</option>
                            <option value="17">Orta, 30 sm - 17 M</option>
                            <option value="21">Böyük, 35 sm - 21 M</option>
                        </select>
                    </div>
                    <div class="sebet-mehsulelave flex items-start lg:w-[80%] w-[90%] justify-start py-4">
                        <div class="flex items-start w-full justify-start flex-row">
                            <button onclick="hesabla(-1, ${price})" id="btnInc" class="w-[29px] h-[29px] bg-gray-400 text-black text-[14px] font-bold">➖</button>
                            <span id="countDiv" class="bg-gray-200 flex items-center justify-center w-[49px] h-[29px] text-black text-[19px] font-bold">1</span>
                            <button onclick="hesabla(1, ${price})" class="w-[29px] h-[29px] bg-green-500 text-white text-[14px] font-bold">➕</button>
                        </div>
                        <p id="qiymetntc" class="text-black text-[15px] font-bold">${price}₼</p>
                    </div>
                    <div class="flex justify-between">
                        <div class="text-center cursor-pointer relative">
                            <i class="text-[25px] fa-solid fa-basket-shopping"></i>
                            <p onclick ="toplam()" class="font-bold">0 ₼</p>
                            <div class="absolute top-0 right-0 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">0</div>
                        </div>
                        <div>
                            <button onclick="addBasket('${img}', '${name}', ${price}, '${id}')" class="bg-green-500 p-2 text-white">SƏBƏTƏ ƏLAVƏ ET</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function hesabla(arg, price) {
    const countDiv = document.querySelector("#countDiv")
    const qiymetntc = document.querySelector("#qiymetntc")
    let deyer = arg + +countDiv.innerHTML
    console.log(deyer);
    
    if (deyer < 1) {
        countDiv.innerHTML = 1
        document.getElementById("btnInc").disabled = true
    } else {
        document.getElementById("btnInc").disabled = false
        countDiv.innerHTML = deyer 
        qiymetntc.innerHTML = deyer * price + `₼`
    }
}

let basket = []
function addBasket(img, name, price, id) {
    const sideBar = document.getElementById("sideBar")
    const obj = {
        id, img, name, price, count: +countDiv.innerHTML, opsi: price * +countDiv.innerHTML
    }

    const element = basket.find(item => item.id == id)

    if (!element) {
        basket.push(obj)
    } else {
        element.count += +countDiv.innerHTML
    }

    sebeteYaz()

}



function toggleSideBar() {
    const sideBar = document.getElementById("sideBar");
    sideBar.classList.toggle("hidden"); 
    if (!sideBar.classList.contains("hidden")) {
        sebeteYaz();
    }
}

function closeSideBar() {
    const sideBar = document.getElementById("sideBar");
    sideBar.classList.add("hidden"); 
}

function sebeteYaz() {
    const sideBar = document.getElementById("sideBar");
    sideBar.innerHTML = `
        <div class="text-right">
            <i onclick="closeSideBar()" class="fa-solid fa-circle-xmark cursor-pointer"></i>
        </div>
    `;
    
    basket.map(item => {
        sideBar.innerHTML += `
            <div class="border border-[1px] flex">
                <i onclick="deleteBasket('${item.id}')" class="fa-solid fa-circle-xmark text-right"></i>
                <img onclick="deleteBasket('${item.id}')" class="w-[40%]" src="${item.img}" alt="">
                <div>
                    <p>Count: ${item.count}</p>
                    <p>Name: ${item.title}</p>
                    <p>Price: ${item.opsi}</p>
                </div>
            </div>
        `;
    });

    sideBar.classList.remove("hidden");
}


function secbagla() {
    popupDiv.innerHTML = ""
}

function deleteBasket(id) {
    basket = basket.filter(item => item.id != id);
    sebeteYaz()
}

//umumi mebleg

function toplam() {
    let qiymet =  basket.reduce((acc, item) =>  acc += (item.opsi), 0)
    console.log(qiymet);
}

function getPage() {
    window.location.href = '../index.htm';
}

