(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}e.d({},{EA:()=>m});var n={baseUrl:"https://nomoreparties.co/v1/plus-cohort-16",headers:{authorization:"ac490a89-f995-48f9-b5f2-220c6032f771","Content-Type":"application/json"}};function o(e){e.classList.add("popup_opened"),document.addEventListener("keydown",c)}function r(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",c)}function c(e){"Escape"===e.key&&r(document.querySelector(".popup_opened"))}function u(e){e.target.classList.contains("popup")&&r(e.target)}function a(e,r,c,u,a){var i=r.cloneNode(!0),l=i.querySelector(".elements__title"),s=i.querySelector(".elements__button"),d=i.querySelector(".elements__like"),f=i.querySelector(".elements__button-delete"),p=i.querySelector(".elements__image");return l.textContent=e.name,p.src=e.link,p.alt=e.name,d.textContent=e.likes.length,function(e){return e.likes.some((function(e){return e._id===m.id}))}(e)&&s.classList.add("elements__button_active"),s.addEventListener("click",(function(o){var r;o.target.classList.contains("elements__button_active")?(r=e._id,fetch("".concat(n.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:n.headers}).then((function(e){return t(e)}))).then((function(e){o.target.classList.toggle("elements__button_active"),d.textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(n.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:n.headers}).then((function(e){return t(e)}))}(e._id).then((function(e){o.target.classList.toggle("elements__button_active"),d.textContent=e.likes.length})).catch((function(e){return console.log(e)}))})),m.id!==e.owner._id?f.style.visibility="hidden":f.addEventListener("click",(function(o){var r;(r=e._id,fetch("".concat(n.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:n.headers}).then((function(e){return t(e)}))).then((function(){o.target.closest(".elements__card").remove()})).catch((function(e){return console.log(e)}))})),p.addEventListener("click",(function(){o(c),a.textContent=e.name,u.src=e.link,u.alt=e.name})),i}function i(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.textContent="",o.classList.remove(n.errorClass)}function l(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){i(e,n,t)}))}function s(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}var d=document.querySelectorAll(".popup__close-button"),f=document.querySelectorAll(".popup"),m={},p=document.querySelector("#profile"),h=document.querySelector(".profile__name"),_=document.querySelector(".profile__about"),v=document.querySelector('[name="profile-name"]'),y=document.querySelector('[name="profile-about"]'),b=document.querySelector('[name="profile-form"]'),S=document.querySelector(".profile__edit-button"),q=b.querySelector('button[type="submit"]'),E=document.querySelector("#avatar"),g=document.querySelector(".profile__image"),L=document.querySelector('[name="profile-avatar-input"]'),C=document.querySelector('[name="profile-avatar-form"]'),k=document.querySelector(".profile__avatar-button"),x=C.querySelector('button[type="submit"]'),A=document.querySelector("#card"),U=document.querySelector(".elements"),T=document.querySelector(".profile__add-button"),P=document.querySelector('[name="card-name"]'),O=document.querySelector('[name="card-about"]'),j=document.querySelector('[name="card-form"]'),B=document.querySelector("#elements__template").content,D=j.querySelector('button[type="submit"]'),w=document.querySelector("#image"),N=document.querySelector(".popup__image"),J=document.querySelector(".popup__image-caption"),G={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_disabled",inputErrorClass:"popup__input_error",errorClass:"popup_error_visible"};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);s(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?i(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),s(n,o,t)}))}))}(t,e)}))}(G),Promise.all([fetch("".concat(n.baseUrl,"/users/me"),{method:"GET",headers:n.headers}).then((function(e){return t(e)})),fetch("".concat(n.baseUrl,"/cards"),{method:"GET",headers:n.headers}).then((function(e){return t(e)}))]).then((function(e){!function(e){h.textContent=e.name,_.textContent=e.about,m.id=e._id,g.src=e.avatar}(e[0]),e[1].forEach((function(e){return U.append(a(e,B,w,N,J))}))})).catch((function(e){return console.log(e)})),b.addEventListener("submit",(function(e){var o,c;e.preventDefault(),q.textContent="Сохранение...",(o=v.value,c=y.value,fetch("".concat(n.baseUrl,"/users/me"),{method:"PATCH",headers:n.headers,body:JSON.stringify({name:o,about:c})}).then((function(e){return t(e)}))).then((function(e){h.textContent=e.name,_.textContent=e.about,r(p)})).then((function(){return b.reset()})).catch((function(e){return console.log(e)})).finally((function(){return q.textContent="Сохранить"}))})),j.addEventListener("submit",(function(e){var o,c;e.preventDefault(),D.textContent="Создание...",(o=P.value,c=O.value,fetch("".concat(n.baseUrl,"/cards"),{method:"POST",headers:n.headers,body:JSON.stringify({name:o,link:c})}).then((function(e){return t(e)}))).then((function(e){!function(e){U.prepend(a(e,B,w,N,J))}(e),r(A)})).then((function(){return j.reset()})).catch((function(e){return console.log(e)})).finally((function(){return D.textContent="Создать"}))})),C.addEventListener("submit",(function(e){var o;e.preventDefault(),x.textContent="Сохранение...",(o=L.value,fetch("".concat(n.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:n.headers,body:JSON.stringify({avatar:o})}).then((function(e){return t(e)}))).then((function(e){g.src=e.avatar,r(E)})).then((function(){return C.reset()})).catch((function(e){return console.log(e)})).finally((function(){return x.textContent="Сохранить"}))})),S.addEventListener("click",(function(){l(b,G),o(p)})),T.addEventListener("click",(function(){var e;(e=D).disabled=!0,e.classList.add("popup__save-button_disabled"),l(j,G),o(A)})),k.addEventListener("click",(function(){l(C,G),o(E)})),d.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return r(t)}))})),f.forEach((function(e){e.addEventListener("click",u)}))})();