const meals = document.getElementById("meals");
const categories = document.getElementById("categories");
const area = document.getElementById("area");
const ingredients = document.getElementById("ingredients");
const search = document.getElementById("search");
const searchPageInputs = document.getElementById("searchPageInputs");
const contact = document.getElementById("contact");


$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading").slideUp(1000)
        $("body").css("overflow", "visible")

    })
})


categories.addEventListener('click', function () {
    getCatAPI();

})

area.addEventListener('click', function () {
    getAreaAPI();

})

ingredients.addEventListener('click', function () {
    getIngredientsAPI();

})
search.addEventListener('click', function () {
    searchPage();
    closeNav();

})
contact.addEventListener('click', function () {
    contactUsPage();
    closeNav();

})


$(".open-icon").click(() => {

    if ($(".sideBar").css("left") == "0px") {
        closeNav();
    }
    else {
        openNav();
    }

})

function openNav() {
    $(".sideBar").animate({ left: 0 }, 500)
    $(".open-icon").removeClass("fa-align-justify");
    $(".open-icon").addClass("fa-x");

    for (let i = 0; i < 5; i++) {
        $(".navLinks ul li").eq(i).animate({ top: 0 }, (i + 5) * 100)
    }
}

function closeNav() {
    let barWidth = $(".navTabs").outerWidth();

    $(".sideBar").animate({ left: -barWidth }, 500)
    $(".open-icon").addClass("fa-align-justify");
    $(".open-icon").removeClass("fa-x");

    $(".navLinks li").animate({ top: 300 }, 500)
}
closeNav();

async function getAPIsearchByName(kind) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${kind}`);
    data = await data.json();
    // console.log(data.meals);

    displayFood(data.meals);

}

function displayFood(arr) {
    let empty = "";
    for (let i = 0; i < arr.length; i++) {
        empty += `<div class="col-md-3 cursorPointer">
                <div class="food position-relative overflow-hidden rounded-2"  onclick="getDetailsAPI('${arr[i].idMeal}')">
                    <img src="${arr[i].strMealThumb}" alt="Meal" class="w-100">

                    <div class="foodLayer position-absolute d-flex align-items-center ">
                        <h3 class="px-2">${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    meals.innerHTML = empty;
}


async function getCatAPI() {
    meals.innerHTML = ""
    $(".loadingForSmall").fadeIn(400)
    searchPage.innerHTML = "";

    let data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    data = await data.json();
    displayCategories(data.categories);
    $(".loadingForSmall").fadeOut(400)


}

function displayCategories(arr) {
    let empty = "";
    for (let i = 0; i < arr.length; i++) {
        empty += `<div class="col-md-3 cursorPointer" onclick="getAllMeal('c','${arr[i].strCategory}')">
                <div class="food position-relative overflow-hidden rounded-2">
                    <img src="${arr[i].strCategoryThumb}" alt="Meal" class="w-100">

                    <div class="foodLayer position-absolute text-center ">
                        <h3 class="px-2">${arr[i].strCategory}</h3>
                        <P>${arr[i].strCategoryDescription.split(" ").slice(0, 30).join(" ")}</p>
                    </div>
                </div>
            </div>`
    }
    meals.innerHTML = empty;
    searchPageInputs.innerHTML = "";
    closeNav();
}

async function getAreaAPI() {
    meals.innerHTML = ""
    $(".loadingForSmall").fadeIn(400)
    searchPage.innerHTML = "";

    let data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    data = await data.json();
    findArea(data.meals);
    $(".loadingForSmall").fadeOut(400)

}

function findArea(arr) {
    let empty = "";
    for (let i = 0; i < arr.length; i++) {
        empty += `<div class="col-md-3 cursorPointer">
                <div class="food text-center" onclick="getAllMeal('a','${arr[i].strArea}')">
                 <i class="fa-solid fa-map-location-dot fs-1 text-warning py-3"></i>
                        <h3 class="px-2">${arr[i].strArea}</h3>
                </div>
            </div>`
    }
    meals.innerHTML = empty;
    searchPageInputs.innerHTML = "";
    
    closeNav();
}

