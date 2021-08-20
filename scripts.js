//Editing and saving profile section
let popupBox = document.querySelector('.popup-box');
let input = popupBox.querySelector('.input');
let profile = document.querySelector('.profile');
let profileInfo = profile.querySelector('.profile-info');

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

input.addEventListener('submit', editProfile); 

//Opening and closing popup box section
let editProfileBtn = document.querySelector('.profile-info__edit');
let closePopupBtn = document.querySelector('.popup-box__action_close');

function closePopup()
{
    popupBox.classList.remove('popup-box_opened');
}

function openPopup()
{
    popupBox.classList.add('popup-box_opened');
    
    let inputName = input.querySelector('.input__text_type_name');
    let inputOccupation = input.querySelector('.input__text_type_occupation');
    let name = profileInfo.querySelector('.profile-info__full-name').textContent;
    let occupation = profileInfo.querySelector('.profile-info__occupation').textContent;

    inputName.value = name;
    inputOccupation.value = occupation;
}

editProfileBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

