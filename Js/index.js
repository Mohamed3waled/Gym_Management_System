// Select Inputs
let Input_Name = document.querySelector('#productName')
let PriceInput = document.querySelector('#productPrice')
let SelectType = document.querySelector('#SelectType')
let Start_Date = document.querySelector('#StartDate')
let End_Date = document.querySelector('#EndDate')
let Description = document.querySelector('#Description')
// Data Show
let DataShowInTable = document.querySelector('.DataShowInTable')
// buttons 
let Add_btn = document.querySelector('#Add_btn')
let Clear_Inputs = document.querySelector('#Clear_Form')
let Close = document.querySelector('.Close')
let Show_Data = document.querySelector('.Show_Data')

////////////////////////////////////////////////////////////////////////
window.addEventListener('load', () => Input_Name.focus())

// Add Memeper Click
Add_btn.addEventListener('click', () => Add_Memper())



let Mempers = []
if (localStorage.getItem('Mempers')) {
    Mempers = JSON.parse(localStorage.getItem('Mempers'))
    Add_Memper()
}


function Data_Memper() {
    Memper_Data = {
        Memper_Name: Input_Name.value.toLowerCase(),
        Price: PriceInput.value,
        Category: SelectType.value,
        Start_date: Start_Date.value,
        End_date: End_Date.value,
        description: Description.value
    }

    Input_Name.value.length <= 0
        || PriceInput.value.length <= 0
        || Start_Date.value.length <= 0
        || End_Date.value.length <= 0
        ? null
        : Mempers.push(Memper_Data)


    /// Add Data in Local Storage ///
    window.localStorage.setItem('Mempers', JSON.stringify(Mempers))

    Clear_Form()
}



function Add_Memper() {
    Data_Memper()
    let Data_Container = ``
    for (let i = 0; i < Mempers.length; i++) {
        Data_Container += `<tr>
        <td> ${i + 1} </td>
        <td> ${Mempers[i].Memper_Name} </td>
        <td> ${Mempers[i].Price} ج </td>
        <td> ${Mempers[i].Start_date} </td>
        <td> ${Mempers[i].End_date} </td>
        <td> ${Mempers[i].Category} </td>
        <td> ${Mempers[i].description} </td>
        <td> <button  class="btn btn-outline-danger" onclick = 'Delete_Memper(${i})'> <i class="fa-solid fa-trash-can"></i> </button></td>
        <td> <button  class="btn btn-outline-secondary" onclick = 'Update_Memper(${i})'> <i class="fa-regular fa-pen-to-square"></i> </button></td>
        </tr>
        `
        document.querySelector('.Count_Memper').innerHTML = i + 1
    }
    document.querySelector('.DataShowInTable').innerHTML = Data_Container

    if (Mempers.length >= 12) {
        document.querySelector('.Parent_Display').style.overflow = 'scroll'
    }
    else {
        document.querySelector('.Parent_Display').style.overflow = 'hidden'
    }

}




// Delete Memper 
function Delete_Memper(Item) {
    Mempers.splice(Item, 1)
        Input_Name.value.length <= 0
        || PriceInput.value.length <= 0
        || Start_Date.value.length <= 0
        || End_Date.value.length <= 0
        ? null
        : Mempers.push(Memper_Data)

    window.localStorage.setItem('Mempers', JSON.stringify(Mempers))
    Add_Memper()
    if (Mempers.length <= 0) {
        window.location.reload()
    }
}

function Update_Memper(Index) {
    Input_Name.value = Mempers[Index].Memper_Name
    PriceInput.value = Mempers[Index].Price
    SelectType.value = Mempers[Index].Category
    Start_Date.value = Mempers[Index].Start_date
    End_Date.value = Mempers[Index].End_date
    Description.value = Mempers[Index].description
    Close.parentElement.style.display = 'none'
}



// Clear Form
Clear_Inputs.addEventListener('click', () => Clear_Form())
function Clear_Form() {
    document.querySelectorAll('input').forEach((e) => {
        e.value = ''
    })
    document.querySelector('textarea').value = ''
}

// Update Memper


// Search Memper
document.querySelector('.Inputs_Search input').addEventListener('keyup', (e) => {
    if (e.key === ' ') {
        return ''
    } else search(e.target.value.toLowerCase())
})

function search(value) {
    let Result_Search = []
    for (let i = 0; i < Mempers.length; i++) {
        if (Mempers[i].Memper_Name.includes(value)) {
            Result_Search.push(Mempers[i])
            let Data_Container = ``
            for (let i = 0; i < Result_Search.length; i++) {
                Data_Container += `<tr>
                <td> ${i + 1} </td>
                <td> ${Result_Search[i].Memper_Name} </td>
                <td> ${Result_Search[i].Price} ج </td>
                <td> ${Result_Search[i].Start_date} </td>
                <td> ${Result_Search[i].End_date} </td>
                <td> ${Result_Search[i].Category} </td>
                <td> ${Result_Search[i].description} </td>
                <td> <button  class="btn btn-outline-danger" onclick = 'Delete_Memper(${i})'> <i class="fa-solid fa-trash-can"></i> </button></td>
                <td> <button  class="btn btn-outline-secondary" onclick = 'Update_Memper(${i})'> <i class="fa-regular fa-pen-to-square"></i> </button></td>
                </tr>
                `
            }
            document.querySelector('.DataShowInTable').innerHTML = Data_Container
        }
    }
}


// Buttons Close & Show Data
Show_Data.addEventListener('click', () => {
    Close.parentElement.style.display = 'block'
    document.body.style.overflow = 'hidden'
})

Close.addEventListener('click', () => {
    Close.parentElement.style.display = 'none'
    document.body.style.overflow = 'auto'
    document.querySelector('.Inputs_Search input').value = ''
    Add_Memper()
})





