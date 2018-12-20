/*

Założenia gry:
1. Musimy odnaleźć 2 te same karty.
2. Liczymy liczbę punktów (odgadnięcie poprawnie pary kart), oraz ilość rund(kliknięć w karty).
Sposób losowania:
1. Sprawdzamy ile jest elementów w tablicy "cards" i następnie tyle kart razy 2 pojawi się na stole.
Koniec gry:
1. Gra kończy się kiedy użytkownik odkryje wszystkie karty (kart jest tylko co tablica "cards" razy 2)
Słowniczek:
a. KARTA NA STOLE - karta w wersji widocznej dla użytkownika. Reprezentowna przez HTML
b. OBIEKT KARTY - pojedynczy obiekt który znajduje się w tablicy "cards"
c. Dynamiczny element  - dynamicznie dodany element to taki, którego wcześniej nie dodaliśmy w HTML'u tylko poprzez Javvascript
*/



var rounds = 0;  //Zmienna przechowująca ilość odbytych rund
var points = 0; //Zmienna przechowująca ilość posiadanych punktów
var clickArray = []; //Tablica która przechowuje kliknięte elementy. Mogą się tu znajdować maksymalnie dwa elementy. Minimum zero elementów.
var cards = [ //Tablica z kartami. Każdą kartę w środku tej tablicy będziemy nazywali dalej OBIEKTEM KARTY
  {
    name: "Bootstrap", //Nazwa - potrzebna aby wyświetlić to w komunikacie informującym o poprawnym odkryciu obu KART NA STOLE
    icon: "img/card-icon/bootstrap.png", //Ikona - obrazek dla specyficznej KARTY NA STOLE
    cardsIdInHTML: [] // Pusta tablica posiadająca id'ki przypisanych do niego KART NA STOLE
  },
  {
    name: "C++",
    icon: "img/card-icon/cpp.png",
    cardsIdInHTML: []
  },
  {
    name: "CSS",
    icon: "img/card-icon/css.png",
    cardsIdInHTML: []
  },
  {
    name: "DB",
    icon: "img/card-icon/db.png",
    cardsIdInHTML: []
  },
  {
    name: "HTML",
    icon: "img/card-icon/html.png",
    cardsIdInHTML: []
  },
  {
    name: "JavaScript",
    icon: "img/card-icon/javascript.png",
    cardsIdInHTML: []
  },
  {
    name: "Jquery",
    icon: "img/card-icon/jquery.png",
    cardsIdInHTML: []
  },
  {
    name: "PHP",
    icon: "img/card-icon/php.png",
    cardsIdInHTML: []
  },
  {
    name: "Python",
    icon: "img/card-icon/python.png",
    cardsIdInHTML: []
  },
  {
    name: "Sass",
    icon: "img/card-icon/sass.png",
    cardsIdInHTML: []
  }
];







// Tutaj rozpoczynymy naszą zabawę z grą.
$(document).ready(function () { //Ta funkcja musi być zawsze.
  randomTheGame(); //Funkcja odpowiedzialna za randomizację gry.
  startGame(); //Funkcja odpowiadająca za start faktycznej gry dla użytkownika
});







// Funkcje do rozpoczęcia gry przez użytkownika 
function startGame() { //główna funkcja odpowiedzialna za uruchomienie mechanizmu gry
  $("body").on("click", ".game-card", function () { //po kliknięciu w dynamicznie dodaną KARTĘ NA STOLE o klasie "game-card" (dynamicznie dodany element to taki, którego wcześniej nie dodaliśmy w HTML'u tylko poprzez Javvascript)
    var clickedCardId = $(this).attr("id"); //Tutaj do zmiennej wrzucamy id klikniętej KARTY NA STOLE
    if (checkIfCardIsNotOpen(clickedCardId)) { //Tutaj funkcja sprawdza czy kliknięta przez nas KARTNA NA STOLE nie została już odkrytwa. Jeżeli nie została - to robi funkcje poniżej, w przeciwnym wypadku wyrzuca alert.
      addRoundsScore(); //Ta funkcja dodaje jeden do liczby rund
      openCard(clickedCardId); //Ta funkcja odsłania KARTĘ NA STOLE
      addCardToClickArray(clickedCardId); //Ta funckja dodaje OBIEKT KARTY klikniętej do tablicy "clickArray" - po to aby móc sprawdzić, czy kolejny kliknięty element będzie tym samym elementem co kliknięty teraz
      setTimeout(function () { //Ta funkcja odpowiada odpowiada za to, aby funkcje które znajdują się wewnątrz wykonały się po upływie 100milisekund - służy to po to, aby karty choć przez chwilę były odsłonięte zanim znikną (dodatek estetyczny - nic nie zmienia w działaniu) 
        checkClickArray(); // Funckja sprawdzająca czy tablica "clickArray" posiada takie same dwa elementy, a później odpowiednio to obsługuje
        checkIfWin(); //Ta funkcja sprawdza czy wygraliśmy (sprawdza czy ilość punktów równa się ilości posiadanych OBIEKTÓW KART w tablicy "cards")
      }, 100); // Tutaj jest argument omówionej wcześniej funckji "setTimeout", mówi on ile czasu ma odczekać skrypt zanim go wykona, w tym wypadku to 100milisekund
    } else {//Tutaj wchodzimy gdy klikniemy w KARTĘ NA STOLE, która jest odkryta
      alert("Ta karta zostala już odkryta. Wybierz inną kartę"); //Zwykł alert
    }
  });
}


