// LIBRERIA DE ALERTAS PROPIO (PARA NO USAR LIBRERIAS EXTERNAS COMO TOASTR QUE SERIA LO MEJOR)

type AlertType = "success" | "error" | "info";

interface AlertOptions {
  title?: string;
  message: string;
  duration?: number;
}

class AlertsLib {
  private container: HTMLElement;

  constructor() {
    let existing = document.querySelector(".alerts-container") as HTMLElement;
    if (existing) {
      this.container = existing;
    } else {
      this.container = document.createElement("div");
      this.container.className = "alerts-container";
      document.body.appendChild(this.container);
      this.injectStyles();
    }
  }

  private injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .alerts-container {
        position: fixed;
        top: 1rem;
        right: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        z-index: 9999;
      }

      .alert {
        min-width: 250px;
        max-width: 320px;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        color: #fff;
        font-family: sans-serif;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        position: relative;
      }

      .alert.show {
        opacity: 1;
        transform: translateX(0);
      }

      .alert-title {
        font-weight: bold;
        margin-bottom: 0.25rem;
      }

      .alert-success { background:rgb(52, 150, 88); }
      .alert-error { background:rgb(187, 50, 50); }
      .alert-info { background:rgb(36, 79, 172); }

      .alert-close {
        position: absolute;
        top: 0.25rem;
        right: 0.5rem;
        background: transparent;
        border: none;
        color: #fff;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }

  private showAlert(type: AlertType, { title, message, duration = 3000 }: AlertOptions) {
    const alertEl = document.createElement("div");
    alertEl.className = `alert alert-${type}`;

    if (title) {
      const titleEl = document.createElement("div");
      titleEl.className = "alert-title";
      titleEl.textContent = title;
      alertEl.appendChild(titleEl);
    }

    const msgEl = document.createElement("div");
    msgEl.className = "alert-message";
    msgEl.textContent = message;
    alertEl.appendChild(msgEl);

    // botón de cerrar
    const closeBtn = document.createElement("button");
    closeBtn.className = "alert-close";
    closeBtn.innerHTML = "&times;";
    closeBtn.onclick = () => {
      alertEl.classList.remove("show");
      setTimeout(() => alertEl.remove(), 300);
    };
    alertEl.appendChild(closeBtn);

    this.container.appendChild(alertEl);

    // animar entrada
    setTimeout(() => alertEl.classList.add("show"), 10);

    if (duration > 0) {
      setTimeout(() => {
        alertEl.classList.remove("show");
        setTimeout(() => alertEl.remove(), 300);
      }, duration);
    }
  }

  success(message: string, title?: string, duration?: number) {
    this.showAlert("success", { message, title, duration });
  }

  error(message: string, title?: string, duration?: number) {
    this.showAlert("error", { message, title, duration });
  }

  info(message: string, title?: string, duration?: number) {
    this.showAlert("info", { message, title, duration });
  }
}

export const Alerts = new AlertsLib();
