// Mapeo oficial de IDs y nombres de equipos de la LMB en la API de MLB Stats
const TEAM_MAP = {
  532: { name: "Diablos Rojos del México", short: "Diablos Rojos" },
  562: { name: "Sultanes de Monterrey", short: "Sultanes" },
  496: { name: "Leones de Yucatán", short: "Leones" },
  560: { name: "Acereros del Norte", short: "Acereros" },
  524: { name: "Algodoneros de Unión Laguna", short: "Algodoneros" },
  554: { name: "Saraperos de Saltillo", short: "Saraperos" },
  5010: { name: "Toros de Tijuana", short: "Toros" },
  520: { name: "Pericos de Puebla", short: "Pericos" },
  442: { name: "Olmecas de Tabasco", short: "Olmecas" },
  579: { name: "Guerreros de Oaxaca", short: "Guerreros" },
  434: { name: "Bravos de León", short: "Bravos" },
  528: { name: "Rieleros de Aguascalientes", short: "Rieleros" },
  522: { name: "Tecolotes de los Dos Laredos", short: "Tecos" },
  526: { name: "Piratas de Campeche", short: "Piratas" },
  494: { name: "Tigres de Quintana Roo", short: "Tigres" },
  550: { name: "El Águila de Veracruz", short: "El Águila" },
  6304: { name: "Charros de Jalisco", short: "Charros" },
  4444: { name: "Caliente de Durango", short: "Caliente" },
  6303: { name: "Conspiradores de Querétaro", short: "Conspiradores" },
  6302: { name: "Dorados de Chihuahua", short: "Dorados" }
};

// Base de datos de respaldo en caso de que falle la API (LMB)
const FALLBACK_DATABASE = {
  532: {
    nombre: "Diablos Rojos del México",
    short: "Diablos Rojos",
    bateo: { avg: 0.312, obp: 0.385, slg: 0.518, ops: 0.903, r: 604, hr: 116, g: 78, ab: 2740, h: 855 },
    pitcheo: { era: 3.85, whip: 1.28, hr: 72, bb: 245, so: 620, avg: 0.242 },
    abridor: { nombre: "Trevor Bauer", era: 2.10, whip: 0.98, hr: 2, bb: 14, so: 76, ip: 58.0, fip: 2.05, wl: "8-1" }
  },
  562: {
    nombre: "Sultanes de Monterrey",
    short: "Sultanes",
    bateo: { avg: 0.285, obp: 0.355, slg: 0.440, ops: 0.795, r: 415, hr: 82, g: 77, ab: 2600, h: 741 },
    pitcheo: { era: 4.15, whip: 1.34, hr: 85, bb: 268, so: 565, avg: 0.258 },
    abridor: { nombre: "Daniel Mengden", era: 2.35, whip: 1.08, hr: 6, bb: 19, so: 79, ip: 92.0, fip: 2.50, wl: "7-2" }
  },
  496: {
    nombre: "Leones de Yucatán",
    short: "Leones",
    bateo: { avg: 0.272, obp: 0.348, slg: 0.420, ops: 0.768, r: 398, hr: 65, g: 76, ab: 2521, h: 683 },
    pitcheo: { era: 3.65, whip: 1.25, hr: 59, bb: 235, so: 599, avg: 0.238 },
    abridor: { nombre: "César Valdez", era: 2.85, whip: 1.12, hr: 3, bb: 8, so: 32, ip: 52.0, fip: 3.10, wl: "5-3" }
  },
  5010: {
    nombre: "Toros de Tijuana",
    short: "Toros",
    bateo: { avg: 0.282, obp: 0.352, slg: 0.455, ops: 0.807, r: 367, hr: 85, g: 75, ab: 2500, h: 705 },
    pitcheo: { era: 3.36, whip: 1.18, hr: 52, bb: 183, so: 698, avg: 0.242 },
    abridor: { nombre: "Daniel Martinez", era: 2.11, whip: 1.07, hr: 3, bb: 31, so: 59, ip: 76.2, fip: 2.80, wl: "6-1" }
  },
  520: {
    nombre: "Pericos de Puebla",
    short: "Pericos",
    bateo: { avg: 0.304, obp: 0.374, slg: 0.479, ops: 0.853, r: 435, hr: 85, g: 76, ab: 2570, h: 782 },
    pitcheo: { era: 4.82, whip: 1.45, hr: 88, bb: 272, so: 545, avg: 0.266 },
    abridor: { nombre: "Gabriel Ynoa", era: 3.98, whip: 1.30, hr: 5, bb: 10, so: 41, ip: 42.0, fip: 3.80, wl: "4-3" }
  }
};

// Base de datos de respaldo en caso de que falle la API (MLB)
const FALLBACK_DATABASE_MLB = {
  147: {
    nombre: "New York Yankees",
    short: "Yankees",
    bateo: { avg: 0.254, obp: 0.333, slg: 0.440, ops: 0.773, r: 815, hr: 237, g: 162, ab: 5480, h: 1392 },
    pitcheo: { era: 3.74, whip: 1.24, hr: 178, bb: 480, so: 1450, avg: 0.231 },
    abridor: { nombre: "Gerrit Cole", era: 3.26, whip: 1.05, hr: 18, bb: 40, so: 220, ip: 200.0, fip: 3.15, wl: "15-4" }
  },
  119: {
    nombre: "Los Angeles Dodgers",
    short: "Dodgers",
    bateo: { avg: 0.272, obp: 0.345, slg: 0.455, ops: 0.800, r: 890, hr: 249, g: 162, ab: 5520, h: 1501 },
    pitcheo: { era: 3.52, whip: 1.20, hr: 165, bb: 450, so: 1500, avg: 0.225 },
    abridor: { nombre: "Yoshinobu Yamamoto", era: 3.00, whip: 1.11, hr: 12, bb: 35, so: 180, ip: 170.0, fip: 2.95, wl: "12-5" }
  },
  117: {
    nombre: "Houston Astros",
    short: "Astros",
    bateo: { avg: 0.262, obp: 0.329, slg: 0.428, ops: 0.757, r: 809, hr: 222, g: 162, ab: 5500, h: 1441 },
    pitcheo: { era: 3.94, whip: 1.28, hr: 182, bb: 510, so: 1410, avg: 0.239 },
    abridor: { nombre: "Framber Valdez", era: 3.45, whip: 1.21, hr: 19, bb: 55, so: 188, ip: 198.0, fip: 3.50, wl: "14-8" }
  },
  111: {
    nombre: "Boston Red Sox",
    short: "Red Sox",
    bateo: { avg: 0.258, obp: 0.324, slg: 0.424, ops: 0.748, r: 772, hr: 188, g: 162, ab: 5550, h: 1432 },
    pitcheo: { era: 4.04, whip: 1.30, hr: 195, bb: 490, so: 1380, avg: 0.245 },
    abridor: { nombre: "Brayan Bello", era: 4.10, whip: 1.28, hr: 22, bb: 58, so: 150, ip: 175.0, fip: 4.05, wl: "10-10" }
  }
};

// Configuración de Ligas Soportadas
const LEAGUE_CONFIGS = {
  LMB: {
    sportId: 23,
    leagueId: "125",
    cacheKey: "lmb_data_v3",
    label: "Liga Mexicana de Béisbol",
    badgeClass: "badge-lmb",
    fallback: FALLBACK_DATABASE,
    defaultTeamA: "532", // Diablos Rojos
    defaultTeamB: "562"  // Sultanes
  },
  MLB: {
    sportId: 1,
    leagueId: "103,104",
    cacheKey: "mlb_data_v3",
    label: "Grandes Ligas (MLB)",
    badgeClass: "badge-mlb",
    fallback: FALLBACK_DATABASE_MLB,
    defaultTeamA: "147", // Yankees
    defaultTeamB: "119"  // Dodgers
  }
};

// Variables de estado global
let activeLeague = "LMB";
let loadedTeams = {};
let leagueData = {
  teams: {},
  pitchers: {},
  games: []
};

let activeBullpenFatigue = {
  homeScore: 0,
  awayScore: 0,
  homeStatus: "Fresco",
  awayStatus: "Fresco",
  homeYesterday: "-",
  awayYesterday: "-"
};
let boxscoreCache = {};

let teamAKey = "532";
let teamBKey = "562";
const CURRENT_SEASON = new Date().getFullYear();

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", async () => {
  // Restaurar tema guardado
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    toggleTheme();
  }

  // Ajustar fecha
  document.getElementById("lmb-date").textContent = CURRENT_SEASON;
  
  // Establecer fecha de hoy en el selector
  const todayStr = getTodayDateString();
  const dateInput = document.getElementById("game-date-input");
  if (dateInput) {
    dateInput.value = todayStr;
    dateInput.addEventListener("change", async (e) => {
      if (e.target.value) {
        showLoading(true, "Cargando partidos de la fecha...");
        await loadDailyGames(e.target.value);
        showLoading(false);
      }
    });
  }

  // Cargar datos principales de la liga activa (LMB por defecto)
  const config = LEAGUE_CONFIGS[activeLeague];
  showLoading(true, `Cargando datos en tiempo real de ${config.label}...`);
  const success = await initLeagueData(activeLeague);
  
  if (success) {
    loadedTeams = { ...leagueData.teams };
    populateTeamSelectors();
    await loadDailyGames(todayStr);

    if (leagueData.games && leagueData.games.length > 0) {
      selectGame(0);
    }
  } else {
    loadedTeams = { ...config.fallback };
    populateTeamSelectors();
    document.getElementById("sync-status-msg").textContent = `Trabajando con base de respaldo de ${config.label} (Sin conexión API)`;
    document.getElementById("sync-status-msg").className = "status-msg text-warning";
  }

  showLoading(false);
  recalculateAnalysis();
  startAutoRefreshTimer();
});

