import CreateUser from "./gModels/ICreateUser";
import ShowProduct from "./gModels/ShowProduct";
import Student from "./gModels/Student";
import Temp from "./gModels/Temp";

/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getTotalJumpDistance(jumpings: number[]): number {
  return jumpings.reduce( (jumpDistanceSoFar, currentJump) => {
    return jumpDistanceSoFar + currentJump;
  });
};

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

function getStudentStatus(student: Student): string {
  if((student.name == 'Sebastian') && (student.handedInOnTime)){
    return 'VG';
  }
  return 'IG';
};

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

function averageWeeklyTemperature(weeklyTemperature: Temp[]) {
  const millisecondsInAWeek: number = 604800000;
  const daysInAWeek: number = 7;
  
  return weeklyTemperature.reduce((previous: number, current: Temp) => {
    if ((current.city === "Stockholm") && (current.todaysDate.getTime() > (Date.now() - millisecondsInAWeek))) {
      return previous + current.temperature;
    };
    return previous;
  }, 0
  ) / daysInAWeek;
};

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

function showProduct(product: ShowProduct) {
  let parent = product.parent;
  let container: HTMLElement = document.createElement("div");
  const title = createHeadingElement(product.name);
  const price = createStrongElement(product.price);
  const image = createImageElement(product.image);

  container.appendChild(title);
  container.appendChild(image);
  container.appendChild(price);
  parent.appendChild(container);
};

function createHeadingElement(name: string) {
  let headingElement = document.createElement("h4");
  headingElement.innerHTML = name;

  return headingElement;
};

function createStrongElement(price: number) {
  let strongElement = document.createElement("strong");
  strongElement.innerHTML = price.toString();

  return strongElement;
};

function createImageElement(image: string) {
  let imageElement = document.createElement("img");
  imageElement.src = image;

  return imageElement;
};

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
function presentStudents(students: Student[]) {
  for (const student of students) {
    let listItem: HTMLElement = document.createElement("li"); //dubbelkolla detta
    let checkbox = createCheckbox(student.handedInOnTime);

    listItem.appendChild(checkbox);

    let listOfStudents = student.handedInOnTime ? document.querySelector('ul#passedstudents') : document.querySelector("ul#failedstudents");
  }
};  

function createCheckbox(handedInOnDeadline: boolean) {
  let checkbox: HTMLInputElement = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = handedInOnDeadline;

  return checkbox;
};

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
function concatenateStrings(): string {
  let texts: string[] = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];

  return texts.join(' ');
};

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
function createUser(user: CreateUser) {
  // Validation
  const epochStartYear: number = 1970;
  const minAge: number = 20;

  let ageDiffInMilliSeconds = Date.now() - user.birthday.getTime();
  let ageInDateFormat = new Date(ageDiffInMilliSeconds);
  let userAge = Math.abs(ageInDateFormat.getUTCFullYear() - epochStartYear);

  if (userAge > minAge) {
    // Logik för att skapa en användare
  } else {
    return `Du är under ${minAge} år.`;
  };
};




