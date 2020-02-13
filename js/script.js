window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'), //menu elemen
        info = document.querySelector('.info-header'), // menu conteiner 
        tabContent = document.querySelectorAll('.info-tabcontent'); // conteiner with title, text, img

    function hideTabContent(a) { //ascundem conteinerul
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show'); //dezactivam clasul show
            tabContent[i].classList.add('hide'); //activam clasul hide
        }
    }

    hideTabContent(1); //reese ca a=1, se va incepe de la primul conteiner

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) { //conditia ca daca tabContent contine clasul hide
            tabContent[b].classList.remove('hide'); // il inlaturam pe hide
            tabContent[b].classList.add('show'); //il adaugam pe show
        }
    }

    info.addEventListener('click', function (event) { //delegation. pentru conteinerul parinte info
        let target = event.target; //event.target este elementulpe care a avut loc evenimentul. Titlul de meniu vlojenii in conteinerul parinte.
        if (target && target.classList.contains('info-header-tab')) { //verificam daca am facut click pe info-header-tab
            for (let i = 0; i < tab.length; i++) { //atita timp cit avem taburi. comparam valorile lui event ca sa corespunda cu valoarea lui info-header-tab pe care apasam
                if (target == tab[i]) { //daca acolo unde noi am apasat(target), coincide cu un anume tab, atunci vom executa urmatoarele actiuni:
                    hideTabContent(0); //ascundem toate taburile, de aceea punem zero
                    showTabContent(i); //scoatem anume tabul numarul caruia coincide cu i. i se duce in locul lui b. si iese continutul
                    break;
                }
            }
        }

    });
});