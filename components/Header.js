// Componente de cabeçalho customizado
class Header extends HTMLElement {
  constructor() {
    super();
    this.menuOpen = false;
  }

  connectedCallback() {
    this.innerHTML = `
<style>
  /* Estilos base mobile-first */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    position: relative;
  }

  .logo {
    display: flex;
    z-index: 1001;
  }

  .logo img {
    width: 70px;
    height: auto;
  }

  /* Botão hamburger - apenas mobile */
  .menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 28px;
    height: 28px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
    transition: transform 0.3s ease;
  }

  .menu-toggle:hover {
    transform: scale(1.1);
  }

  .menu-toggle span {
    width: 28px;
    height: 3px;
    background: #fff;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  /* Animação do X quando menu aberto */
  .menu-toggle.active span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .menu-toggle.active span:nth-child(2) {
    opacity: 0;
    transform: translateX(-20px);
  }

  .menu-toggle.active span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  /* Navegação mobile - oculta por defeito */
  .navbar {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    max-width: 300px;
    height: 100vh;
    background: rgba(20, 20, 30, 0.98);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    display: flex;
    flex-direction: column;
    padding: 80px 20px 20px;
    gap: 8px;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
  }

  .navbar.active {
    right: 0;
  }

  /* Overlay escuro quando menu aberto */
  .menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s ease;
    z-index: 999;
  }

  .menu-overlay.active {
    opacity: 1;
    visibility: visible;
  }

  .nav-btn {
    color: #fff;
    text-decoration: none;
    padding: 14px 20px;
    border-radius: 12px;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
  }

  .nav-btn:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }

  .nav-btn:active {
    transform: translateX(3px);
    background: rgba(255, 255, 255, 0.1);
  }

  /* Tablet - 768px+ */
  @media (min-width: 768px) {
    .logo img {
      width: 85px;
    }

    .menu-toggle {
      width: 32px;
      height: 32px;
    }

    .menu-toggle span {
      width: 32px;
    }

    .navbar {
      width: 60%;
      max-width: 350px;
      padding: 100px 30px 30px;
      gap: 12px;
    }

    .nav-btn {
      padding: 16px 24px;
      font-size: 17px;
    }
  }

  /* Desktop - 1024px+ */
  @media (min-width: 1024px) {
    .logo img {
      width: 100px;
    }

    /* Ocultar menu hamburger */
    .menu-toggle {
      display: none;
    }

    /* Navegação horizontal centrada */
    .navbar {
      position: absolute;
      left: 50%;
      right: auto;
      top: -10px;
      transform: translateX(-50%);
      width: auto;
      max-width: none;
      height: auto;
      flex-direction: row;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.12),
        0 1px 2px rgba(0, 0, 0, 0.24),
        inset 0 0.5px 0 rgba(255, 255, 255, 0.6);
      border: 0.5px solid rgba(255, 255, 255, 0.3);
      border-radius: 32px;
      gap: 0;
      transition: none;
    }

    .menu-overlay {
      display: none;
    }

    .nav-btn {
      padding: 8px 16px;
      border-radius: 18px;
      font-size: 15px;
      text-align: center;
      transform: none;
    }

    .nav-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
      box-shadow:
        0 2px 8px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .nav-btn:active {
      transform: translateY(0px);
      background: rgba(255, 255, 255, 0.15);
    }
  }

  /* Large desktop - 1440px+ */
  @media (min-width: 1440px) {
    .nav-btn {
      padding: 10px 20px;
      font-size: 16px;
    }
  }
</style>
<header>
  <div class="logo">
    <a href="./index.html">
      <img
        src="./assets/images/redbull.svg"
        alt="Red Bull Racing Logo"
        width="100"
        height="55"
      />
    </a>
  </div>

  <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div class="menu-overlay"></div>

  <nav class="navbar">
    <a href="./sobre.html" class="nav-btn">Sobre</a>
    <a href="./quiz.html" class="nav-btn">Quiz</a>
    <a href="./contacto.html" class="nav-btn">Contacto</a>
  </nav>
</header>
  `;

    // Configurar event listeners após renderização
    this.setupEventListeners();
  }

  setupEventListeners() {
    const menuToggle = this.querySelector(".menu-toggle");
    const navbar = this.querySelector(".navbar");
    const overlay = this.querySelector(".menu-overlay");
    const navLinks = this.querySelectorAll(".nav-btn");

    // Abrir/fechar menu
    menuToggle.addEventListener("click", () => {
      this.menuOpen = !this.menuOpen;
      menuToggle.classList.toggle("active");
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", this.menuOpen);

      // Prevenir scroll quando menu aberto
      document.body.style.overflow = this.menuOpen ? "hidden" : "";
    });

    // Fechar menu ao clicar no overlay
    overlay.addEventListener("click", () => {
      this.closeMenu(menuToggle, navbar, overlay);
    });

    // Fechar menu ao clicar num link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMenu(menuToggle, navbar, overlay);
      });
    });

    // Fechar menu com tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.menuOpen) {
        this.closeMenu(menuToggle, navbar, overlay);
      }
    });

    // Fechar menu ao redimensionar para desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024 && this.menuOpen) {
        this.closeMenu(menuToggle, navbar, overlay);
      }
    });
  }

  closeMenu(menuToggle, navbar, overlay) {
    this.menuOpen = false;
    menuToggle.classList.remove("active");
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
}

// Registar componente customizado
customElements.define("rb-header", Header);
