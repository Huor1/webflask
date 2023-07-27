window.addEventListener("DOMContentLoaded", function() {
  var hamburger = document.querySelector(".hamburger");
  hamburger.onclick = function() {
    var navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
  };
});

$(document).ready(function() {
  var programVersion = " Beta 0.19.3"; // Numer programu

  // Funkcja do zmiany tła
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
        ".Wersja_programu": "Wersja programu" + programVersion,
        ".Autorzy": "Autorzy Jakub Kołodziej i Piotr Wieczorek",
        ".title": "Estymowanie cen nieruchomości",
        ".pokoje-tekst": "Pokoje:",
        ".powierzchnia-tekst": "Powierzchnia:",
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
        ".Wersja_programu": "Program version" + programVersion,
        ".Autorzy": "Authors Jakub Kołodziej i Piotr Wieczorek",
        ".title": "Real estate price estimation",
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
    } else if (language === "spqr") {
      translations = {
        "Zaloguj": "Login",
        'label[for="username"]': "Loginus:",
        'label[for="password"]': "Password:",
        ".Dane_uzytkownika": "User Data",
        ".Wersja_programu": "Version program" + programVersion,
        ".Autorzy": "Auctores Iacobus Wheelwright et Petrus Vesperi",
        ".title": "Projecting verus praedium prices",
        ".pokoje-tekst": "Rooms:",
        ".powierzchnia-tekst": "Area:",
        ".prognozowana-cena": "Data pretium",
        ".active": "Home",
        ".Funkcja1": "Officium 1",
        ".Funkcja2": "Officium 2 ",
        ".About": "De nobis",
        ".Login": "Loginus",
        // Dodaj inne tłumaczenia dla angielskiego tutaj
      };
      // Zmiana obrazu na "Roman Centurion.jpg"
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

  // Po kliknięciu przycisku "Estymuj cenę"
  $("#priceForm").submit(function(e) {
    e.preventDefault(); // Zapobiega domyślnej akcji formularza (przeładowania strony)

    // Dane z formularza
    var formData = {
      offer_type: $("#offer_type").val(),
      area: parseFloat($("#area").val()),
      rooms: parseInt($("#rooms").val()),
      offer_type_of_building: $("#offer_type_of_building").val(),
      market: $("#market").val(),
      city_name: $("#city_name").val(),
      voivodeship: $("#voivodeship").val(),
    };

    // Wysłanie żądania POST do serwera
    $.ajax({
      type: "POST",
      url: "/estimate_price",
      data: formData,
      success: function(data) {
        // Aktualizacja pola "Estymowana cena" po otrzymaniu odpowiedzi od serwera
        $("#estimatedPrice").text(data.estimated_price);
      },
      error: function() {
        // Obsługa błędu
        alert("Wystąpił błąd podczas estymacji ceny.");
      },
    });
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

  // Odtwórz muzykę po załadowaniu strony, jeśli flaga SPQR jest już wybrana
  if ($("#flag3").hasClass("open")) {
    playMusic();
  }
});
