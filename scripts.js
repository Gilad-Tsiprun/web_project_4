function opacitySemiTransparent()
{
    document.querySelector('.header').style.opacity = "0.5";
    document.querySelector('.main').style.opacity = "0.5";
    document.querySelector('.footer').style.opacity = "0.5";
}

function opacityFull()
{
    document.querySelector('.header').style.opacity = "1";
    document.querySelector('.main').style.opacity = "1";
    document.querySelector('.footer').style.opacity = "1";
}


//Editing and saving profile section
let popupBox = document.querySelector('.popup-box');
let input = popupBox.querySelector('.input');
let profile = document.querySelector('.profile');
let profileInfo = profile.querySelector('.profile-info');
let saveProfileBtn = document.querySelector('.popup-box__btn_action_edit');

function editProfile(e) {
    e.preventDefault();

    let inputName = input.querySelector('.input__text_type_name').value;
    let inputOccupation = input.querySelector('.input__text_type_occupation').value;
    let name = profileInfo.querySelector('.profile-info__full-name');
    let occupation = profileInfo.querySelector('.profile-info__occupation');

    name.textContent = inputName;
    occupation.textContent = inputOccupation;

    closePopup();
}

saveProfileBtn.addEventListener('click', editProfile); 

//Opening and closing popup box section
let editProfileBtn = document.querySelector('.profile-info__edit');
let closePopupBtn = document.querySelector('.popup-box__btn_action_close');

function closePopup()
{
    opacityFull();
    popupBox.style.display = "none";
}

function openPopup()
{
    popupBox.style.display = "block";
    
    opacitySemiTransparent();
    let inputName = input.querySelector('.input__text_type_name');
    let inputOccupation = input.querySelector('.input__text_type_occupation');
    let name = profileInfo.querySelector('.profile-info__full-name').textContent;
    let occupation = profileInfo.querySelector('.profile-info__occupation').textContent;

    inputName.value = name;
    inputOccupation.value = occupation;
}

editProfileBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

