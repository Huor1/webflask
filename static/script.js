window.addEventListener("DOMContentLoaded", function() {
  var hamburger = document.querySelector(".hamburger");
  hamburger.onclick = function() {
    var navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
  };
});
$(document).ready(function() {
    var programVersion = " Beta 0.19.3"; // Numer programu
    /*
    function toggleForm() {
        var form = document.getElementById("login-form");
      
        if (form.classList.contains("closed")) {
          form.classList.remove("closed");
          form.style.maxHeight = form.scrollHeight + "px"; // Ustaw pełną wysokość formularza
        } else {
          form.style.maxHeight = "0"; // Ustaw wysokość na 0
          form.classList.add("closed");
        }
      }
      // Dodaj klasę "closed" na początku dla formularza logowania
      var loginForm = document.getElementById("login-form");
      loginForm.classList.add("closed");
      // Dodaj obsługę zdarzenia kliknięcia dla przycisku rejestracji
      var rejestracjaButton = document.getElementById("Rejestracja");
      rejestracjaButton.addEventListener("click", toggleForm);
      */


   var imagesUKPL = ["static/zdj1.jpg", "static/zdj2.jpg", "static/zdj3.jpg"];
    var imagesSPQR = ["static/zdj4.jpg", "static/zdj5.jpg", "static/zdj6.jpg"];
    var currentImageIndex = 0;
    var clickedFlag = $("#flag1"); // Domyślnie ustawiona flaga UK


function changeBackgroundImage() {
  var images = [];

  if (clickedFlag.attr("id") === "flag1" || clickedFlag.attr("id") === "flag2") {
    // Jeśli kliknięto flagę UK lub PL, użyj zdjęć dla UK i PL
    images = imagesUKPL;
  } else if (clickedFlag.attr("id") === "flag3") {
    // Jeśli kliknięto flagę SPQR, użyj zdjęć dla SPQR
    images = imagesSPQR;
  }

  currentImageIndex = (currentImageIndex + 1) % images.length;
  var imageUrl = images[currentImageIndex];
  document.body.style.backgroundImage = "url('" + imageUrl + "')";
}

function startImageRotation() {
  setInterval(changeBackgroundImage, 5000); // Zmieniaj obraz co 5 sekund
}
startImageRotation(); // Rozpoczęcie automatycznej rotacji obrazów
// Wywołaj funkcję startImageRotation() po kliknięciu na flagę
$("#flag1, #flag2, #flag3").click(function() {
  clickedFlag = $(this);
  changeBackgroundImage(); // Natychmiastowa zmiana obrazu po kliknięciu na flagę
  
});

    
    

    
    console.log("script.js loaded"); // Dodanie console.log()
  
    // Ukryj wszystkie flagi, oprócz flagi UK
    $('.flag-item:not(#flag1)').hide();
  
    // Funkcja do tłumaczenia elementów na podstawie mapy translations
    function translateElements(language) {
      var translations = {};
  
      if (language === "pl") {
        translations = {
          "Zaloguj": "Zaloguj",
          'label[for="username"]': "Login:",
          'label[for="password"]': "Hasło:",
          ".Dane_uzytkownika": "Dane użytkownika",
          ".Wersja_programu": "Wersja programu"+programVersion,
          ".Autorzy": "Autorzy Jakub Kołodziej i Piotr Wieczorek",
          ".title": "Prognozowanie cen nieruchomości",
          ".powierzchnia-tekst": "Powierzchnia:",
          ".pokoje-tekst": "Pokoje:",
          ".prognozowana-cena": "Prognozowana cena",
          ".active": "Strona główna",
          ".Funkcja1": "Funkcja 1",
          ".Funkcja2": "Funkcja 2 ",
          ".About": "O nas",
          ".Login": "Login",
          
          
          // Dodaj inne tłumaczenia dla polskiego tutaj
        };
         // Zmiana obrazu na "Palac.jpg"
        $("#zdjecie-prawo").attr("src", "static/Palac.jpg");
      } else if (language === "en") {
        translations = {
          "Zaloguj": "Login",
          'label[for="username"]': "Username:",
          'label[for="password"]': "Password:",
          ".Dane_uzytkownika": "User Data",
          ".Wersja_programu": "Program version"+programVersion,
          ".Autorzy": "Authors Jakub Kołodziej i Piotr Wieczorek",
          ".title": "Real estate price forecasting",
          ".pokoje-tekst": "Rooms:",
          ".powierzchnia-tekst": "Area:",
          ".prognozowana-cena": "Forecasted Price",
          ".active": "Home",
        ".Funkcja1": "Function 1",
        ".Funkcja2": "Function 2 ",
        
        ".About": "About us",
        ".Login": "Login",
          // Dodaj inne tłumaczenia dla angielskiego tutaj
        };
        // Zmiana obrazu na "BigBen.jpg"
    $("#zdjecie-prawo").attr("src", "static/BigBen.jpg");
      }
      else if (language === "spqr") {
        translations = {
          "Zaloguj": "Login",
          'label[for="username"]': "Loginus:",
          'label[for="password"]': "Password:",
          ".Dane_uzytkownika": "User Data",
          ".Wersja_programu": "Version program"+programVersion,
          ".Autorzy": "Auctores Iacobus Wheelwright et Petrus Vesperi",
          ".title": "Projecting verus praedium prices",
          ".pokoje-tekst": "Rooms:",
          ".powierzchnia-tekst": "Area:",
          ".prognozowana-cena": "Data pretium",
          ".active": "Home",
        ".Funkcja1": "Officium 1",
        ".Funkcja2": "Officium 2 ",
        
        ".About":"De nobis",
        ".Login": "Loginus",

          // Dodaj inne tłumaczenia dla angielskiego tutaj
        };
        // Zmiana obrazu na "BigBen.jpg"
    $("#zdjecie-prawo").attr("src", "static/roman_centurion.jpg");
      }
      
      for (var key in translations) {
        if (translations.hasOwnProperty(key)) {
          $(key).html(translations[key]);
        }
      }
    }
  
    // Ustaw flagę Polski jako domyślnie wybraną
    $("#flag1").addClass("open");
  
    // Wywołaj funkcję tłumaczącą elementy na język polski przy ładowaniu strony
    translateElements("pl");
  
    // Po kliknięciu na flagę
    $('.flag-item').click(function() {
      var clickedFlag = $(this);
      var otherFlags = $('.flag-item').not(clickedFlag);
  
      // Sprawdź, czy flaga jest już rozwinięta
      if (clickedFlag.hasClass('open')) {
        // Jeśli jest rozwinięta, zwiń ją
        clickedFlag.removeClass('open');
        otherFlags.slideDown(300); // Pokaż pozostałe flagi
      } else {
        // Jeśli nie jest rozwinięta, rozwij ją i ukryj pozostałe flagi
        clickedFlag.addClass('open');
        otherFlags.slideUp(300); // Zwiń pozostałe flagi
      }
  
      if (clickedFlag.attr("id") === "flag1") {
        // Jeśli kliknięto flagę Polski, tłumacz na język polski
        translateElements("pl");
      } else if (clickedFlag.attr("id") === "flag2") {
        // Jeśli kliknięto flagę UK, tłumacz na język angielski
        translateElements("en");
      } else if (clickedFlag.attr("id") === "flag3") {
        // Jeśli kliknięto flagę SPQR, tłumacz na język SPQR
        translateElements("spqr");
      } 
    });
  
    // Po zakończeniu animacji slideUp
    $('.flag-item').on('slideUp', function() {
      var flag = $(this);
      if (!flag.hasClass('open')) {
        flag.hide(); // Ukryj zwiniete flagi po zakończeniu animacji
      }
    });
  
    // Po kliknięciu przycisku "Zaloguj"
    $("#login-button").click(function(event) {
      event.preventDefault(); // Zapobiegaj domyślnemu zachowaniu formularza
  
      var username = $("#username").val(); // Pobierz wartość pola loginu
      var password = $("#password").val(); // Pobierz wartość pola hasła
  
      if (username && password) {
        // Jeśli oba pola są wypełnione
        $(".Dane_uzytkownika").text(username); // Zaktualizuj treść elementu Dane_uzytkownika
        $("#login-form").removeClass("open"); // Zamknij formularz logowania
        $("#username").val(""); // Wyczyść pole loginu
        $("#password").val(""); // Wyczyść pole hasła
      }
    });
  
    // Obsługa zdarzenia kliknięcia na dokument
    $(document).click(function(event) {
      var target = $(event.target);
  
      // Sprawdź, czy kliknięcie było na flagę lub jej obrazek
      if (!target.hasClass('flag-item') && !target.closest('.flag-item').length) {
        // Jeśli kliknięcie było gdzieś indziej, zwijaj flagi
        $('.flag-item').removeClass('open');
      }
    });
  
    
 // Pobierz element audio
var audio = document.getElementById("background-music");

// Funkcja do odtwarzania muzyki
function playMusic() {
  audio.play();
}

// Funkcja do zatrzymywania muzyki
function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
}

// Obsługa zdarzenia kliknięcia na flagę SPQR
$("#flag3").click(function() {
  // Uruchom odtwarzanie muzyki po bezpośredniej interakcji użytkownika
  playMusic();
});

// Obsługa zdarzenia kliknięcia na flagę PL i UK
$("#flag1, #flag2").click(function() {
  // Zatrzymaj odtwarzanie muzyki po zmianie tłumaczenia na PL lub UK
  stopMusic();
});

// Obsługa zdarzenia kliknięcia na dokument
$(document).click(function(event) {
  var target = $(event.target);

  // Sprawdź, czy kliknięcie było na flagę lub jej obrazek
  if (!target.hasClass('flag-item') && !target.closest('.flag-item').length) {
    // Jeśli kliknięcie było gdzieś indziej, zwijaj flagi
    $('.flag-item').removeClass('open');
  }
});

// Odtwórz muzykę po załadowaniu strony, jeśli flaga SPQR jest już wybrana
if ($("#flag3").hasClass("open")) {
  playMusic();
}


});