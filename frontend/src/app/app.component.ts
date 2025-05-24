import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FloatingMessageBoxComponent } from "./shared/components/floating-message-box/floating-message-box.component";
import { MessageService } from './services/message.service';
import { HeaderComponent } from "./shared/components/header/header.component";
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FloatingMessageBoxComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    
    private renderer = inject(Renderer2);
    private authService = inject(AuthService);
    private messageService = inject(MessageService);
    
    message = this.messageService.message;

    ngOnInit(): void {
        if (this.authService.getTheme() === 'dark') {
            this.renderer.addClass(document.body, 'theme-dark');
        }
    }

}