function checkIfCardIsNotOpen(clickedCardId) { //Ta funckja sprawdza czy KARTA NA STOLE jest odsłonięta (przyjmuje jako argument id klikniętej KARTY NA STOLE)
  if ($("#" + clickedCardId).find(".selected-img").length == 0) { //Tutaj założyłem że odsłonięta karta to taka, która posiada w sobie obrazek
    return true; // Jeżeli posiada obrazek zwraca true
  } //Nie musimy posiadać else, ponieważ return kończy funckję, więc jeżeli nie zrobi return true (bo może tam nie wejść), to zwróci w każdym innym przypadku false
  return false; // Jeżeli nie posiada obrazka zwaraca false
}


function openCard(clickedCardId) { //Ta funkcja odsłania KARTĘ NA STOLE (przyjmuje jako argument id klikniętej KARTY NA STOLE)
  var cardObject = getCardWhichHasId(clickedCardId); //Tutaj przypisuje zmiennej OBIEKT KARTY, dzięki funkcji która rozpoznauje które id KARTY NA STOLE odpowiada OBIEKTOWI KARTY
  $("#" + clickedCardId).append('<img class="selected-img"src="' + cardObject.icon + '">'); // Tutaj do KARTY NA STOLE dodajemy obrazek z odpowiednią dla OBIEKTU KARTY ikoną
}


function addCardToClickArray(clickedCardId) { // Ta funckja dodaje OBIEKT KARTY do tablicy "clickArray" na podstawie id KARTY NA STOLE (przyjmuje jako argument id klikniętej KARTY NA STOLE)
  var cardObject = getCardWhichHasId(clickedCardId); //Tutaj przypisuje zmiennej OBIEKT KARTY, dzięki funkcji która rozpoznauje które id KARTY NA STOLE odpowiada OBIEKTOWI KARTY
  clickArray.push(cardObject); // Tutaj dodajemy obiekt do tablicy "clickArray"
}

function getCardWhichHasId(id) { //Ta funkcja rozpoznauje które id KARTY NA STOLE odpowiada OBIEKTOWI KARTY (przyjmuje jako argument id KARTY NA STOLE)
  for (var cardIndex in cards) { //Robimy iterację po wszystkich elementach tablicy "cards"
    var currentCard = cards[cardIndex]; // Przypisujemy zmiennej pojedynczy element OBIEKTU KARTY do zmiennej
    if (currentCard.cardsIdInHTML.includes(id)) { //Sprawdzamy czy OBIEKT KARTY posiada w swojej tablicy "cardsIdInHTML" konkretne id KARTY NA STOLE
      return currentCard; //Jeżeli znajdzie takie OBIEKT KARTY to go zwraca
    }
  }
}

