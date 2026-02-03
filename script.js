//buttons ----------------------------
let buttonAdd = document.getElementById('btnAjouter');
let buttonSave = document.getElementById('btnSave');
let buttonCancel = document.getElementById('btnCancel');
let search = document.getElementById('search');
let buttonSwitch = document.getElementById('btnSwitch');

//pagination ------
let morePages = document.getElementById('pagination');
let buttonPrev = document.getElementById('btnLeft');
let buttonNext = document.getElementById('btnRight');
let actualPage = document.getElementById('actualPage');
let pagenbr = 1;

//forms ------------------------------
let list = document.getElementById('list');
let modal = document.getElementById('modal');
let table = document.getElementById("tbody");
let elmnts = document.documentElement;

// Events Listners --------------------------------
document.addEventListener('DOMContentLoaded' , () =>{
    if(!localStorage.getItem('requests'))
        localStorage.setItem('requests', JSON.stringify([]));

    if(!localStorage.getItem('id'))
        localStorage.setItem('id', '0');

    displayP(JSON.parse(localStorage.getItem('requests')))
})

buttonCancel.addEventListener('click', () => {
    modal.classList.toggle('hidden');
    list.classList.toggle('hidden');
});

buttonAdd.addEventListener('click', () => {
    document.getElementById('nom').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telephone').value = '';
    document.getElementById('motif').value = '';
    document.getElementById('date').value = '';
    modal.classList.toggle('hidden');
    list.classList.toggle('hidden');
});

buttonSave.addEventListener('click', () => {
    if((document.getElementById('nom').value === '')||(document.getElementById('email').value === '')||(document.getElementById('telephone').value === '')||(document.getElementById('motif').value === '')||(document.getElementById('date').value === ''))
        {
            let msg = document.getElementById('message');
            setTimeout(() => {
                msg.classList.remove('-translate-x-full','opacity-0');
                msg.classList.add('translate-x-0','opacity-100');
            },);
            setTimeout(() => {
                msg.classList.remove('translate-x-0','opacity-100');
                msg.classList.add('-translate-x-full','opacity-0');
            }, 3000)
            return;
        }
    let requests = JSON.parse(localStorage.getItem('requests'));
    let Id = idcount();
    requests.push({
        id: Id,
        nom: document.getElementById('nom').value,
        email: document.getElementById('email').value,
        telephone: document.getElementById('telephone').value,
        motif: document.getElementById('motif').value,
        date: document.getElementById('date').value
    });
    localStorage.setItem('requests' ,JSON.stringify(requests));
    list.classList.toggle('hidden');
    modal.classList.toggle('hidden');
    if((requests.length > 5)&&(morePages.classList.contains('invisible')))
        morePages.classList.remove('invisible')
    displayP(requests);
});

buttonNext.addEventListener('click', () =>{
    let requests = JSON.parse(localStorage.getItem('requests'));
    let totPages = Math.ceil(requests.length/5);
    if(buttonPrev.classList.contains('invisible'))
        buttonPrev.classList.remove('invisible');
    pagenbr++;
    if (pagenbr == totPages)
        buttonNext.classList.add('invisible');
    table.innerHTML = '';
    paginate(requests, pagenbr);  
    actualPage.textContent = pagenbr;
});

buttonPrev.addEventListener('click', () =>{
    let requests = JSON.parse(localStorage.getItem('requests'));
    let totPages = Math.ceil(requests.length/5);
    if(buttonNext.classList.contains('invisible'))
        buttonNext.classList.remove('invisible');
    pagenbr--;
    if (pagenbr == 1)
        buttonPrev.classList.add('invisible');
    table.innerHTML ='';
    paginate(requests, pagenbr);  
    actualPage.textContent = pagenbr;
});

search.addEventListener('input', () =>{
    let reqs = JSON.parse(localStorage.getItem('requests'));
    const mot = search.value.toLowerCase();
    let resultat = reqs.filter(Element =>{
        const el = Element.nom.toLowerCase();
        return el.includes(mot);
    });
    displayP(resultat);
});

document.getElementById('filter').addEventListener('change', () =>{
    console.log('cliquedd')
    const mot = document.getElementById('filter').value;
    let reqs = JSON.parse(localStorage.getItem('requests'));
    let resultat = reqs.filter(el =>{
        return mot === "" || el.motif === mot;
    });
    displayP(resultat);
});

buttonSwitch.addEventListener('click', () =>{
    console.log('swiitch1')
    elmnts.classList.toggle('dark');
    const isDark = elmnts.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    buttonSwitch.textContent = isDark ? "☀️" : "🌙";
    console.log('swiitch')

})

// functions -------------------------------
function paginate(tab, pageNumber) {
    const onepage = 5;
    const start = (pageNumber - 1) * onepage;
    const end = start + onepage;
    onePage(tab.slice(start, end));
}

function displayP(reqs){
    table.innerHTML = '';
    let n = reqs.length
    switch(true){
        case n == 0:
            table.innerHTML =  `<tr>
                                    <td colspan="7" class="py-20 text-center">
                                        <div class="flex flex-col items-center opacity-50">
                                            <p class="font-medium">La liste est vide</p>
                                        </div>
                                    </td>
                                </tr>`;
            if(!morePages.classList.contains('invisible'))
                morePages.classList.add('invisible')
            break;
        case n <= 5:
            onePage(reqs);
            if(!morePages.classList.contains('invisible'))
                morePages.classList.add('invisible')
            break;
        case n > 5:
            paginate(reqs, pagenbr); 
            if(morePages.classList.contains('invisible'))
                morePages.classList.remove('invisible');
            if(!buttonPrev.classList.contains('invisible')&&(pagenbr == 1))
                buttonPrev.classList.add('invisible');
            break;
    }
}

function onePage(tab){
    tab.forEach(el => {
        const tr = document.createElement('tr');
        tr.className = 'border-t border-white/20 hover:bg-white/20 transition-colors'
        tr.innerHTML = `<td class="px-6 py-4">${el.id}</td>
                        <td class="px-6 py-4">${el.nom}</td>
                        <td class="px-6 py-4">${el.telephone}</td>
                        <td class="px-6 py-4">${el.email}</td>
                        <td class="px-6 py-4">${el.motif}</td>
                        <td class="px-6 py-4">${el.date}</td>
                        <td class="px-6 py-4"><button id="suppreme" onclick="deleteTr(this)" class="bg-red-100 dark:bg-red-800 text-red-300 px-3 py-1 rounded-full text-xs font-bold">Suppreme</button></td>`;
        table.appendChild(tr);
    });
}

function idcount(){
    let ID = JSON.parse(localStorage.getItem('id'));
    ID++;
    localStorage.setItem('id', JSON.stringify(ID));
    return ID;
}

function deleteTr(btn){
    let requests = JSON.parse(localStorage.getItem('requests'));
    const tr = btn.closest("tr")
    const indexs = tr.querySelectorAll("td");
    requests = requests.filter(rq => rq.id != indexs[0].textContent);
    localStorage.setItem('requests', JSON.stringify(requests));
    if((requests.length <= 5)&&(!morePages.classList.contains('invisible')))
        morePages.classList.add('invisible')
    displayP(requests);
}