/**
 * Retorna la fecha de hoy en formato YYYY-MM-DD
 */
function getTodayDateString() {
  try {
    // Retorna la fecha actual en la zona horaria de Tijuana en formato YYYY-MM-DD
    const options = { timeZone: 'America/Tijuana', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatter = new Intl.DateTimeFormat('fr-CA', options);
    return formatter.format(new Date());
  } catch (e) {
    console.error("Error al obtener fecha de Tijuana, usando local...", e);
    const d = new Date();
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }
}

/**
 * Controla el spinner de carga
 */
function showLoading(show, message = "Procesando...") {
  const spinner = document.getElementById("global-spinner");
  const spMsg = document.getElementById("spinner-message");
  if (spinner) {
    if (show) {
      if (spMsg) spMsg.textContent = message;
      spinner.style.display = "flex";
    } else {
      spinner.style.display = "none";
    }
  }
}

/**
 * Cambia la liga activa (LMB / MLB), descarga los datos correspondientes y actualiza la UI
 */
async function changeLeague(leagueKey) {
  if (activeLeague === leagueKey) return;
  
  activeLeague = leagueKey;

  // Actualizar botones de la cabecera
  document.getElementById("btn-lmb").classList.toggle("active", leagueKey === "LMB");
  document.getElementById("btn-mlb").classList.toggle("active", leagueKey === "MLB");

  // Actualizar badge de liga
  const badge = document.getElementById("league-badge");
  if (badge) {
    const config = LEAGUE_CONFIGS[leagueKey];
    badge.textContent = config.label;
    badge.className = `badge ${config.badgeClass}`;
  }

  // Cambiar llaves y equipos por defecto de la liga
  const config = LEAGUE_CONFIGS[leagueKey];
  teamAKey = config.defaultTeamA;
  teamBKey = config.defaultTeamB;

  showLoading(true, `Cargando datos de ${config.label}...`);
  const success = await initLeagueData(leagueKey);

  if (success) {
    loadedTeams = { ...leagueData.teams };
    populateTeamSelectors();
    
    // Obtener la fecha del input y cargar los partidos
    const dateInput = document.getElementById("game-date-input");
    const dateStr = dateInput ? dateInput.value : getTodayDateString();
    await loadDailyGames(dateStr);

    if (leagueData.games && leagueData.games.length > 0) {
      selectGame(0);
    }
  } else {
    // Usar base de datos fallback
    loadedTeams = { ...config.fallback };
    populateTeamSelectors();
    document.getElementById("sync-status-msg").textContent = `Trabajando con datos de respaldo de ${config.label}`;
    document.getElementById("sync-status-msg").className = "status-msg text-warning";
  }

  showLoading(false);
  recalculateAnalysis();
}

/**
 * Inicializa y descarga standings y estadísticas de la liga seleccionada
 */
async function initLeagueData(leagueKey, force = false) {
  const config = LEAGUE_CONFIGS[leagueKey];
  const cacheKey = `${config.cacheKey}_${CURRENT_SEASON}`;
  const cached = localStorage.getItem(cacheKey);
  const cacheTime = localStorage.getItem(`${cacheKey}_time`);
  
  // Cache de 3 horas para estadísticas de temporada regular (se omite si force es true)
  if (!force && cached && cacheTime && (Date.now() - parseInt(cacheTime) < 3 * 60 * 60 * 1000)) {
    try {
      leagueData = JSON.parse(cached);
      console.log(`Cargados datos de ${leagueKey} desde el caché local`);
      updateSyncBadge();
      return true;
    } catch (e) {
      console.warn("Fallo al leer el caché", e);
    }
  }

  try {
    const season = CURRENT_SEASON;
    
    // 1. Obtener Standings (Victorias, Derrotas y Récord General)
    const standingsRes = await fetch(`https://statsapi.mlb.com/api/v1/standings?leagueId=${config.leagueId}&season=${season}`);
    if (!standingsRes.ok) throw new Error("Fallo al obtener standings");
    const standingsData = await standingsRes.json();
    
    const standingsMap = {};
    if (standingsData.records) {
      standingsData.records.forEach(record => {
        if (record.teamRecords) {
          record.teamRecords.forEach(tr => {
            standingsMap[tr.team.id] = {
              wins: tr.wins || 0,
              losses: tr.losses || 0,
              pct: parseFloat(tr.winningPercentage) || 0.0,
              runsScored: tr.runsScored || 0,
              runsAllowed: tr.runsAllowed || 0,
              diff: tr.runDifferential || 0
            };
          });
        }
      });
    }

    // 2. Obtener Bateo Colectivo
    const hittingRes = await fetch(`https://statsapi.mlb.com/api/v1/teams/stats?season=${season}&stats=season&group=hitting&sportIds=${config.sportId}`);
    if (!hittingRes.ok) throw new Error("Fallo al obtener bateo colectivo");
    const hittingData = await hittingRes.json();

    // 3. Obtener Pitcheo Colectivo
    const pitchingRes = await fetch(`https://statsapi.mlb.com/api/v1/teams/stats?season=${season}&stats=season&group=pitching&sportIds=${config.sportId}`);
    if (!pitchingRes.ok) throw new Error("Fallo al obtener pitcheo colectivo");
    const pitchingData = await pitchingRes.json();

    // 4. Obtener Todos los Lanzadores para Estadísticas de Abridores (Usando playerPool=all para incluir no-calificados)
    const playersRes = await fetch(`https://statsapi.mlb.com/api/v1/stats?stats=season&group=pitching&sportId=${config.sportId}&season=${season}&limit=1200&playerPool=all`);
    if (!playersRes.ok) throw new Error("Fallo al obtener lanzadores individuales");
    const playersData = await playersRes.json();

    const pitchersMap = {};
    if (playersData.stats && playersData.stats[0] && playersData.stats[0].splits) {
      playersData.stats[0].splits.forEach(split => {
        if (split.player) {
          const p = split.player;
          const s = split.stat || {};
          const ip = parseFloat(s.inningsPitched) || 0;
          const fip = window.predictor.calculateFIP(s.homeRuns || 0, s.baseOnBalls || 0, s.strikeOuts || 0, ip);
          
          pitchersMap[p.id] = {
            id: p.id,
            nombre: p.fullName,
            teamId: split.team ? split.team.id : null,
            era: parseFloat(s.era) || 0.0,
            whip: parseFloat(s.whip) || 0.0,
            hr: parseInt(s.homeRuns) || 0,
            bb: parseInt(s.baseOnBalls) || 0,
            so: parseInt(s.strikeOuts) || 0,
            ip: ip,
            fip: fip,
            wl: `${s.wins || 0}-${s.losses || 0}`
          };
        }
      });
    }

    // Procesar Equipos y vincular Bateo y Pitcheo
    const teamsMap = {};
    if (hittingData.stats && hittingData.stats[0] && hittingData.stats[0].splits) {
      hittingData.stats[0].splits.forEach(split => {
        const t = split.team;
        const s = split.stat || {};
        const shortName = TEAM_MAP[t.id] ? TEAM_MAP[t.id].short : t.name;

        teamsMap[t.id] = {
          id: t.id,
          nombre: t.name,
          short: shortName,
          records: standingsMap[t.id] || { wins: 0, losses: 0, pct: 0.0, runsScored: 0, runsAllowed: 0, diff: 0 },
          bateo: {
            avg: parseFloat(s.avg) || 0.0,
            obp: parseFloat(s.obp) || 0.0,
            slg: parseFloat(s.slg) || 0.0,
            ops: parseFloat(s.ops) || 0.0,
            r: parseInt(s.runs) || 0,
            hr: parseInt(s.homeRuns) || 0,
            g: parseInt(s.gamesPlayed) || 0,
            ab: parseInt(s.atBats) || 0,
            h: parseInt(s.hits) || 0,
            d: parseInt(s.doubles) || 0,
            t: parseInt(s.triples) || 0,
            rbi: parseInt(s.rbi) || 0,
            bb: parseInt(s.baseOnBalls) || 0,
            so: parseInt(s.strikeOuts) || 0,
            sb: parseInt(s.stolenBases) || 0,
            cs: parseInt(s.caughtStealing) || 0
          },
          pitcheo: {
            era: 4.50, whip: 1.40, hr: 0, bb: 0, so: 0, avg: 0.270, w: 0, l: 0, sv: 0, ip: 0, h: 0, r: 0, er: 0
          },
          abridor: {
            nombre: "Por anunciar", era: 4.50, whip: 1.35, hr: 0, bb: 0, so: 0, ip: 0.0, fip: 4.50, wl: "0-0"
          }
        };
      });
    }

    if (pitchingData.stats && pitchingData.stats[0] && pitchingData.stats[0].splits) {
      pitchingData.stats[0].splits.forEach(split => {
        const t = split.team;
        const s = split.stat || {};
        if (teamsMap[t.id]) {
          teamsMap[t.id].pitcheo = {
            era: parseFloat(s.era) || 0.0,
            whip: parseFloat(s.whip) || 0.0,
            hr: parseInt(s.homeRuns) || 0,
            bb: parseInt(s.baseOnBalls) || 0,
            so: parseInt(s.strikeOuts) || 0,
            avg: parseFloat(s.avg) || 0.0, // BAA (Bateo en contra)
            w: parseInt(s.wins) || 0,
            l: parseInt(s.losses) || 0,
            sv: parseInt(s.saves) || 0,
            ip: parseFloat(s.inningsPitched) || 0,
            h: parseInt(s.hits) || 0,
            r: parseInt(s.runs) || 0,
            er: parseInt(s.earnedRuns) || 0
          };
        }
      });
    }

    // Comprobación de seguridad
    if (Object.keys(teamsMap).length === 0) {
      console.warn(`API de ${leagueKey} retornó 0 equipos. Usando base local.`);
      return false;
    }

    leagueData.teams = teamsMap;
    leagueData.pitchers = pitchersMap;

    // Guardar en caché local
    localStorage.setItem(cacheKey, JSON.stringify(leagueData));
    localStorage.setItem(`${cacheKey}_time`, Date.now().toString());

    updateSyncBadge();
    return true;
  } catch (error) {
    console.error(`Error al descargar datos de ${leagueKey} de la API:`, error);
    return false;
  }
}

/**
 * Actualiza el indicador visual de última sincronización
 */
function updateSyncBadge() {
  const syncBadge = document.getElementById("sync-status-msg");
  if (syncBadge) {
    const config = LEAGUE_CONFIGS[activeLeague];
    syncBadge.textContent = `Datos oficiales de ${config.label} sincronizados en vivo`;
    syncBadge.className = "status-msg text-success";
  }
}

/**
 * Descarga y renderiza los partidos programados para una fecha específica
 */
async function loadDailyGames(dateStr) {
  const gamesGrid = document.getElementById("games-carousel");
  if (!gamesGrid) return;
  
  gamesGrid.innerHTML = `<div class="status-msg text-muted">Buscando partidos...</div>`;

  try {
    const config = LEAGUE_CONFIGS[activeLeague];
    const scheduleRes = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=${config.sportId}&date=${dateStr}&hydrate=probablePitcher`);
    if (!scheduleRes.ok) throw new Error();
    const scheduleData = await scheduleRes.json();
    
    const gamesList = [];
    if (scheduleData.dates && scheduleData.dates[0] && scheduleData.dates[0].games) {
      scheduleData.dates[0].games.forEach(g => {
        const awayTeam = g.teams.away;
        const homeTeam = g.teams.home;
        const status = g.status || {};
        const awayProbable = awayTeam.probablePitcher || {};
        const homeProbable = homeTeam.probablePitcher || {};
        
        // Obtener nombres cortos si existen en el mapa global, sino usar el del equipo
        const homeShort = TEAM_MAP[homeTeam.team.id] ? TEAM_MAP[homeTeam.team.id].short : homeTeam.team.name;
        const awayShort = TEAM_MAP[awayTeam.team.id] ? TEAM_MAP[awayTeam.team.id].short : awayTeam.team.name;

        gamesList.push({
          gamePk: g.gamePk,
          gameDate: g.gameDate,
          status: status.detailedState || "Programado",
          statusCode: status.statusCode,
          awayId: awayTeam.team.id,
          awayName: awayShort,
          awayScore: awayTeam.score !== undefined ? awayTeam.score : "-",
          awayRecord: awayTeam.leagueRecord ? `${awayTeam.leagueRecord.wins}-${awayTeam.leagueRecord.losses}` : "",
          awayStarterName: awayProbable.fullName || "Por anunciar",
          awayStarterId: awayProbable.id || null,
          
          homeId: homeTeam.team.id,
          homeName: homeShort,
          homeScore: homeTeam.score !== undefined ? homeTeam.score : "-",
          homeRecord: homeTeam.leagueRecord ? `${homeTeam.leagueRecord.wins}-${homeTeam.leagueRecord.losses}` : "",
          homeStarterName: homeProbable.fullName || "Por anunciar",
          homeStarterId: homeProbable.id || null
        });
      });
    }

    leagueData.games = gamesList;
    renderGamesCarousel();
  } catch (error) {
    console.error("Fallo al cargar el calendario diario:", error);
    gamesGrid.innerHTML = `<div class="status-msg text-error">No se pudieron cargar partidos para esta fecha.</div>`;
  }
}

/**
 * Renderiza el carrusel superior de juegos
 */
function renderGamesCarousel() {
  const container = document.getElementById("games-carousel");
  if (!container) return;

  const config = LEAGUE_CONFIGS[activeLeague];
  if (leagueData.games.length === 0) {
    container.innerHTML = `<div class="status-msg text-muted">No hay partidos programados para esta fecha en ${config.label}.</div>`;
    return;
  }

  container.innerHTML = "";
  leagueData.games.forEach((game, idx) => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.setAttribute("onclick", `selectGame(${idx})`);
    
    // Badge de estado
    let badgeClass = "game-status-badge";
    if (game.statusCode === "F" || game.statusCode === "O") badgeClass += " status-final";
    else if (game.statusCode === "I") badgeClass += " status-live";
    else badgeClass += " status-scheduled";

    // Formatear hora de Tijuana
    let timeStr = "";
    if (game.gameDate) {
      try {
        const dateObj = new Date(game.gameDate);
        timeStr = dateObj.toLocaleTimeString('es-MX', {
          timeZone: 'America/Tijuana',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      } catch (e) {
        console.error("Error al formatear fecha de Tijuana", e);
      }
    }

    card.innerHTML = `
      <div class="game-card-header" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <span class="${badgeClass}">${game.status}</span>
        ${timeStr ? `<span class="game-time-lbl" style="font-size: 0.65rem; color: var(--text-muted); font-family: var(--font-mono); font-weight: 700;">${timeStr} (TIJ)</span>` : ""}
      </div>
      <div class="game-card-teams">
        <div class="game-card-team">
          <span class="team-name-lbl">${game.awayName}</span>
          <span class="team-score-lbl">${game.awayScore}</span>
        </div>
        <div class="game-card-team">
          <span class="team-name-lbl">${game.homeName}</span>
          <span class="team-score-lbl">${game.homeScore}</span>
        </div>
      </div>
      <div class="game-card-pitchers">
        <div class="pitcher-lbl"><span>VIS:</span> ${game.awayStarterName}</div>
        <div class="pitcher-lbl"><span>LOC:</span> ${game.homeStarterName}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

/**
 * Selecciona un juego del carrusel y lo carga automáticamente en los paneles de análisis
 */
function selectGame(index) {
  const game = leagueData.games[index];
  if (!game) return;

  // Actualizar dropdowns
  const selectA = document.getElementById("select-team-a");
  const selectB = document.getElementById("select-team-b");
  
  if (selectA && selectB) {
    selectA.value = game.homeId;
    selectB.value = game.awayId;
  }

  teamAKey = game.homeId.toString();
  teamBKey = game.awayId.toString();

  // Clonar la estructura base de datos de los equipos seleccionados
  const teamHome = JSON.parse(JSON.stringify(leagueData.teams[game.homeId]));
  const teamAway = JSON.parse(JSON.stringify(leagueData.teams[game.awayId]));

  // Ligar datos reales de abridores si existen en el mapa global
  if (game.homeStarterId && leagueData.pitchers[game.homeStarterId]) {
    teamHome.abridor = { ...leagueData.pitchers[game.homeStarterId] };
  } else {
    teamHome.abridor = {
      nombre: game.homeStarterName,
      era: 4.50, whip: 1.35, hr: 0, bb: 0, so: 0, ip: 0.0, fip: 4.50, wl: "0-0"
    };
  }

  if (game.awayStarterId && leagueData.pitchers[game.awayStarterId]) {
    teamAway.abridor = { ...leagueData.pitchers[game.awayStarterId] };
  } else {
    teamAway.abridor = {
      nombre: game.awayStarterName,
      era: 4.50, whip: 1.35, hr: 0, bb: 0, so: 0, ip: 0.0, fip: 4.50, wl: "0-0"
    };
  }

  // Sobrescribir en la base de datos de memoria
  loadedTeams[teamAKey] = teamHome;
  loadedTeams[teamBKey] = teamAway;

  // Actualizar estilos activos de las tarjetas
  const cards = document.querySelectorAll(".game-card");
  cards.forEach((card, idx) => {
    if (idx === index) card.classList.add("active");
    else card.classList.remove("active");
  });

  // Llenar selectores de lanzadores y abridores
  populatePitcherSelectors(teamAKey, teamBKey);

  // Iniciar estado de carga para fatiga del bullpen
  activeBullpenFatigue = {
    homeScore: "...",
    awayScore: "...",
    homeStatus: "Calculando...",
    awayStatus: "Calculando...",
    homeYesterday: "Calculando...",
    awayYesterday: "Calculando..."
  };

  // Ejecutar el motor predictivo inicial
  recalculateAnalysis();

  // Disparar el análisis en segundo plano
  analyzeBullpenFatigue(teamAKey, teamBKey);
}

/**
 * Rellena los selectores de equipos
 */
function populateTeamSelectors() {
  const selectA = document.getElementById("select-team-a");
  const selectB = document.getElementById("select-team-b");
  
  if (!selectA || !selectB) return;

  selectA.innerHTML = "";
  selectB.innerHTML = "";

  Object.keys(loadedTeams).forEach(key => {
    const optA = document.createElement("option");
    optA.value = key;
    optA.textContent = loadedTeams[key].nombre;
    selectA.appendChild(optA);

    const optB = document.createElement("option");
    optB.value = key;
    optB.textContent = loadedTeams[key].nombre;
    selectB.appendChild(optB);
  });

  // Intentar seleccionar valores por defecto
  if (loadedTeams[teamAKey]) selectA.value = teamAKey;
  else {
    selectA.value = Object.keys(loadedTeams)[0];
    teamAKey = selectA.value;
  }

  if (loadedTeams[teamBKey]) selectB.value = teamBKey;
  else {
    selectB.value = Object.keys(loadedTeams)[1] || Object.keys(loadedTeams)[0];
    teamBKey = selectB.value;
  }

  // Cargar lanzadores del equipo por defecto
  populatePitcherSelectors(selectA.value, selectB.value);
}

/**
 * Rellena los selectores de lanzadores abridores según el equipo seleccionado
 */
function populatePitcherSelectors(teamAId, teamBId) {
  const selectPitcherA = document.getElementById("select-pitcher-a");
  const selectPitcherB = document.getElementById("select-pitcher-b");

  if (!selectPitcherA || !selectPitcherB) return;

  selectPitcherA.innerHTML = "";
  selectPitcherB.innerHTML = "";

  // Filtrar pitchers del Equipo Local
  const pitchersA = Object.values(leagueData.pitchers).filter(p => p.teamId && p.teamId.toString() === teamAId.toString());
  if (pitchersA.length === 0) {
    const opt = document.createElement("option");
    opt.value = "default";
    opt.textContent = (loadedTeams[teamAId] && loadedTeams[teamAId].abridor) ? loadedTeams[teamAId].abridor.nombre : "Por anunciar";
    selectPitcherA.appendChild(opt);
  } else {
    // Ordenar por entradas lanzadas para que los abridores principales salgan al inicio
    pitchersA.sort((x, y) => y.ip - x.ip);
    pitchersA.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = `${p.nombre} (ERA ${p.era.toFixed(2)})`;
      selectPitcherA.appendChild(opt);
    });
  }

  // Filtrar pitchers del Equipo Visitante
  const pitchersB = Object.values(leagueData.pitchers).filter(p => p.teamId && p.teamId.toString() === teamBId.toString());
  if (pitchersB.length === 0) {
    const opt = document.createElement("option");
    opt.value = "default";
    opt.textContent = (loadedTeams[teamBId] && loadedTeams[teamBId].abridor) ? loadedTeams[teamBId].abridor.nombre : "Por anunciar";
    selectPitcherB.appendChild(opt);
  } else {
    pitchersB.sort((x, y) => y.ip - x.ip);
    pitchersB.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = `${p.nombre} (ERA ${p.era.toFixed(2)})`;
      selectPitcherB.appendChild(opt);
    });
  }

  // Sincronizar selección con el abridor actualmente activo en loadedTeams
  if (loadedTeams[teamAId] && loadedTeams[teamAId].abridor) {
    const currentA = loadedTeams[teamAId].abridor.id;
    if (currentA && selectPitcherA.querySelector(`option[value="${currentA}"]`)) {
      selectPitcherA.value = currentA;
    } else {
      selectPitcherA.value = selectPitcherA.options[0].value;
    }
  }

  if (loadedTeams[teamBId] && loadedTeams[teamBId].abridor) {
    const currentB = loadedTeams[teamBId].abridor.id;
    if (currentB && selectPitcherB.querySelector(`option[value="${currentB}"]`)) {
      selectPitcherB.value = currentB;
    } else {
      selectPitcherB.value = selectPitcherB.options[0].value;
    }
  }
}