function checkClickArray() { //Ta funckja sprawdza czy tablica "clickArray" posiada dwa elementy kliknięte. Jeżeli tak to sprawdza czy są takie same.
  if (clickArray.length == 2) { //Sprawdzamy czy w tablicy "clickArray" są dwa elementy
    if (clickArray[0] == clickArray[1]) { //Sprawdzamy czy zerowy element tablicy "clickArray" (który jest OBIEKTEM KARTY) jest równy pierwszemu elementowi tablicy "clickArray" (który jest OBIEKTEM KARTY)
      checkClickArraySuccess(); //Jeżeli są równe tutaj jest funckja odpowiedzialna sukces odkrytych KART NA STOLE
    } else {
      checkClickArrayFailure(); //Jeżeli nie są równe tutaj jest funckja odpowiedzialna przegraną odkrytych KART NA STOLE (nie poprawne odkrycie 2 takich samych KARTY NA STOLE)
    }
    clearClickArray(); //Tutaj za każdym razem kiedy elementów w tablicy "clickArray" jest dwa to pod koniec wykonania albo sukcesu albo porażki czyścimy tą tablicę (tablicę "clickArray")
  }
}


function clearClickArray() { //Ta funckja odpowiedzialna za czyszczenie tablicy "clickArray"
  clickArray = []; //Tablica przyjmuje wartość pustej tablicy, dzieki temu ją "resetuje"
}


function checkClickArrayFailure() { //Funckja odpowiedzialna przegraną odkrytych KART NA STOLE (nie poprawne odkrycie 2 takich samych KARTY NA STOLE)
  alert("Spróbuj ponownie"); //Wyświela alert
  closeAllCards(); //Chowa wszyskite karty
}


function closeAllCards() { // Ta funckja zasłania wszystkie KARTY NA STOLE
  $(".card").find(".selected-img").remove(); //Karty zasłonięte to takie karty które nie posiadają obrazków. Więc usuwam obrazki z wszystkich kart.
}


function checkClickArraySuccess() { //funckja odpowiedzialna sukces odkrytych KART NA STOLE (poprawne odkrycie 2 takich samych KARTY NA STOLE)
  var winCardObject = clickArray[0]; //Tutaj przypisujemy zmiennej jeden z dwóch elementów tablicy "clickArray", skoro są takie same (ze względu na to że wygraliśmy) ja biorę element zerowy
  alert("Gratulacje odgadłeś kartę: " + winCardObject.name); //Alert pokazujący nazwę wygranego OBIEKTU KARTY
  addPointsScore(); //Dodaje punkt do ogólnej punktacji
  addCardToWinCards(winCardObject); //Dodanie KARTY ZE STOŁU do obszaru odkrytych kart
  removeCard(winCardObject); //Usuwa KARTĘ ZE STOŁU z obszaru gry
}


function removeCard(cardObject) { //Usuwa KARTY NA STOLE z gry bazując na konkretnym OBIEKCIE KARTY i zmienia ją w pustą przestrzeń  (przyjmuje jako OBIEKT KARTY)
  for (var arrayIndex in cardObject.cardsIdInHTML) {  //tutaj iterujemy po wszstkich idkach z tablicy "cardsIdInHTML" w OBIEKCIE KARTY 
    var idToRemove = cardObject.cardsIdInHTML[arrayIndex]; //tutaj do zmiennej przypisujemy id wskazanej KARTY NA STOLE do usunięcia
    var cardToRemove = $("#" + idToRemove) //Przypisujemy do zmiennej nasz id wskazanej KARTY NA STOLE już jako możliwe do uzywania z funkcjami jQuery
    cardToRemove.html(""); //usuwamy całą zawartość ze środdka wskazanej KARTY NA STOLE
    cardToRemove.removeClass("game-card"); //usuwamy ze wskazanej KARTY NA STOLE klasę "game-card", która służyła nam do tego, aby można było w nią kliknąć
    cardToRemove.unbind(); //usuwamy z wskazanej KARTY NA STOLE możliwości kliknięcia w nią (upewniamy się że nie będzie można w nią kliknąć - tak na wszelki wypadek)
    cardToRemove.removeClass("card"); //usuwamy ze wskazanej KARTY NA STOLE klasę "card", aby usunięta karta nie wyglądała jak karta do usunięcia
    cardToRemove.addClass("card-holder") //dodajemy do pozostałości KARTY NA STOLE przygotowaną wcześniej klasę "card-holder", dzięki czemu reszta kart zostaje na swoim miejscu (nie mieszają się)
  }
}










//Funkcje odpowiedzialne za punktację
function addRoundsScore() { //Funckja dodająca jeden do ilości rund
  rounds++; //dodajemy do zmiennej rounds + 1
  refreshScoreOnBoard(); //Odświeżamy tablicę wyników
}
function addPointsScore() { //Funckja dodająca jeden do ilości punktów
  points++;  //dodajemy do zmiennej points + 1
  refreshScoreOnBoard(); //Odświeżamy tablicę wyników
}
function refreshScoreOnBoard() { // Funckja odpowiedzialna za odświeżanie tablicy wyników
  $("#point-score").text(points); //Odświeża ilość punktów
  $("#round-score").text(rounds); //Odświezą ilość rund
}







