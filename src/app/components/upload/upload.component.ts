import { Component, OnInit } from '@angular/core';
import { RagService } from 'src/app/services/rag.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private ragService: RagService) {}

  onUpload(event: any) {
    const file: File = event.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.ragService.uploadFile(formData).subscribe({
      next: (response) => console.log('File uploaded successfully', response),
      error: (error) => console.error('Error uploading file', error)
    });
  }

  ngOnInit(): void {
  }

}