/**
 * Se ejecuta al seleccionar un lanzador diferente en los dropdowns
 */
function changeActivePitchers() {
  const valA = document.getElementById("select-pitcher-a").value;
  const valB = document.getElementById("select-pitcher-b").value;

  if (valA !== "default" && leagueData.pitchers[valA]) {
    loadedTeams[teamAKey].abridor = { ...leagueData.pitchers[valA] };
  }
  
  if (valB !== "default" && leagueData.pitchers[valB]) {
    loadedTeams[teamBKey].abridor = { ...leagueData.pitchers[valB] };
  }

  recalculateAnalysis();
}

/**
 * Callback de dropdowns
 */
function changeActiveTeams() {
  teamAKey = document.getElementById("select-team-a").value;
  teamBKey = document.getElementById("select-team-b").value;

  if (teamAKey === teamBKey) {
    alert("Por favor selecciona dos equipos diferentes.");
    return;
  }

  // Iniciar estado de carga para fatiga del bullpen
  activeBullpenFatigue = {
    homeScore: "...",
    awayScore: "...",
    homeStatus: "Calculando...",
    awayStatus: "Calculando...",
    homeYesterday: "Calculando...",
    awayYesterday: "Calculando..."
  };

  // Quitar el estilo activo de los juegos del carrusel ya que cambiamos manualmente
  document.querySelectorAll(".game-card").forEach(card => card.classList.remove("active"));

  // Sincronizar cargado del equipo limpio (sin abridor previo pegado a otra tarjeta)
  if (leagueData.teams[teamAKey]) {
    loadedTeams[teamAKey] = JSON.parse(JSON.stringify(leagueData.teams[teamAKey]));
  }
  if (leagueData.teams[teamBKey]) {
    loadedTeams[teamBKey] = JSON.parse(JSON.stringify(leagueData.teams[teamBKey]));
  }

  // Llenar selectores de lanzadores
  populatePitcherSelectors(teamAKey, teamBKey);

  // Forzar actualización del abridor activo
  changeActivePitchers();

  // Disparar el análisis en segundo plano
  analyzeBullpenFatigue(teamAKey, teamBKey);
}

