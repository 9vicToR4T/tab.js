window.addEventListener("DOMContentLoaded", function() {
  "use strict";
  let tab = document.querySelectorAll(".info-header-tab"), //menu elemen
    info = document.querySelector(".info-header"), // menu conteiner
    tabContent = document.querySelectorAll(".info-tabcontent"); // conteiner with title, text, img

  function hideTabContent(a) {
    //ascundem conteinerul
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show"); //dezactivam clasul show
      tabContent[i].classList.add("hide"); //activam clasul hide
    }
  }

  hideTabContent(1); //reese ca a=1, se va incepe de la primul conteiner

  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
      //conditia ca daca tabContent contine clasul hide
      tabContent[b].classList.remove("hide"); // il inlaturam pe hide
      tabContent[b].classList.add("show"); //il adaugam pe show
    }
  }

  info.addEventListener("click", function(event) {
    //delegation. pentru conteinerul parinte info
    let target = event.target; //event.target este elementulpe care a avut loc evenimentul. Titlul de meniu vlojenii in conteinerul parinte.
    if (target && target.classList.contains("info-header-tab")) {
      //verificam daca am facut click pe info-header-tab
      for (let i = 0; i < tab.length; i++) {
        //atita timp cit avem taburi. comparam valorile lui event ca sa corespunda cu valoarea lui info-header-tab pe care apasam
        if (target == tab[i]) {
          //daca acolo unde noi am apasat(target), coincide cu un anume tab, atunci vom executa urmatoarele actiuni:
          hideTabContent(0); //ascundem toate taburile, de aceea punem zero
          showTabContent(i); //scoatem anume tabul numarul caruia coincide cu i. i se duce in locul lui b. si iese continutul
          break;
        }
      }
    }
  });

  // Timer

  let deadline = "2020-11-21"; //scriem data deadline

  function getTimeRemaining(endtime) {
    //calculam diferenta dintre deadline si momentul actual. punem un argument endtime
    let t = Date.parse(endtime) - Date.parse(new Date()), //cind vom primi diferenta o vom scrie in aceasta variabila t.
      //mai sus. in interior, scadem din deadline(endtime) data actuala(new Date)(pentru a vedea diferenta). diferenta se va pastra in t
      //din aceste milisecunde care se afla in t vom scoate hours, minutes, seconds
      seconds = Math.floor((t / 1000) % 60), //Math.floor pentru a obtine nr intregi
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor(t / (1000 * 60 * 60));

    return {
      //ii spunem functiei sa ne intoarca un anumit rezultat.Ne intoarce un obiect{}
      total: t, //cheie:valoare. exportam diferenta.cind va ajunge la zero se va sfirsi timerul
      hours: hours, //cheie:valoare
      minutes: minutes, //cheie:valoare
      seconds: seconds //cheie:valoare
    };
    //mai departe avem nevoie de o functie care sa ne transforme verstka din statica in dinamica
  }

  function setClock(id, endtime) {
    //creem o functie cu 2 argumente, primul este id, adica spunem ca mai departe vom lucra cu id-ul div-ului(div id="" )si deadline
    let timer = document.getElementById(id), //obtinem id-ul timer care il vom avea in variabila timer si pe care il chemam la urma
      hours = timer.querySelector(".hours"), //indicam ca in timer (div id) cautam elementul cu clasul hours
      minutes = timer.querySelector(".minutes"),
      seconds = timer.querySelector(".seconds"),
      //creem variabila care o setam cu setInterval, unde primul argument e functia de mai jos si al doilea intervalul de 1000 de milisecunde(1s)
      timeInterval = setInterval(updateClock, 1000); //functia noastra se va recalcula la fiecare secunda

    //etapa a 4a. avem nevoie de o functie care va obnovi/reseta ceasul nostru in fiecare secunda
    function updateClock() {
      //creem o functie, fara argumente
      let t = getTimeRemaining(endtime); //creem o variabila simpla t, in care chemam functia noastra anterioara care contine toate datele noastre, unde ca argument folosi deadlineul

      function addZero(num) {
        if (num <= 9) {
          return "0" + num;
        } else return num;
      }

      hours.textContent = addZero(t.hours); //acum trebuie sa punem variabila noastra cu orele calculate in span.hours
      //am folosit t, pentru ca am scris mai sus t=getTimeRemaining(functia noastra cu toate datele)
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      //ne ramine sa oprim timerul la un anumit moment. if total va fi mai mic de zero timeInterval se opreste
      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
      }
    }
  }

  setClock("timer", deadline); //chemam functia pentru a o vedea deodata
  //in ea indicam 2 argumente: id-ul unde noi vom cauta(id="timer") si deadlineul
  //putem crea asa mai multe time-uri. doar adaugam alt id si alt deadline
});
