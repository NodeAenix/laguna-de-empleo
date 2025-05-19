import { Component, input } from '@angular/core';

@Component({
    selector: 'floating-message-box',
    imports: [],
    templateUrl: './floating-message-box.component.html',
    styleUrl: './floating-message-box.component.css'
})
export class FloatingMessageBoxComponent {
    
    type = input.required<'success' | 'error' | 'info'>();
    message = input.required();

}
