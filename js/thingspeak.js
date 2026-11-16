let thingSpeakTimer = null;
let activeThingSpeakProject = null;
let thingSpeakRequestId = 0;

async function loadThingSpeakData(project) {
  const requestId = ++thingSpeakRequestId;
  const status = document.getElementById("dataStatus");
  const metrics = document.getElementById("metrics");

  if (!project || !project.thingspeak) {
    if (status) {
      status.textContent =
        "Este projeto ainda não possui um canal ThingSpeak configurado.";
    }

    resetCharts();

    if (metrics) {
      metrics.innerHTML = "";
    }

    updateChartTitles([], []);
    activeThingSpeakProject = null;
    return;
  }

  activeThingSpeakProject = project;

  const config = project.thingspeak;
  const fields = config.fields || [];
  // Cria as caixas de acordo com os campos do projeto selecionado.
  if (metrics) {
    metrics.innerHTML = fields
      .map(
        (field) => `
        <div class="metric-card">
            <span>${escapeHTML(field.name)}</span>
            <strong>--</strong>
        </div>
    `,
      )
      .join("");
  }

  // Atualiza os títulos imediatamente, antes de receber os dados.
  const chartSeries = fields.map((field, index) => ({
    label: field.name,
    unit: field.unit || "",
    values: [],
    color: ["#0866e8", "#3b91f5", "#20a477", "#e5a52b", "#9b65d6"][index % 5],
  }));

  const firstSeries = chartSeries.slice(0, 1);
  const otherSeries = chartSeries.slice(1);

  updateChartTitles(firstSeries, otherSeries);

  const baseUrl = `https://api.thingspeak.com/channels/${encodeURIComponent(config.channelId)}/feeds.json`;

  const params = new URLSearchParams({
    results: String(config.results || 20),
  });

  if (config.readApiKey) {
    params.set("api_key", config.readApiKey);
  }

  try {
    if (status) {
      status.textContent = "Buscando dados no ThingSpeak...";
    }

    const response = await fetch(`${baseUrl}?${params.toString()}`);

    // Impede que uma consulta antiga sobrescreva o projeto atual.
    if (requestId !== thingSpeakRequestId) return;

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const data = await response.json();

    if (requestId !== thingSpeakRequestId) return;

    const feeds = Array.isArray(data.feeds) ? data.feeds : [];

    if (feeds.length === 0) {
      throw new Error("O canal não possui registros disponíveis.");
    }

    const latest = feeds[feeds.length - 1];

    // Atualiza os indicadores com os valores mais recentes.
    if (metrics) {
      metrics.innerHTML = fields
        .map((field) => {
          const value = latest[`field${field.number}`];

          return `
            <div class="metric-card">
                <span>${escapeHTML(field.name)}</span>
                <strong>
                    ${
                      value === null || value === undefined || value === ""
                        ? "--"
                        : escapeHTML(value) +
                          (field.unit ? ` ${escapeHTML(field.unit)}` : "")
                    }
                </strong>
            </div>`;
        })
        .join("");

      metrics.style.gridTemplateColumns = `repeat(${Math.max(fields.length, 1)}, minmax(0, 1fr))`;
    }

    // Prepara os dados de cada campo do projeto selecionado.
    const updatedSeries = fields.map((field, index) => ({
      label: field.name,
      unit: field.unit || "",
      values: feeds.map((feed) => toNumber(feed[`field${field.number}`])),
      color: ["#0866e8", "#3b91f5", "#20a477", "#e5a52b", "#9b65d6"][index % 5],
    }));

    const updatedFirstSeries = updatedSeries.slice(0, 1);
    const updatedOtherSeries = updatedSeries.slice(1);

    updateChartTitles(updatedFirstSeries, updatedOtherSeries);

    drawThingSpeakChart(
      "peopleChart",
      updatedFirstSeries,
      updatedFirstSeries.map((item) => item.label).join(" e ") ||
        "Indicador principal",
    );

    drawThingSpeakChart(
      "movementChart",
      updatedOtherSeries,
      updatedOtherSeries.map((item) => item.label).join(" e ") ||
        "Outros indicadores",
    );

    const updatedAt = latest.created_at
      ? new Date(latest.created_at).toLocaleString("pt-BR")
      : "horário indisponível";

    if (status) {
      status.textContent = `Dados atualizados. Último registro: ${updatedAt}.`;
    }
  } catch (error) {
    // Ignora erros de consultas que já foram substituídas.
    if (requestId !== thingSpeakRequestId) return;

    console.error("ThingSpeak:", error);

    if (status) {
      status.textContent = `Não foi possível carregar os dados: ${error.message}`;
    }

    resetCharts();
  }
}

