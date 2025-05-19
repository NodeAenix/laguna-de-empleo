import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FloatingMessageBoxComponent } from "./shared/components/floating-message-box/floating-message-box.component";
import { MessageService } from './services/message.service';
import { ThemeToggleComponent } from "./shared/components/theme-toggle/theme-toggle/theme-toggle.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FloatingMessageBoxComponent, ThemeToggleComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    
    private messageService = inject(MessageService);
    
    message = this.messageService.message;

}