/**
 * Cambia pestañas
 */
function switchTab(tabName) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

  if (tabName === 'import') {
    document.querySelector("button[onclick=\"switchTab('import')\"]").classList.add("active");
    document.getElementById("tab-import").classList.add("active");
  } else {
    document.querySelector("button[onclick=\"switchTab('manual')\"]").classList.add("active");
    document.getElementById("tab-manual").classList.add("active");
  }
}

/**
 * Obtiene los pesos ajustados de la UI
 */
function getWeights() {
  return {
    abridor: parseInt(document.getElementById("w-abridor").value) || 0,
    bateo: parseInt(document.getElementById("w-bateo").value) || 0,
    pitcheo: parseInt(document.getElementById("w-pitcheo").value) || 0,
    localia: parseInt(document.getElementById("w-localia").value) || 0
  };
}

/**
 * Actualiza porcentajes y calcula
 */
function updateWeights() {
  document.getElementById("val-w-abridor").textContent = document.getElementById("w-abridor").value + "%";
  document.getElementById("val-w-bateo").textContent = document.getElementById("w-bateo").value + "%";
  document.getElementById("val-w-pitcheo").textContent = document.getElementById("w-pitcheo").value + "%";
  document.getElementById("val-w-localia").textContent = document.getElementById("w-localia").value + "%";

  recalculateAnalysis();
}

/**
 * Ejecuta el predictor y actualiza la UI
 */
