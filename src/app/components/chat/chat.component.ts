import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import { RagService } from 'src/app/services/rag.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  messages: { sender: string, text: string }[] = [];
  userInput: string = '';

  constructor(private ragService: RagService) {}

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ sender: 'Você', text: this.userInput });

    this.ragService.sendMessage(this.userInput).subscribe({
      next: (res) => {
        this.messages.push({ sender: 'Bot', text: res.answer });
      },
      error: (err) => {
        console.error('Erro no chat:', err);
        this.messages.push({ sender: 'Bot', text: 'Desculpe, ocorreu um erro. Tente novamente.' });
      }
    });

    this.userInput = '';
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) {
        console.error('Scroll error:', err);
      }
  }
}
