$(document).ready(function() {
  var programVersion = "Beta 0.19.3";

  var imagesUKPL = ["static/zdj1_func1.jpeg", "static/zdj2_func1.jpeg", "static/zdj3_func1.jpg"];
  var imagesSPQR = ["static/zdj1_func1_spqr.png", "static/zdj5.jpg", "static/zdj6.jpg"];
  var currentImageIndex = 0;
  var clickedFlag = $("#flag1"); 

  function changeBackgroundImage() {
      var images = [];
      if (clickedFlag.attr("id") === "flag1" || clickedFlag.attr("id") === "flag2") {
          images = imagesUKPL;
      } else if (clickedFlag.attr("id") === "flag3") {
          images = imagesSPQR;
      }
      currentImageIndex = (currentImageIndex + 1) % images.length;
      var imageUrl = images[currentImageIndex];
      document.body.style.backgroundImage = "url('" + imageUrl + "')";
  }

  function startImageRotation() {
      setInterval(changeBackgroundImage, 5000);
  }
  startImageRotation(); 

  $("#flag1, #flag2, #flag3").click(function() {
      clickedFlag = $(this);
      changeBackgroundImage(); 
  });

  console.log("script_function1.js loaded"); 

  $('.flag-item:not(#flag1)').hide();

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
            ".title": "Estymowanie cen samochodów",
            ".active": "Strona główna",
            ".Funkcja1": "Funkcja 1",
            ".Funkcja2": "Funkcja 2 ",
            ".About": "O nas",
            ".Login": "Login",
              "Mark": "Marka",
              "Model": "Model",
              "Year": "Rok",
              "Vol_engine": "Pojemność silnika",
              "Fuel": "Rodzaj paliwa",
              ".About": "O nas",
              ".active": "Strona główna",
          };
      } else if (language === "en") {
          translations = {
            "Zaloguj": "Login",
            'label[for="username"]': "Username:",
            'label[for="password"]': "Password:",
            ".Dane_uzytkownika": "User Data",
            ".Wersja_programu": "Program version" + programVersion,
            ".Autorzy": "Authors Jakub Kołodziej i Piotr Wieczorek",
            ".title": "Car estimation price",
            ".active": "Home",
            ".Funkcja1": "Function 1",
            ".Funkcja2": "Function 2 ",
            ".About": "About us",
            ".Login": "Login",
              "Mark": "Brand",
              "Model": "Model",
              "Year": "Year",
              "Vol_engine": "Engine capacity",
              "Fuel": "Fuel type",
              ".About": "About us",
              ".active": "Home",
          };
      } else if (language === "spqr") {
          translations = {
            "Zaloguj": "Login",
            'label[for="username"]': "Loginus:",
            'label[for="password"]': "Password:",
            ".Dane_uzytkownika": "User Data",
            ".Wersja_programu": "Version program" + programVersion,
            ".Autorzy": "Auctores Iacobus Wheelwright et Petrus Vesperi",
            ".title": "Projecting verus praedium prices",
            ".active": "Home",
            ".Funkcja1": "Officium 1",
            ".Funkcja2": "Officium 2 ",
            ".About": "De nobis",
            ".Login": "Loginus",
              "Mark": "Marca",
              "Model": "Modelo",
              "Year": "Annum",
              "Vol_engine": "Capacitas motoris",
              "Fuel": "Generis carburantis",
              ".About": "De nobis",
              ".active": "Home",
          };
      }

      for (var key in translations) {
          if (translations.hasOwnProperty(key)) {
              if(key.startsWith('.')){
                  $(key).text(translations[key]);
              } else {
                  $("label[for='" + key + "']").text(translations[key]);
                  $("#" + key).attr("placeholder", translations[key]);
              }
          }
      }
  }

  $('.flag-item').click(function() {
      var clickedFlag = $(this);
      var otherFlags = $('.flag-item').not(clickedFlag);
      if (clickedFlag.hasClass('open')) {
          clickedFlag.removeClass('open');
          otherFlags.slideDown(300); 
      } else {
          clickedFlag.addClass('open');
          otherFlags.slideUp(300); 
      }
      if (clickedFlag.attr("id") === "flag1") {
          translateElements("pl");
      } else if (clickedFlag.attr("id") === "flag2") {
          translateElements("en");
      } else if (clickedFlag.attr("id") === "flag3") {
          translateElements("spqr");
      }
  });

  $('.flag-item').on('slideUp', function() {
      var flag = $(this);
      if (!flag.hasClass('open')) {
          flag.hide(); 
      }
  });

  updateFuelDropdown(); // Wywołanie funkcji aktualizującej dropdown paliwa
  // Obsługa formularza, aby zapobiec jego resetowaniu
  $("#priceForm").submit(function(e) {
    e.preventDefault(); // Zapobiega realnemu wysłaniu formularza
  });
});