//Funckje odpowiedzialne za obszar odkrytych kart
function addCardToWinCards(cardObject) { //Funckja odpowiedzialna za dodanie karty do obszaru kart odkrytych (jako argument otrzymujemy OBIEKT KARTY)
  var card = '<div class="card"><img src=' + cardObject.icon + '></div>' // Przygotwujemy HTML Karty
  $("#win-cards").append(card); //Dodajemy kartę do obszaru kart odkrytych (obszar kart odkrytych reprezentuje id "win-cards")
}






//Funkcje odpowiedzialne za wygrywanie gry
function checkIfWin() { //Funckja sprawdzająca czy wygraliśmy grę, jeżeli tak - to wykonuje czynności
  if (cards.length == points) { //Sprawdzamy czy ilość OBIEKTÓW KART jest równa ilości punktów
    $("#board").html("<h1>Gratulacje wygrałeś!</h1>"); //Zamieniamy html w śródku całego obszaru gry na napis "Gratulacje wygrałeś!"
    $("#score-board").detach().appendTo('#board'); //Doklejemy również do tego tabelę wyników. (https://stackoverflow.com/a/19802593) 
  }
}







// Funkcje do randomizacji GRY 
function randomTheGame() { //Funkcja odpowiedzialna za randomizację gry.
  for (i = 0; i < cards.length * 2; i++) { //Pętla która bierze tyle ile jest OBIEKTÓW KART w tablicy "cards" i mnoży je razy 2 (ponieważ tyle KART NA STOLE będzie) 
    var cardId = generateRandomString(); //Tutaj generujemy randomowego stringa (będzie nam to służyło jak id jednej z KART NA STOLE)
    getRandomCardWithoutFullIds().cardsIdInHTML.push(cardId); //Tutaj dostajemy OBIEKT KARTY, który ma mniej niż 2 uzupełnione id w którym w tablicę "cardsIdInHTML" wrzucamy nasz nowy id
    var card = '<div class="card game-card" id="' + cardId + '"></div>' //Tutaj przygotowujemy HTML KARTY NA STOLE, wraz z naszym nowym id 
    $("#board").append(card); //Tutaj dodajemy do "#board" naszą KARTĘ NA STÓŁ
  }
}

function getRandomCardWithoutFullIds() { //Funckja która zwraca nam OBIEKT KARTY z tablicy obiektów - dzięki tej funkcji mamy pewność że dostaniemy obiekt, który ma mniej niż dwie karty na stole oraz jest całkowicie losowy ( nie możemy przecież mieć 3 kart z tym samym obrazkiem)
  var availableArray = cards.filter( //Tutaj używamy funkcji filter - która filtruje w odpowiedni sposób całą tablicę "cards" w poszukiwaniu konkretnych OBIEKTÓW KART (w naszym wypadku posiadającego mniej niż 2 idki w cardsIdInHTML)
    function (singleCard) { //Funkcja "filter" przyjmuje funkcje ( a jako argument przyjmuje pojedynczy element który później możemy użyć w tej funkcji)
      return singleCard.cardsIdInHTML.length < 2; //Sprawdzamy czy OBIEKT KARTY posiada mniej niż 2 idki i jeżeli tak to dodajemy go do naszego filtra
    }); //Na końcu nasz filtr zapisuje wszystkie OBIKETY KART spełniające nasze wymagania do tablicy "availableArray"
  var randomIndex = Math.floor(Math.random() * availableArray.length); //Generuje randomowy index tablicy "cards", który przeszedł poprawnie przez nasz filtr
  return availableArray[randomIndex]; //Zwaraca losowy OBIEKT KARTY, który poprawnie przeszedł przez filtr 
}


function generateRandomString() { // Funkcja zwracająca randomowe znaki w ilości 7
  return (Math.random() + 1).toString(36).slice(7); // Bierze losową liczbę dodaje do niej 1, konwertuje ją na 36 system liczbowy i ucina ostatnie 7 - Nie trzeba znać konkretnego działania. Generuje świetną liczbę losową
}