function recalculateAnalysis() {
  const teamA = loadedTeams[teamAKey];
  const teamB = loadedTeams[teamBKey];

  if (!teamA || !teamB) return;

  // Auto-calibrar antes de obtener los pesos
  autoCalibrateWeights(teamA, teamB);

  const weights = getWeights();
  const result = window.predictor.analyzeMatchup(teamA, teamB, weights);

  // Títulos
  document.getElementById("h-team-a").textContent = teamA.nombre;
  document.getElementById("h-team-b").textContent = teamB.nombre;

  // Renderizar tabla
  renderComparisonTable(teamA, teamB, result);

  // Probabilidad del Favorito en el indicador circular principal
  const isTeamAFavored = result.probA >= result.probB;
  const favoredProb = isTeamAFavored ? result.probA : result.probB;
  const favoredName = isTeamAFavored ? (teamA.short || teamA.nombre) : (teamB.short || teamB.nombre);

  document.getElementById("prob-percentage-a").textContent = favoredProb.toFixed(1) + "%";
  document.getElementById("prob-label-a").textContent = favoredName;

  const offset = 314.16 - (314.16 * favoredProb / 100);
  const gaugeFill = document.getElementById("gauge-fill-a");
  if (gaugeFill) {
    gaugeFill.style.strokeDashoffset = offset;
    // Cambiar color: Verde neón si es local (favorito), Azul neón si es visitante (favorito)
    gaugeFill.style.stroke = isTeamAFavored ? "var(--primary-neon)" : "var(--info-neon)";
  }

  document.getElementById("lbl-prob-bar-a").textContent = `${teamA.short || teamA.nombre}: ${result.probA}%`;
  document.getElementById("bar-fill-a").style.width = result.probA + "%";

  document.getElementById("lbl-prob-bar-b").textContent = `${teamB.short || teamB.nombre}: ${result.probB}%`;
  document.getElementById("bar-fill-b").style.width = result.probB + "%";

  // Slip
  document.getElementById("bet-pick-ml").textContent = result.moneyline.recomendacion;
  document.getElementById("bet-odds-ml").textContent = `Probabilidad: ${result.moneyline.probabilidad}%`;

  const confBadge = document.getElementById("bet-confidence");
  confBadge.textContent = `${result.moneyline.confianza} CONFIANZA`;
  confBadge.className = "conf-badge";
  if (result.moneyline.confianza === 'Alta') confBadge.classList.add("text-success");
  else if (result.moneyline.confianza === 'Baja') confBadge.classList.add("text-error");

  document.getElementById("bet-pick-rl").textContent = result.runLine.recomendacion;

  const ouLine = parseFloat(document.getElementById("ou-odds-line").value) || 9.5;
  let ouPick = "";
  if (result.carrerasTotales > ouLine) {
    ouPick = `ALTAS (Over) ${ouLine}`;
  } else if (result.carrerasTotales < ouLine) {
    ouPick = `BAJAS (Under) ${ouLine}`;
  } else {
    ouPick = `ALTAS/BAJAS ${ouLine}`;
  }
  document.getElementById("bet-pick-ou").textContent = ouPick;
  document.getElementById("bet-odds-ou").textContent = `Predicción: ${result.carrerasTotales} carreras`;

  document.getElementById("justification-text").innerHTML = result.justificacion;
}

/**
 * Calibra automáticamente las ponderaciones de la simulación
 */
function autoCalibrateWeights(teamA, teamB) {
  const isAuto = document.getElementById("auto-calibrate")?.checked;
  if (!isAuto) return;

  // 1. Establecer base según liga
  let abridor = activeLeague === "LMB" ? 35 : 45;
  let bateo = activeLeague === "LMB" ? 35 : 25;
  let pitcheo = 20;
  let localia = 10;

  // 2. Evaluar abridores
  const ipA = parseFloat(teamA.abridor.ip) || 0.0;
  const ipB = parseFloat(teamB.abridor.ip) || 0.0;
  const eraA = parseFloat(teamA.abridor.era) || 4.50;
  const eraB = parseFloat(teamB.abridor.era) || 4.50;
  const nameA = teamA.abridor.nombre || "";
  const nameB = teamB.abridor.nombre || "";

  // Detectar si son abridores estables / abridores reales
  const isStarterA = ipA >= 15.0 && nameA !== "Por anunciar";
  const isStarterB = ipB >= 15.0 && nameB !== "Por anunciar";

  // Detectar si son "Ases" (ERA excelente y más de 15 IP)
  const isAceA = isStarterA && eraA <= 3.00;
  const isAceB = isStarterB && eraB <= 3.00;

  // Detectar si es juego de bullpen (Opener / Sin datos de entradas)
  const isBullpenA = !isStarterA || ipA < 5.0 || nameA === "Por anunciar";
  const isBullpenB = !isStarterB || ipB < 5.0 || nameB === "Por anunciar";

  let statusMsg = "";

  if (isBullpenA && isBullpenB) {
    abridor = 10;
    pitcheo = 55;
    statusMsg = "Doble Juego de Bullpen: Relevo priorizado.";
  } else if (isBullpenA || isBullpenB) {
    abridor = activeLeague === "LMB" ? 15 : 20;
    pitcheo = activeLeague === "LMB" ? 40 : 45;
    statusMsg = `Bullpen Day para ${isBullpenA ? teamA.short || teamA.nombre : teamB.short || teamB.nombre}.`;
  } else if (isAceA && isAceB) {
    abridor = activeLeague === "LMB" ? 50 : 60;
    bateo = activeLeague === "LMB" ? 25 : 15;
    statusMsg = "Duelo de Ases en la loma.";
  } else if (isAceA || isAceB) {
    abridor = activeLeague === "LMB" ? 45 : 55;
    bateo = activeLeague === "LMB" ? 30 : 20;
    statusMsg = `As en la loma: ${isAceA ? nameA : nameB}.`;
  } else {
    statusMsg = `Ajuste Estándar (${activeLeague}).`;
  }

  // Actualizar sliders en el DOM
  document.getElementById("w-abridor").value = abridor;
  document.getElementById("w-bateo").value = bateo;
  document.getElementById("w-pitcheo").value = pitcheo;
  document.getElementById("w-localia").value = localia;

  // Actualizar textos de porcentaje
  document.getElementById("val-w-abridor").textContent = abridor + "%";
  document.getElementById("val-w-bateo").textContent = bateo + "%";
  document.getElementById("val-w-pitcheo").textContent = pitcheo + "%";
  document.getElementById("val-w-localia").textContent = localia + "%";

  const weightsDesc = document.getElementById("weights-desc");
  if (weightsDesc) {
    weightsDesc.textContent = `Auto-Calibración: ${statusMsg}`;
    weightsDesc.style.color = "var(--primary-neon)";
  }
}

/**
 * Se ejecuta al cambiar el checkbox de Auto-Calibración
 */
function toggleAutoCalibrate() {
  const isAuto = document.getElementById("auto-calibrate").checked;
  
  // Habilitar o deshabilitar sliders
  document.getElementById("w-abridor").disabled = isAuto;
  document.getElementById("w-bateo").disabled = isAuto;
  document.getElementById("w-pitcheo").disabled = isAuto;
  document.getElementById("w-localia").disabled = isAuto;

  const weightsDesc = document.getElementById("weights-desc");
  if (!isAuto) {
    if (weightsDesc) {
      weightsDesc.textContent = "Ajusta la importancia relativa de cada elemento en la predicción.";
      weightsDesc.style.color = "var(--text-secondary)";
    }
  }

  recalculateAnalysis();
}

/**
 * Renderiza la tabla comparativa con las estadísticas exactas requeridas por el usuario
 */
