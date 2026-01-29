//buttons ----------------------------
let buttonAdd = document.getElementById('btnAjouter');
let buttonSave = document.getElementById('btnSave');
let buttonCancel = document.getElementById('btnCancel');
let search = document.getElementById('search');
let filter = document.getElementById('filter');


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
            setTimeout(() => {
                msg.classList.remove('-translate-x-full','opacity-0');
                msg.classList.add('translate-x-0','opacity-100');
            },);
            setTimeout(() => {
                msg.classList.remove('translate-x-0','opacity-100');
                msg.classList.add('-translate-x-full','opacity-0');
            }, 3000)
            let msg = document.getElementById('message');
        }
    let requests = JSON.parse(localStorage.getItem('requests'));
    let Id = idcount();
    requests.push({
        id: Id,
        nom: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        reason: document.getElementById('reason').value,
        date: document.getElementById('date').value
    });
    
    localStorage.setItem('requests' ,JSON.stringify(requests));
    list.classList.toggle('hidden');
    modal.classList.toggle('hidden');
    if((requests.length > 5)&&(morePages.classList.contains('invisible')))
        morePages.classList.remove('invisible')

        
});

function displayP(reqs){
    table.innerHTML = '';
    let n = reqs.length
    switch(true){
        case n == 0:
            table.innerHTML =  `<tr>
                                    <td colspan="7" class="py-20 text-center">
                                        <div class="flex flex-col items-center opacity-50">
                                            <i class="fa-solid fa-box-open text-4xl mb-2"></i>
                                            <p class="font-medium">La liste est vide</p>
                                        </div>
                                    </td>
                                </tr>`
            break;
        case n <= 5:
            onePage(reqs);
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