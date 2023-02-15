import CreateUser from "./models/CreateUser";
import Student from "./models/Student";
import Temp from "./models/Temp";

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
  const MILLISECONDS_IN_A_WEEK: number = 604800000;
  const DAYS_IN_A_WEEK: number = 7;
  
  /*let r = 0;

  for (let i = 0; i < weeklyTemperature.length; i++) {
    if (weeklyTemperature[i].city === "Stockholm") {
      if (weeklyTemperature[i].todaysDate.getTime() > Date.now() - MILLISECONDS_IN_A_WEEK) {
        r += weeklyTemperature[i].temperature;
      }
    }
  }*/

  return weeklyTemperature.reduce((previous: number, current: Temp) => {
    if (current.city === "Stockholm" && current.todaysDate.getTime() > Date.now() - MILLISECONDS_IN_A_WEEK) {
      return previous + current.temperature;
    };
    return previous;
  }, 0
  ) / DAYS_IN_A_WEEK;
};

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

function showProduct(
  name: string,
  price: number,
  amount: number,
  description: string,
  image: string,
  parent: HTMLElement
) {
  let container = document.createElement("div");
  let title = document.createElement("h4");
  let pris = document.createElement("strong");
  let imageTag = document.createElement("img");

  title.innerHTML = name;
  pris.innerHTML = price.toString();
  imageTag.src = image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(pris);
  parent.appendChild(container);
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
function presentStudents(students: Student[]) {
  for (const student of students) {
    if (student.handedInOnTime) {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#passedstudents");
      listOfStudents?.appendChild(container);
    } else {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#failedstudents");
      listOfStudents?.appendChild(container);
    }
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
function concatenateStrings() {
  let texts: string[] = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];

  return texts.join(' ');
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
function createUser(user: CreateUser) {
  // Validation

  let ageDiff = Date.now() - user.birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (!(userAge < 20)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
