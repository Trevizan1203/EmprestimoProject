import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showToast(message: string, type: string = 'success', reloadPage: boolean = false): void {
    const toast = document.createElement('div');
    toast.classList.add('toast', 'fade', 'show', `bg-${type}`);
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.zIndex = '9999';

    toast.innerHTML = `
        <div class="toast-header">
          <i class="fa fa-info-circle" aria-hidden="true"></i>
          <strong class="me-auto">Aviso</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${message}
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('show');
      document.body.removeChild(toast);

      if (reloadPage) {
        window.location.reload();
      }
    }, 2000);
  }
}
