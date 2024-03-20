const searchData = document.querySelector(".two input").value

function searchMech(e){
    let searchData = document.querySelector(".two input").value
    console.log(searchData);
    // e.preventDefault()
    sessionStorage.setItem("search" , searchData)
}
