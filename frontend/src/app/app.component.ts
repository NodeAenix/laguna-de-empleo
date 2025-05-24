import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FloatingMessageBoxComponent } from "./shared/components/floating-message-box/floating-message-box.component";
import { MessageService } from './services/message.service';
import { HeaderComponent } from "./shared/components/header/header.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FloatingMessageBoxComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    
    private messageService = inject(MessageService);
    
    message = this.messageService.message;

}