function renderComparisonTable(teamA, teamB, result) {
  const tbody = document.getElementById("comparison-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
 
  const sections = [
    {
      title: "Lanzador Abridor",
      metrics: [
        { label: "Nombre", path: "abridor.nombre", format: 'str', isBetter: 'none' },
        { label: "Récord (G-P)", path: "abridor.wl", format: 'str', isBetter: 'none' },
        { label: "ERA (Efectividad)", path: "abridor.era", format: 'num2', isBetter: 'low' },
        { label: "WHIP", path: "abridor.whip", format: 'num2', isBetter: 'low' },
        { label: "IP (Entradas)", path: "abridor.ip", format: 'num1', isBetter: 'high' },
        { label: "SO (Ponches)", path: "abridor.so", format: 'int', isBetter: 'high' },
        { label: "BB (Bases Bola)", path: "abridor.bb", format: 'int', isBetter: 'low' },
        { label: "HR (Jonrones)", path: "abridor.hr", format: 'int', isBetter: 'low' },
        { label: "FIP (Sabermetría)", path: "abridor.fip", format: 'num2', isBetter: 'low' }
      ]
    },
    {
      title: "Pitcheo Colectivo (Equipo)",
      metrics: [
        { label: "ERA Colectiva", path: "pitcheo.era", format: 'num2', isBetter: 'low' },
        { label: "WHIP Colectivo", path: "pitcheo.whip", format: 'num2', isBetter: 'low' },
        { label: "AVG Contra (BAA)", path: "pitcheo.avg", format: 'num3', isBetter: 'low' },
        { label: "SO (Ponches)", path: "pitcheo.so", format: 'int', isBetter: 'high' },
        { label: "BB (Bases Bola)", path: "pitcheo.bb", format: 'int', isBetter: 'low' },
        { label: "HR (Jonrones Permitidos)", path: "pitcheo.hr", format: 'int', isBetter: 'low' }
      ]
    },
    {
      title: "Bateo Colectivo (Equipo)",
      metrics: [
        { label: "AVG (Promedio)", path: "bateo.avg", format: 'num3', isBetter: 'high' },
        { label: "OBP (Embasado)", path: "bateo.obp", format: 'num3', isBetter: 'high' },
        { label: "SLG (Poder)", path: "bateo.slg", format: 'num3', isBetter: 'high' },
        { label: "OPS (Ofensiva Gral)", path: "bateo.ops", format: 'num3', isBetter: 'high' },
        { label: "R (Carreras Anotadas)", path: "bateo.r", format: 'int', isBetter: 'high' },
        { label: "HR (Jonrones Conectados)", path: "bateo.hr", format: 'int', isBetter: 'high' }
      ]
    },
    {
      title: "Desgaste del Bullpen (Últimos 3 días)",
      customRows: [
        { label: "Índice de Fatiga", valA: activeBullpenFatigue.homeScore, valB: activeBullpenFatigue.awayScore, isBetter: 'low' },
        { label: "Estado de Cansancio", valA: activeBullpenFatigue.homeStatus, valB: activeBullpenFatigue.awayStatus, isBetter: 'none' },
        { label: "Lanzaron Ayer", valA: activeBullpenFatigue.homeYesterday, valB: activeBullpenFatigue.awayYesterday, isBetter: 'none' }
      ]
    }
  ];
 
  sections.forEach(sec => {
    // Cabecera de sección
    const headRow = document.createElement("tr");
    headRow.className = "metric-row-header";
    headRow.innerHTML = `<td colspan="3">${sec.title}</td>`;
    tbody.appendChild(headRow);
 
    if (sec.metrics) {
      sec.metrics.forEach(met => {
        const valA = getNestedValue(teamA, met.path);
        const valB = getNestedValue(teamB, met.path);
 
        const formattedA = formatStatValue(valA, met.format);
        const formattedB = formatStatValue(valB, met.format);
 
        let classA = "val-col";
        let classB = "val-col";
 
        if (met.isBetter === 'high') {
          if (Number(valA) > Number(valB)) classA += " val-advantage";
          else if (Number(valB) > Number(valA)) classB += " val-advantage";
        } else if (met.isBetter === 'low') {
          if (Number(valA) < Number(valB)) classA += " val-advantage";
          else if (Number(valB) < Number(valA)) classB += " val-advantage";
        }
 
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="${classA}">${formattedA}</td>
          <td class="lbl-col">${met.label}</td>
          <td class="${classB}">${formattedB}</td>
        `;
        tbody.appendChild(tr);
      });
    } else if (sec.customRows) {
      sec.customRows.forEach(row => {
        const valA = row.valA;
        const valB = row.valB;
 
        let classA = "val-col";
        let classB = "val-col";
 
        if (row.isBetter === 'high') {
          if (Number(valA) > Number(valB)) classA += " val-advantage";
          else if (Number(valB) > Number(valA)) classB += " val-advantage";
        } else if (row.isBetter === 'low') {
          if (Number(valA) < Number(valB)) classA += " val-advantage";
          else if (Number(valB) < Number(valA)) classB += " val-advantage";
        }
 
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="${classA}">${valA}</td>
          <td class="lbl-col">${row.label}</td>
          <td class="${classB}">${valB}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function formatStatValue(val, format) {
  if (val === undefined || val === null || (isNaN(val) && typeof val !== 'string')) return '-';
  if (format === 'str') return val;
  if (format === 'int') return parseInt(val);
  if (format === 'num1') return Number(val).toFixed(1);
  if (format === 'num2') return Number(val).toFixed(2);
  if (format === 'num3') {
    let str = Number(val).toFixed(3);
    if (str.startsWith('0.')) return str.substring(1); // .295 en vez de 0.295
    return str;
  }
  return val;
}

/**
 * Carga manual de datos desde los inputs del formulario
 */
function loadManualData() {
  const manualAKey = "ManualA";
  const manualBKey = "ManualB";

  const mTeamA = {
    nombre: document.getElementById("m-name-a").value || "Manual Equipo A",
    short: "Manual A",
    bateo: {
      avg: parseFloat(document.getElementById("m-bat-avg-a").value) || 0.270,
      obp: parseFloat(document.getElementById("m-bat-obp-a").value) || 0.340,
      slg: parseFloat(document.getElementById("m-bat-slg-a").value) || 0.420,
      ops: parseFloat(document.getElementById("m-bat-ops-a").value) || 0.760,
      r: parseInt(document.getElementById("m-bat-r-a").value) || 380,
      hr: parseInt(document.getElementById("m-bat-hr-a").value) || 60,
      g: 75
    },
    pitcheo: {
      era: parseFloat(document.getElementById("m-pit-era-a").value) || 4.50,
      whip: parseFloat(document.getElementById("m-pit-whip-a").value) || 1.40,
      avg: parseFloat(document.getElementById("m-pit-avg-a").value) || 0.260,
      so: parseInt(document.getElementById("m-pit-so-a").value) || 500,
      bb: parseInt(document.getElementById("m-pit-bb-a").value) || 250,
      hr: parseInt(document.getElementById("m-pit-hr-a").value) || 70
    },
    abridor: {
      nombre: document.getElementById("m-abr-name-a").value || "Abridor A",
      era: parseFloat(document.getElementById("m-abr-era-a").value) || 4.00,
      whip: parseFloat(document.getElementById("m-abr-whip-a").value) || 1.30,
      fip: parseFloat(document.getElementById("m-abr-fip-a").value) || 4.00,
      ip: parseFloat(document.getElementById("m-abr-ip-a").value) || 60.0,
      so: parseInt(document.getElementById("m-abr-so-a").value) || 50,
      bb: parseInt(document.getElementById("m-abr-bb-a").value) || 20,
      hr: parseInt(document.getElementById("m-abr-hr-a").value) || 6,
      wl: "0-0"
    }
  };

  const mTeamB = {
    nombre: document.getElementById("m-name-b").value || "Manual Equipo B",
    short: "Manual B",
    bateo: {
      avg: parseFloat(document.getElementById("m-bat-avg-b").value) || 0.270,
      obp: parseFloat(document.getElementById("m-bat-obp-b").value) || 0.340,
      slg: parseFloat(document.getElementById("m-bat-slg-b").value) || 0.420,
      ops: parseFloat(document.getElementById("m-bat-ops-b").value) || 0.760,
      r: parseInt(document.getElementById("m-bat-r-b").value) || 380,
      hr: parseInt(document.getElementById("m-bat-hr-b").value) || 60,
      g: 75
    },
    pitcheo: {
      era: parseFloat(document.getElementById("m-pit-era-b").value) || 4.50,
      whip: parseFloat(document.getElementById("m-pit-whip-b").value) || 1.40,
      avg: parseFloat(document.getElementById("m-pit-avg-b").value) || 0.260,
      so: parseInt(document.getElementById("m-pit-so-b").value) || 500,
      bb: parseInt(document.getElementById("m-pit-bb-b").value) || 250,
      hr: parseInt(document.getElementById("m-pit-hr-b").value) || 70
    },
    abridor: {
      nombre: document.getElementById("m-abr-name-b").value || "Abridor B",
      era: parseFloat(document.getElementById("m-abr-era-b").value) || 4.00,
      whip: parseFloat(document.getElementById("m-abr-whip-b").value) || 1.30,
      fip: parseFloat(document.getElementById("m-abr-fip-b").value) || 4.00,
      ip: parseFloat(document.getElementById("m-abr-ip-b").value) || 60.0,
      so: parseInt(document.getElementById("m-abr-so-b").value) || 50,
      bb: parseInt(document.getElementById("m-abr-bb-b").value) || 20,
      hr: parseInt(document.getElementById("m-abr-hr-b").value) || 6,
      wl: "0-0"
    }
  };

  loadedTeams[manualAKey] = mTeamA;
  loadedTeams[manualBKey] = mTeamB;

  populateTeamSelectors();

  teamAKey = manualAKey;
  teamBKey = manualBKey;
  document.getElementById("select-team-a").value = teamAKey;
  document.getElementById("select-team-b").value = teamBKey;

  recalculateAnalysis();
  alert("Datos manuales cargados exitosamente.");
}

/**
 * Inteligencia Parser para interpretar tablas pegadas directamente (Conserva compatibilidad)
 */
function parsePastedData(type) {
  const textareaId = `paste-${type}`;
  const text = document.getElementById(textareaId).value;
  const statusEl = document.getElementById(`${type}-status`);
  
  if (!text.trim()) {
    statusEl.textContent = "Sin datos pegados";
    statusEl.className = "status-msg text-error";
    return;
  }

  const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length < 2) {
    statusEl.textContent = "Datos insuficientes";
    statusEl.className = "status-msg text-error";
    return;
  }

  let headerIndex = 0;
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const l = lines[i].toLowerCase();
    if (l.includes("team") || l.includes("equipo") || l.includes("avg") || l.includes("era") || l.includes("whip") || l.includes("jugador")) {
      headerIndex = i;
      break;
    }
  }

  const headerLine = lines[headerIndex];
  const headers = headerLine.split(/\t| {2,}/).map(h => h.trim().toUpperCase());

  const colIndex = {
    team: headers.findIndex(h => h.includes("EQUIPO") || h.includes("CLUB") || h.includes("TEAM") || h === "EQ" || h === "EQU"),
    player: headers.findIndex(h => h.includes("JUGADOR") || h.includes("PLAYER") || h.includes("NOMBRE") || h === "ABRIDOR" || h === "LANZADOR"),
    avg: headers.findIndex(h => h === "AVG" || h === "AVE" || h === "BA" || h.includes("PROMEDIO")),
    obp: headers.findIndex(h => h === "OBP"),
    slg: headers.findIndex(h => h === "SLG"),
    ops: headers.findIndex(h => h === "OPS"),
    r: headers.findIndex(h => h === "R" || h === "C" || h === "CA" || h === "CARRERAS"),
    hr: headers.findIndex(h => h === "HR" || h === "JON" || h === "JO" || h === "JONRONES"),
    era: headers.findIndex(h => h === "ERA" || h === "PCL" || h === "EFECTIVIDAD" || h === "EFE"),
    whip: headers.findIndex(h => h === "WHIP"),
    bb: headers.findIndex(h => h === "BB" || h === "BASE"),
    so: headers.findIndex(h => h === "SO" || h === "SO/K" || h === "K" || h === "PONCHES"),
    ip: headers.findIndex(h => h === "IP" || h === "EL" || h === "ENTRADAS" || h === "INN"),
    fip: headers.findIndex(h => h === "FIP")
  };

  let parsedCount = 0;

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const rowCells = lines[i].split(/\t| {2,}/).map(c => c.trim());
    if (rowCells.length < 3) continue;

    let teamName = "Desconocido";
    if (colIndex.team !== -1 && rowCells[colIndex.team]) {
      teamName = rowCells[colIndex.team].replace(/[0-9\.\*]/g, '').trim();
    } else if (colIndex.player !== -1 && rowCells[colIndex.player]) {
      teamName = rowCells[colIndex.player];
    } else {
      const firstNonNum = rowCells.find(cell => isNaN(cell.replace(/[\.,%]/g, '')));
      if (firstNonNum) teamName = firstNonNum.replace(/[0-9\.\*]/g, '').trim();
    }

    if (teamName === "Desconocido" || !teamName) continue;

    let targetKey = null;
    const cleanQuery = teamName.toLowerCase();
    
    for (let key of Object.keys(loadedTeams)) {
      const dbName = loadedTeams[key].nombre.toLowerCase();
      if (cleanQuery.includes(dbName) || dbName.includes(cleanQuery) || cleanQuery.includes(key.toLowerCase())) {
        targetKey = key;
        break;
      }
    }

    if (!targetKey) {
      targetKey = teamName;
      loadedTeams[targetKey] = {
        nombre: teamName,
        short: teamName.substring(0, 12),
        bateo: { avg: 0.270, obp: 0.340, slg: 0.420, ops: 0.760, r: 350, hr: 60, g: 75 },
        pitcheo: { era: 4.50, whip: 1.40, hr: 70, bb: 250, so: 500, avg: 0.270 },
        abridor: { nombre: "Abridor", era: 4.50, whip: 1.35, hr: 6, bb: 20, so: 50, ip: 50.0, fip: 4.50, wl: "0-0" }
      };
    }

    const team = loadedTeams[targetKey];

    if (type === 'batting') {
      if (colIndex.avg !== -1 && rowCells[colIndex.avg]) team.bateo.avg = parseStatVal(rowCells[colIndex.avg]);
      if (colIndex.obp !== -1 && rowCells[colIndex.obp]) team.bateo.obp = parseStatVal(rowCells[colIndex.obp]);
      if (colIndex.slg !== -1 && rowCells[colIndex.slg]) team.bateo.slg = parseStatVal(rowCells[colIndex.slg]);
      if (colIndex.ops !== -1 && rowCells[colIndex.ops]) team.bateo.ops = parseStatVal(rowCells[colIndex.ops]);
      if (colIndex.r !== -1 && rowCells[colIndex.r]) team.bateo.r = parseStatVal(rowCells[colIndex.r]);
      if (colIndex.hr !== -1 && rowCells[colIndex.hr]) team.bateo.hr = parseStatVal(rowCells[colIndex.hr]);
      parsedCount++;
    } 
    else if (type === 'pitching') {
      if (colIndex.era !== -1 && rowCells[colIndex.era]) team.pitcheo.era = parseStatVal(rowCells[colIndex.era]);
      if (colIndex.whip !== -1 && rowCells[colIndex.whip]) team.pitcheo.whip = parseStatVal(rowCells[colIndex.whip]);
      if (colIndex.avg !== -1 && rowCells[colIndex.avg]) team.pitcheo.avg = parseStatVal(rowCells[colIndex.avg]); // BAA
      if (colIndex.bb !== -1 && rowCells[colIndex.bb]) team.pitcheo.bb = parseStatVal(rowCells[colIndex.bb]);
      if (colIndex.so !== -1 && rowCells[colIndex.so]) team.pitcheo.so = parseStatVal(rowCells[colIndex.so]);
      if (colIndex.hr !== -1 && rowCells[colIndex.hr]) team.pitcheo.hr = parseStatVal(rowCells[colIndex.hr]);
      parsedCount++;
    } 
    else if (type === 'starters') {
      team.abridor.nombre = teamName;
      if (colIndex.era !== -1 && rowCells[colIndex.era]) team.abridor.era = parseStatVal(rowCells[colIndex.era]);
      if (colIndex.whip !== -1 && rowCells[colIndex.whip]) team.abridor.whip = parseStatVal(rowCells[colIndex.whip]);
      if (colIndex.ip !== -1 && rowCells[colIndex.ip]) team.abridor.ip = parseStatVal(rowCells[colIndex.ip]);
      if (colIndex.so !== -1 && rowCells[colIndex.so]) team.abridor.so = parseStatVal(rowCells[colIndex.so]);
      if (colIndex.bb !== -1 && rowCells[colIndex.bb]) team.abridor.bb = parseStatVal(rowCells[colIndex.bb]);
      if (colIndex.hr !== -1 && rowCells[colIndex.hr]) team.abridor.hr = parseStatVal(rowCells[colIndex.hr]);
      if (colIndex.fip !== -1 && rowCells[colIndex.fip]) team.abridor.fip = parseStatVal(rowCells[colIndex.fip]);
      else team.abridor.fip = window.predictor.calculateFIP(team.abridor.hr, team.abridor.bb, team.abridor.so, team.abridor.ip);
      parsedCount++;
    }
  }

  if (parsedCount > 0) {
    statusEl.textContent = `¡Procesados ${parsedCount} registros!`;
    statusEl.className = "status-msg text-success";
    populateTeamSelectors();
    recalculateAnalysis();
  } else {
    statusEl.textContent = "No se pudieron mapear los datos pegados.";
    statusEl.className = "status-msg text-error";
  }
}

function parseStatVal(str) {
  let clean = str.replace(',', '');
  if (clean.startsWith('.')) clean = '0' + clean;
  return parseFloat(clean) || 0;
}

/**
 * Realiza el cálculo del desgaste del bullpen consultando en segundo plano los boxscores de los últimos 3 días.
 */
async function analyzeBullpenFatigue(homeId, awayId) {
  const currentKey = `${homeId}_${awayId}`;
  const config = LEAGUE_CONFIGS[activeLeague];
  
  const dates = [];
  for (let i = 1; i <= 4; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    dates.push([year, month.padStart(2, '0'), day.padStart(2, '0')].join('-'));
  }

  try {
    const [schedHome, schedAway] = await Promise.all([
      fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=${config.sportId}&teamId=${homeId}&startDate=${dates[dates.length - 1]}&endDate=${dates[0]}&status=Final`).then(r => r.ok ? r.json() : null),
      fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=${config.sportId}&teamId=${awayId}&startDate=${dates[dates.length - 1]}&endDate=${dates[0]}&status=Final`).then(r => r.ok ? r.json() : null)
    ]);

    const gamePks = [];
    const seenPks = new Set();

    [schedHome, schedAway].forEach(sched => {
      if (sched && sched.dates) {
        sched.dates.forEach(d => {
          if (d.games) {
            d.games.forEach(g => {
              if (!seenPks.has(g.gamePk)) {
                seenPks.add(g.gamePk);
                gamePks.push({ gamePk: g.gamePk, date: g.officialDate });
              }
            });
          }
        });
      }
    });

    const boxscorePromises = gamePks.map(async (item) => {
      if (boxscoreCache[item.gamePk]) {
        return { boxscore: boxscoreCache[item.gamePk], date: item.date };
      }
      try {
        const res = await fetch(`https://statsapi.mlb.com/api/v1/game/${item.gamePk}/boxscore`);
        if (!res.ok) return null;
        const data = await res.json();
        boxscoreCache[item.gamePk] = data;
        return { boxscore: data, date: item.date };
      } catch (e) {
        console.warn(`Error cargando boxscore ${item.gamePk}:`, e);
        return null;
      }
    });

    const results = (await Promise.all(boxscorePromises)).filter(r => r !== null);

    if (`${teamAKey}_${teamBKey}` !== currentKey) return;

    const relieversYesterdayHome = [];
    const relieversYesterdayAway = [];
    
    const pitcherDatesHome = {};
    const pitcherDatesAway = {};

    let scoreHome = 0;
    let scoreAway = 0;
    let extraInningsHome = 0;
    let extraInningsAway = 0;

    results.forEach(({ boxscore, date }) => {
      const teams = boxscore.teams || {};
      
      if (teams.home && teams.home.team && teams.home.team.id.toString() === homeId.toString()) {
        const gameIP = getGameInningsPitched(teams.home);
        extraInningsHome += Math.max(0, Math.ceil(gameIP - 9.0));
        processTeamPitchers(teams.home, date, relieversYesterdayHome, pitcherDatesHome);
      }
      if (teams.away && teams.away.team && teams.away.team.id.toString() === homeId.toString()) {
        const gameIP = getGameInningsPitched(teams.away);
        extraInningsHome += Math.max(0, Math.ceil(gameIP - 9.0));
        processTeamPitchers(teams.away, date, relieversYesterdayHome, pitcherDatesHome);
      }

      if (teams.home && teams.home.team && teams.home.team.id.toString() === awayId.toString()) {
        const gameIP = getGameInningsPitched(teams.home);
        extraInningsAway += Math.max(0, Math.ceil(gameIP - 9.0));
        processTeamPitchers(teams.home, date, relieversYesterdayAway, pitcherDatesAway);
      }
      if (teams.away && teams.away.team && teams.away.team.id.toString() === awayId.toString()) {
        const gameIP = getGameInningsPitched(teams.away);
        extraInningsAway += Math.max(0, Math.ceil(gameIP - 9.0));
        processTeamPitchers(teams.away, date, relieversYesterdayAway, pitcherDatesAway);
      }
    });

    scoreHome = calculateFatiguePoints(pitcherDatesHome, dates) + (extraInningsHome * 1.5);
    scoreAway = calculateFatiguePoints(pitcherDatesAway, dates) + (extraInningsAway * 1.5);

    const getStatus = (score, extraInnings) => {
      let statusStr = "";
      if (score >= 8) statusStr = "<span style='color: var(--error-neon); font-weight:700;'>Cansado</span>";
      else if (score >= 4) statusStr = "<span style='color: var(--warning-neon); font-weight:700;'>Moderado</span>";
      else statusStr = "<span style='color: var(--primary-neon); font-weight:700;'>Fresco</span>";
      
      if (extraInnings > 0) {
        statusStr += ` (${extraInnings} inn extra)`;
      }
      return statusStr;
    };

    activeBullpenFatigue = {
      homeScore: scoreHome,
      awayScore: scoreAway,
      homeStatus: getStatus(scoreHome, extraInningsHome),
      awayStatus: getStatus(scoreAway, extraInningsAway),
      homeYesterday: relieversYesterdayHome.length > 0 ? relieversYesterdayHome.join(", ") : "Ninguno",
      awayYesterday: relieversYesterdayAway.length > 0 ? relieversYesterdayAway.join(", ") : "Ninguno"
    };

    recalculateAnalysis();

  } catch (err) {
    console.error("Error al calcular el desgaste del bullpen:", err);
    activeBullpenFatigue = {
      homeScore: 0,
      awayScore: 0,
      homeStatus: "Error",
      awayStatus: "Error",
      homeYesterday: "-",
      awayYesterday: "-"
    };
    recalculateAnalysis();
  }
}

function processTeamPitchers(teamData, date, yesterdayList, pitcherDates) {
  if (!teamData.players) return;
  
  const pitchers = teamData.pitchers || [];
  pitchers.forEach(id => {
    const playerKey = `ID${id}`;
    const p = teamData.players[playerKey];
    if (p && p.stats && p.stats.pitching) {
      const stats = p.stats.pitching;
      
      if (stats.gamesStarted === 0 && (parseFloat(stats.inningsPitched) || 0) > 0) {
        const name = p.person.fullName;
        const pitches = parseInt(stats.pitchesThrown) || 0;
        const outs = parseInt(stats.outs) || 0;
        
        if (!pitcherDates[name]) {
          pitcherDates[name] = [];
        }
        pitcherDates[name].push({ date, pitches, outs });

        // Si lanzó ayer
        const d = new Date();
        d.setDate(d.getDate() - 1);
        const yestStr = [d.getFullYear(), ('' + (d.getMonth() + 1)).padStart(2, '0'), ('' + d.getDate()).padStart(2, '0')].join('-');
        
        if (date === yestStr && !yesterdayList.includes(name)) {
          yesterdayList.push(`${name} (${pitches} pit)`);
        }
      }
    }
  });
}

function calculateFatiguePoints(pitcherDates, dates) {
  let totalFatigue = 0;
  
  Object.keys(pitcherDates).forEach(name => {
    const appearances = pitcherDates[name];
    let pFatigue = 0;
    let pitchedYesterday = false;
    let pitchedTwoDaysAgo = false;

    appearances.forEach(app => {
      const pitches = app.pitches;

      if (app.date === dates[0]) {
        pitchedYesterday = true;
        pFatigue += pitches > 15 ? 3 : 2;
      } else if (app.date === dates[1]) {
        pitchedTwoDaysAgo = true;
        pFatigue += pitches > 20 ? 2 : 1;
      } else if (app.date === dates[2]) {
        pFatigue += pitches > 30 ? 1 : 0;
      }
    });

    if (pitchedYesterday && pitchedTwoDaysAgo) {
      pFatigue += 3;
    }

    totalFatigue += pFatigue;
  });

  return totalFatigue;
}

/**
 * Reloj de auto-actualización cada 2 minutos
 */
let autoRefreshTimer = null;
let secondsLeft = 120;

function startAutoRefreshTimer() {
  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  secondsLeft = 120;
  
  const timerLabel = document.getElementById("auto-update-countdown");
  if (timerLabel) timerLabel.textContent = "2:00";

  autoRefreshTimer = setInterval(async () => {
    secondsLeft--;
    
    const label = document.getElementById("auto-update-countdown");
    if (label) {
      const mins = Math.floor(secondsLeft / 60);
      const secs = secondsLeft % 60;
      label.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    if (secondsLeft <= 0) {
      secondsLeft = 120;
      console.log("Auto-actualización silenciosa en progreso...");
      
      const success = await initLeagueData(activeLeague, true);
      if (success) {
        const activeCard = document.querySelector(".game-card.active");
        let selectedIdx = 0;
        if (activeCard) {
          const cards = Array.from(document.querySelectorAll(".game-card"));
          selectedIdx = cards.indexOf(activeCard);
        }

        loadedTeams = { ...leagueData.teams };
        
        const dateInput = document.getElementById("game-date-input");
        const dateStr = dateInput ? dateInput.value : getTodayDateString();
        await loadDailyGames(dateStr);

        if (leagueData.games.length > 0) {
          selectGame(selectedIdx >= 0 ? selectedIdx : 0);
        }
      }
    }
  }, 1000);
}

/**
 * Suma todas las entradas lanzadas por los pitchers en un juego de la API
 */
function getGameInningsPitched(teamData) {
  if (!teamData.players || !teamData.pitchers) return 0.0;
  let totalIP = 0.0;
  teamData.pitchers.forEach(id => {
    const playerKey = `ID${id}`;
    const p = teamData.players[playerKey];
    if (p && p.stats && p.stats.pitching) {
      const ipStr = p.stats.pitching.inningsPitched || "0.0";
      let realIP = parseFloat(ipStr) || 0.0;
      const ipStrStr = ipStr.toString();
      if (ipStrStr.includes('.')) {
        const parts = ipStrStr.split('.');
        const innings = parseInt(parts[0]) || 0;
        const outs = parseInt(parts[1]) || 0;
        if (outs === 1) realIP = innings + 0.3333;
        else if (outs === 2) realIP = innings + 0.6667;
      }
      totalIP += realIP;
    }
  });
  return totalIP;
}

/**
 * Alterna entre el Tema Oscuro (por defecto) y el Tema Claro de alto contraste
 */
function toggleTheme() {
  const isLight = document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  
  const themeLbl = document.getElementById("theme-btn-lbl");
  const sunIcon = document.querySelector("#theme-toggle-btn .sun-icon");
  const moonIcon = document.querySelector("#theme-toggle-btn .moon-icon");

  if (isLight) {
    if (themeLbl) themeLbl.textContent = "Modo Oscuro";
    if (sunIcon) sunIcon.style.display = "inline-block";
    if (moonIcon) moonIcon.style.display = "none";
  } else {
    if (themeLbl) themeLbl.textContent = "Modo Claro";
    if (sunIcon) sunIcon.style.display = "none";
    if (moonIcon) moonIcon.style.display = "inline-block";
  }
}