// Atualiza os títulos dos cartões de gráfico.
function updateChartTitles(firstSeries, otherSeries) {
  const charts = [
    {
      canvasId: "peopleChart",
      series: firstSeries,
      fallback: "Indicador principal",
    },
    {
      canvasId: "movementChart",
      series: otherSeries,
      fallback: "Outros indicadores",
    },
  ];

  charts.forEach((chart) => {
    const canvas = document.getElementById(chart.canvasId);
    if (!canvas) return;

    const card = canvas.closest(".chart-card");
    const heading = card ? card.querySelector("h3") : null;

    if (heading) {
      heading.textContent = chart.series.length
        ? chart.series.map((item) => item.label).join(" e ")
        : chart.fallback;
    }
  });
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function escapeHTML(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character],
  );
}

function drawThingSpeakChart(canvasId, series, title) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const cssWidth = Math.max(280, canvas.clientWidth || 600);
  const cssHeight = 240;
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = Math.round(cssWidth * pixelRatio);
  canvas.height = Math.round(cssHeight * pixelRatio);
  canvas.style.height = `${cssHeight}px`;

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const width = cssWidth;
  const height = cssHeight;

  const padding = {
    top: 30,
    right: 18,
    bottom: 30,
    left: 48,
  };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  context.clearRect(0, 0, width, height);

  const muted =
    getComputedStyle(document.body).getPropertyValue("--muted").trim() ||
    "#52617d";

  const border =
    getComputedStyle(document.body).getPropertyValue("--border").trim() ||
    "#dce7f7";

  context.fillStyle = muted;
  context.font = "bold 12px Arial";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText(title, padding.left, 5);

  const allValues = series
    .flatMap((item) => item.values)
    .filter((value) => value !== null);

  if (!allValues.length) {
    context.fillStyle = muted;
    context.font = "13px Arial";
    context.fillText(
      "Sem dados numéricos para exibir.",
      padding.left,
      height / 2,
    );
    return;
  }

  let minimum = Math.min(...allValues);
  let maximum = Math.max(...allValues);

  if (minimum === maximum) {
    minimum -= 1;
    maximum += 1;
  }

  const range = maximum - minimum;
  const chartMax = maximum + range * 0.12;
  const chartMin = minimum - range * 0.05;
  const chartRange = chartMax - chartMin || 1;

  context.font = "10px Arial";
  context.textAlign = "right";
  context.textBaseline = "middle";
  context.strokeStyle = border;
  context.fillStyle = muted;

  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (plotHeight / 4) * i;
    const value = chartMax - (chartRange / 4) * i;

    context.beginPath();
    context.moveTo(padding.left, y);
    context.lineTo(width - padding.right, y);
    context.stroke();

    context.fillText(Number(value.toFixed(1)).toString(), padding.left - 8, y);
  }

  series.forEach((item) => {
    const valid = item.values
      .map((value, index) => ({ value, index }))
      .filter((point) => point.value !== null);

    if (!valid.length) return;

    context.beginPath();
    context.strokeStyle = item.color;
    context.lineWidth = 2.5;
    context.lineJoin = "round";
    context.lineCap = "round";

    valid.forEach((point, index) => {
      const x =
        padding.left +
        (item.values.length <= 1
          ? plotWidth / 2
          : (point.index / (item.values.length - 1)) * plotWidth);

      const y =
        padding.top + ((chartMax - point.value) / chartRange) * plotHeight;

      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });

    context.stroke();

    valid.forEach((point) => {
      const x =
        padding.left +
        (item.values.length <= 1
          ? plotWidth / 2
          : (point.index / (item.values.length - 1)) * plotWidth);

      const y =
        padding.top + ((chartMax - point.value) / chartRange) * plotHeight;

      context.beginPath();
      context.fillStyle = item.color;
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fill();
    });
  });

  // Legenda dos campos.
  let legendX = padding.left;
  const legendY = height - 12;

  context.font = "10px Arial";
  context.textAlign = "left";
  context.textBaseline = "middle";

  series.forEach((item) => {
    context.fillStyle = item.color;
    context.fillRect(legendX, legendY - 3, 7, 7);

    context.fillStyle = muted;

    const label = item.unit ? `${item.label} (${item.unit})` : item.label;

    context.fillText(label, legendX + 11, legendY);

    legendX += context.measureText(label).width + 28;
  });
}

function resetCharts() {
  ["peopleChart", "movementChart"].forEach((id) => {
    const canvas = document.getElementById(id);

    if (!canvas) return;

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  });
}

function startThingSpeakMonitoring(project) {
  stopThingSpeakMonitoring();

  if (!project || !project.thingspeak) {
    loadThingSpeakData(project);
    return;
  }

  activeThingSpeakProject = project;

  loadThingSpeakData(project);

  const interval = project.thingspeak.refreshInterval || 20000;

  thingSpeakTimer = setInterval(() => {
    if (activeThingSpeakProject) {
      loadThingSpeakData(activeThingSpeakProject);
    }
  }, interval);
}

function stopThingSpeakMonitoring() {
  if (thingSpeakTimer) {
    clearInterval(thingSpeakTimer);
    thingSpeakTimer = null;
  }

  // Invalida qualquer consulta que ainda esteja em andamento.
  thingSpeakRequestId++;

  activeThingSpeakProject = null;
}
