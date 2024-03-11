$(document).ready(function() {
    var programVersion = " Beta 0.19.3"; // Numer programu

    // Funkcja do zmiany tła
    var imagesUKPL = ["static/zdj1_func1.jpeg", "static/zdj2_func1.jpeg", "static/zdj3_func1.jpg"];
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

    console.log("script_function1.js loaded"); // Dodanie console.log()

    // Ukryj wszystkie flagi, oprócz flagi UK
    $('.flag-item:not(#flag1)').hide();

    // Funkcja do tłumaczenia elementów na podstawie mapy translations
    function translateElements(language) {
      var translations = {};

      if (language === "pl") {
        translations = {
          // Zdefiniuj tłumaczenia dla polskiego
          "Mark": "Marka",
          "Model": "Model",
          "Year": "Rok",
          "Vol_engine": "Pojemność silnika",
          "Fuel": "Rodzaj paliwa",
          // Dodaj inne tłumaczenia dla polskiego tutaj
        };
      } else if (language === "en") {
        translations = {
          // Zdefiniuj tłumaczenia dla angielskiego
          "Mark": "Brand",
          "Model": "Model",
          "Year": "Year",
          "Vol_engine": "Engine capacity",
          "Fuel": "Fuel type",
          // Dodaj inne tłumaczenia dla angielskiego tutaj
        };
      } else if (language === "spqr") {
        translations = {
          // Zdefiniuj tłumaczenia dla SPQR
          "Mark": "Marca",
          "Model": "Modelo",
          "Year": "Annum",
          "Vol_engine": "Capacitas motoris",
          "Fuel": "Generis carburantis",
          // Dodaj inne tłumaczenia dla SPQR tutaj
        };
      }

      for (var key in translations) {
        if (translations.hasOwnProperty(key)) {
          // Ustaw tłumaczenia w formularzu
          $("label[for='" + key + "']").text(translations[key]);
          $("#" + key).attr("placeholder", translations[key]);
        }
      }
    }

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

    // Obsługa wyboru z rozwijanej listy "Rodzaj paliwa"
    $('#fuelDropdown').on('change', function() {
        var selectedFuel = $(this).val(); // Pobierz wartość wybraną przez użytkownika
        $('#fuelDropdownText').text(selectedFuel); // Ustaw wartość wybranego paliwa w polu obok napisu "Wybierz paliwo"
        $('#Fuel').val(selectedFuel); // Ustaw wartość wybranego paliwa w ukrytym polu "Fuel"
    });

    // Zaktualizuj pola po załadowaniu strony, jeśli wartość została wcześniej zapisana
    var selectedFuel = $('#Fuel').val();
    if(selectedFuel) {
        $('#fuelDropdownText').text(selectedFuel);
    }

    // Zatrzymaj domyślne zachowanie przycisku "Wybierz paliwo"
    $('#fuelDropdownButton').click(function(event) {
        event.preventDefault(); // Zapobiegaj domyślnej akcji przycisku
    });
});
