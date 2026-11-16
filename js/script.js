// Navegação, listagem, detalhes e tema do IoT Connect.

document.addEventListener("DOMContentLoaded", () => {
    const pages = {
        home: document.getElementById("homePage"),
        projects: document.getElementById("projectsPage"),
        detail: document.getElementById("detailPage"),
        about: document.getElementById("aboutPage")
    };

    const navLinks = document.querySelectorAll("[data-page]");
    const projectsGrid = document.getElementById("projectsGrid");
    const searchInput = document.getElementById("projectSearch");
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    let currentProject = null;

    function showPage(pageName) {
        Object.values(pages).forEach(page => page.classList.remove("active"));
        if (pages[pageName]) pages[pageName].classList.add("active");

        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.toggle("active", link.dataset.page === pageName);
        });

        if (pageName !== "detail") stopThingSpeakMonitoring();
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function createList(items) {
        if (!items || !items.length) return "<li>Informação não cadastrada.</li>";
        return items.map(item => `<li>${escapeHTML(item)}</li>`).join("");
    }

    function createTags(items) {
        if (!items || !items.length) return '<span class="tag">Não informado</span>';
        return items.map(item => `<span class="tag">${escapeHTML(item)}</span>`).join("");
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
        })[character]);
    }

    function renderProjects(filter = "") {
        const normalizedFilter = filter.trim().toLocaleLowerCase("pt-BR");
        const filtered = projects.filter(project =>
            `${project.group} ${project.title} ${project.description}`
                .toLocaleLowerCase("pt-BR").includes(normalizedFilter)
        );

        document.getElementById("projectCount").textContent =
            `${filtered.length} de ${projects.length} projetos`;

        if (!filtered.length) {
            projectsGrid.innerHTML = '<div class="empty-state">Nenhum projeto encontrado.</div>';
            return;
        }

        projectsGrid.innerHTML = filtered.map(project => `
            <article class="project-card">
                <div class="project-card-top">
                    <span class="group-label">${escapeHTML(project.group)}</span>
                    <span class="status-pill">${escapeHTML(project.status)}</span>
                </div>
                <h3>${escapeHTML(project.title)}</h3>
                <p class="project-objective">${escapeHTML(project.description || "Descrição ainda não cadastrada.")}</p>
                <button class="btn btn-secondary btn-small" data-open-project="${project.id}">
                    Ver projeto →
                </button>
            </article>
        `).join("");
    }

    function setDetailText(id, value, fallback = "Informação ainda não cadastrada.") {
        const element = document.getElementById(id);
        element.textContent = value || fallback;
    }

    function openProject(projectId) {
        const project = projects.find(item => item.id === Number(projectId));
        if (!project) return;

        currentProject = project;
        setDetailText("detailGroup", project.group.toUpperCase());
        setDetailText("detailTitle", project.title);
        setDetailText("detailDescription", project.description);
        setDetailText("detailObjective", project.objective);
        setDetailText("detailOperation", project.operation);
        setDetailText("detailStatus", project.status, "Status não informado");

        document.getElementById("detailStudents").innerHTML = createList(project.students);
        document.getElementById("detailTeachers").innerHTML = createList(project.teachers);
        document.getElementById("detailSensors").innerHTML = createList([
            ...(project.sensors || []),
            ...(project.components || [])
        ]);
        document.getElementById("detailTechnologies").innerHTML = createTags(project.technologies);

        const links = project.links || {};
        const linkNames = {
            simulation: "Abrir simulação Wokwi",
            dashboard: "Abrir canal ThingSpeak",
            video: "Assistir vídeo"
        };
        document.getElementById("detailLinks").innerHTML = Object.entries(links)
            .filter(([, url]) => url)
            .map(([key, url]) => `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${linkNames[key] || "Acessar link"} ↗</a>`)
            .join("") || '<span class="muted">Links ainda não cadastrados.</span>';

        const metadata = project.metadata || {};
        const metaItems = [
            ["Capacidade", metadata.capacity],
            ["Intervalo de envio", metadata.interval],
            ["Canal ThingSpeak", project.thingspeak ? project.thingspeak.channelId : ""]
        ].filter(([, value]) => value);

        document.getElementById("detailMeta").innerHTML = metaItems.length
            ? metaItems.map(([label, value]) => `<div class="meta-item"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></div>`).join("")
            : '<span class="muted">Informações adicionais não cadastradas.</span>';

        showPage("detail");
        startThingSpeakMonitoring(project);
    }

    projectsGrid.addEventListener("click", event => {
        const button = event.target.closest("[data-open-project]");
        if (button) openProject(button.dataset.openProject);
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => showPage(link.dataset.page));
    });

    searchInput.addEventListener("input", event => renderProjects(event.target.value));

    document.getElementById("backToProjects").addEventListener("click", () => showPage("projects"));

    document.getElementById("refreshData").addEventListener("click", () => {
        if (currentProject) loadThingSpeakData(currentProject);
    });

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");
        themeToggle.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
        if (currentProject && pages.detail.classList.contains("active")) {
            loadThingSpeakData(currentProject);
        }
    });

    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    renderProjects();
});
