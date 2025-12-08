// Fetch e armazenar as classificação dos pilotos
const fetchDriverStandings = async () => {
  try {
    const response = await fetch(
      "https://api.jolpi.ca/ergast/f1/current/driverStandings.json",
    );
    const data = await response.json();
    const standings =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    const maxStanding = standings.find(
      (driver) => driver.Driver.driverId === "max_verstappen",
    );
    const yukiStanding = standings.find(
      (driver) => driver.Driver.driverId === "tsunoda",
    );

    const points = {
      max: maxStanding ? parseInt(maxStanding.points) : 0,
      yuki: yukiStanding ? parseInt(yukiStanding.points) : 0,
    };

    localStorage.setItem("points", JSON.stringify(points));
    return points;
  } catch (error) {
    console.error("Error fetching driver standings:", error);
    const stored = localStorage.getItem("points");
    return stored ? JSON.parse(stored) : { max: 341, yuki: 28 };
  }
};

// Fetch e armazenar a próxima corrida
const fetchNextRace = async () => {
  try {
    const response = await fetch(
      "https://api.jolpi.ca/ergast/f1/current/next.json",
    );
    const data = await response.json();
    if (!data.MRData.RaceTable.Races.length) {
      localStorage.removeItem("nextEvent");
      return null;
    }
    const race = data.MRData.RaceTable.Races[0];

    const eventDate = new Date(`${race.date}T${race.time || "00:00:00"}`);
    const nextEvent = {
      name: race.raceName.replace(" Grand Prix", ""),
      date: eventDate.toISOString(),
    };

    localStorage.setItem("nextEvent", JSON.stringify(nextEvent));
    return nextEvent;
  } catch (error) {
    console.error("Error fetching next race:", error);
    const stored = localStorage.getItem("nextEvent");
    return stored
      ? JSON.parse(stored)
      : {
          name: "Las Vegas",
          date: new Date("2025-11-23T04:00:00").toISOString(),
        };
  }
};

// Carregar e exibir os dados na página
const loadDriverStandings = async () => {
  const cached = localStorage.getItem("points");
  if (cached) {
    const points = JSON.parse(cached);
    document.getElementById("max-points").textContent = points.max;
    document.getElementById("yuki-points").textContent = points.yuki;
  }

  const points = await fetchDriverStandings();
  document.getElementById("max-points").textContent = points.max;
  document.getElementById("yuki-points").textContent = points.yuki;
};

const loadNextRace = async () => {
  const cached = localStorage.getItem("nextEvent");
  if (cached) {
    const nextEvent = JSON.parse(cached);
    document.getElementById("event-name").textContent = nextEvent.name;
  }

  const nextEvent = await fetchNextRace();
  if (!nextEvent) {
    document.querySelector(".next-event").innerHTML = "<h2>Fim da Temporada</h2>";
    return;
  }
  document.getElementById("event-name").textContent = nextEvent.name;
};

loadDriverStandings();
loadNextRace();

// Contagem regressiva para o próximo evento
const countdownElement = document.getElementById("countdown-event");

const updateCountdown = () => {
  const nextEvent = JSON.parse(localStorage.getItem("nextEvent"));
  if (!nextEvent) {
    countdownElement.textContent = "";
    return;
  }
  const eventDate = new Date(nextEvent.date);
  const now = new Date();
  const difference = eventDate - now;

  // Calcular dias, horas, minutos e segundos
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

// Atualizar a cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);

// Flip card
document.querySelectorAll(".driver").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});
