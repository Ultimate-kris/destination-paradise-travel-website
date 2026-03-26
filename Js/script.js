// importers
import { countryCodes } from "./countrycode.js";
import { packages } from "./travelpack.js";


// phone number code logic 
let selecting=document.querySelector("#countryCode");

countryCodes.forEach((country)=>{ 
    let option=document.createElement("option");
    option.value=country.code;
    option.textContent=`${country.code} (${country.name})`;
if(country.name==="India"){
option.selected=true;
}
 selecting.appendChild(option);
})


// booking form logic
let bookingForm=document.getElementById('bookingForm')

bookingForm.addEventListener("submit",(event)=>{
    event.preventDefault();
let phoneNumber=document.getElementById('phone');
let phoneError=document.getElementById("phone-error");
let phoneValue=phoneNumber.value;
let birthday=document.getElementById('birthday')
let ageError=document.getElementById('age-error');
let greet=document.getElementById('greet');
let isValid=true;


if(phoneValue.length !== 10){
    phoneError.style.display= "block";
    isValid=false;
}
else{
        phoneError.style.display= "none";

}
let birthDate= new Date(birthday.value);
let today=new Date();

let age=today.getFullYear()-birthDate.getFullYear();
let month=today.getMonth()-birthDate.getMonth();

if(month<0 || (month===0 && today.getDate()<birthDate.getDate())){
    age--;
}

if(age<18){
    ageError.style.display="block";
    isValid=false;
}
else{
ageError.style.display="none";
}

if (isValid){
    greet.style.display="block";
    bookingForm.reset();
}

})
 

// packages logic
function dataDisplay(datatoshow){
let container=document.querySelector('#packages-container');
container.innerHTML="";
datatoshow.forEach(pkg=>{
let packageElement=document.createElement('div');
packageElement.classList.add('package');
packageElement.innerHTML=`
<div class="image-container">
<img src="${pkg.photo}">
</div>
<h3 class="package-name">${pkg.name}</h3>
<p class=package-description>${pkg.description}</p>
<button class="travel-button btn btn-primary"><a href="#" class="book-now-btn">Book now</a></button>`;
container.appendChild(packageElement);
})
if(datatoshow.length === 0){
container.innerHTML = "<h4>No such package found</h4>";
return;
}

}
dataDisplay(packages);


// search travel package logic
let searchPackages=document.querySelector('#searchInput');
searchPackages.addEventListener("input",(event)=>{
   let userText= event.target.value.toLowerCase().trim();

 let filterpkg=packages.filter((pkg)=>{
    return pkg.name.toLowerCase().includes(userText) || 
    pkg.description.toLowerCase().includes(userText);
 })
 dataDisplay(filterpkg);
})



// dropdown
let destinations=["Booking Gateway", "Mountain Adventure", "City Life Experience"];
let dropDown=document.querySelector('.dropdown-menu')

dropDown.innerHTML="";
destinations.forEach((des)=>{
    dropDown.innerHTML= dropDown.innerHTML+`<li><a class="dropdown-item" href="#">${des}</a></li>`
});
