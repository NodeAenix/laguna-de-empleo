import { computed, Injectable, signal } from '@angular/core';

interface DisplayMessage {
    text: string;
    type: 'success' | 'error' | 'info' | null;
}

@Injectable({providedIn: 'root'})
export class MessageService {

    private _message = signal<DisplayMessage>({ text: '', type: null });
    private timeoutId: any;

    message = computed(() => this._message());

    showMessage({ text, type }: DisplayMessage) {
        // Limpiar los timeouts en caso de tener más de uno
        clearTimeout(this.timeoutId);

        // "Reiniciar" el timeout para que se actualice también la animación CSS
        this._message.set({ text: '', type: null });
        setTimeout(() => {
            this._message.set({ text, type });
        }, 0);

        // Mostrar mensaje y 3 segundos después quitarlo
        this.timeoutId = setTimeout(() => {
            this._message.set({ text: '', type: null });
        }, 3000);
    }
    
}
