const url = window.location.search.split("=").at("-1")
const DATA =[]

fetch(`http://localhost:3000/${url}`)
.then(res => res.json())
.then(meh => {
    DATA.push(...meh)
    show()
})

.catch(err => {
    alert("Axtarisiniz uzre netice tapilmadi!")
})

function show() {
    let kod = '';
    DATA.forEach(card => {
        kod += `
        <div class="lg:flex justify-center items-center">
            <div onclick="popup('${card.img}', '${card.title}', '${card.price}', '${card.id}')" class="w-[310px] h-[350px] w-full m-3 shadow-md">
                <img src="${card.img}" alt="" class="object-cover object-center w-full h-[200px] ">
                <div class="justify-between p-2 space-y-4">
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <h2 class="text-xl font-bold ">${card.title}</h2>
                        <button type="button" class="bg-green-600 whitespace-nowrap h-[40px] text-white uppercase font-bold p-2 rounded-md">bunu seç</button>
                      </div>
                        <p class="dark:text-gray-800">${card.composition}</p>
                    </div>
                </div>
            </div>
        </div>`;
    });
    cards.innerHTML = kod;
  }