async function getIngredientsAPI() {
    meals.innerHTML = ""
    $(".loadingForSmall").fadeIn(400)
    searchPage.innerHTML = "";
    let data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    data = await data.json();
    findIngredients(data.meals.slice(0, 20));
    $(".loadingForSmall").fadeOut(400)

}

function findIngredients(arr) {
    let empty = "";
    for (let i = 0; i < arr.length; i++) {
        empty += `<div class="col-md-3 border border-1 border-warning cursorPointer">
                <div class="food text-center" onclick="getAllMeal('i','${arr[i].strIngredient}')">
                 <i class="fa-solid fa-drumstick-bite fs-1 text-warning py-3"></i>
                        <h3 class="px-2">${arr[i].strIngredient}</h3>
                         <p>${arr[i].strDescription.split(" ").slice(0, 30).join(" ")}</p>
                </div>
            </div>`
    }
    meals.innerHTML = empty;
    searchPageInputs.innerHTML = "";

    closeNav();
}

async function getAllMeal(char, name) {
    meals.innerHTML = ""
    $(".loadingForSmall").fadeIn(400)
  
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${char}=${name}`)
    data = await data.json();

    displayFood(data.meals)
    $(".loadingForSmall").fadeOut(400)


}

async function getDetailsAPI(id) {
    meals.innerHTML = ""
    $(".loadingForSmall").fadeIn(400)
    searchPage.innerHTML = "";
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    data = await data.json();

    displayDetails(data.meals[0])
    $(".loadingForSmall").fadeOut(400)


}

function displayDetails(myMeal) {
    let ingredientStr = "";
    let tags = myMeal.strTags?.split(",")
    let tagsStr = ''

    for (let i = 0; i <= 20; i++) {
        if (myMeal[`strIngredient${i}`])
            ingredientStr += `<li class="alert alert-info m-2 p-1">${myMeal[`strMeasure${i}`]} ${myMeal[`strIngredient${i}`]}</li>`
    }

    if (!tags) tags = []

    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let empty = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${myMeal.strMealThumb}"
                    alt="">
                    <h2>${myMeal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2 class="text-warning">Instructions</h2>
                <p>${myMeal.strInstructions}</p>
                <h3><span class="fw-bold text-warning">Area : </span>${myMeal.strArea}</h3>
                <h3><span class="fw-bold text-warning">Category : </span>${myMeal.strCategory}</h3>
                <h3 class="text-warning">Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredientStr}
                </ul>

                <h3 class="text-warning">Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${myMeal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${myMeal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    meals.innerHTML = empty;

}

function searchPage() {
 
   

    searchPageInputs.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 mb-4">
            <input onkeydown="searchByName(this.value)" class="form-control text-white bg-transparent " type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6 mb-4">
            <input maxlength="1" onkeydown="searchByFisrtLetter(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    meals.innerHTML = "";


}
async function searchByName(value) {
    meals.innerHTML = ""
    $(".loadingForSmall").fadeIn(400)
  
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    data = await data.json();
    if (data.meals) {
        displayFood(data.meals)
    }
    else {
        displayFood([])
    }
    $(".loadingForSmall").fadeOut(400)

}

async function searchByFisrtLetter(char) {
    meals.innerHTML = ""
    $(".loadingForSmall").fadeIn(400)

    char == "" ? char = "a" : "";
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)
    data = await data.json();
    data.meals ? displayFood(data.meals) : displayFood([]);
    $(".loadingForSmall").fadeOut(400)

}



function contactUsPage() {
    meals.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
    <p class="display-1 text-warning pb-3">Contact US</p>
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeydown="validation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeydown="validation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeydown="validation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeydown="validation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeydown="validation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeydown="validation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
searchPageInputs.innerHTML = "";

    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function validation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}