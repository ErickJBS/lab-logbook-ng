import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  @ViewChild('input', { static: true }) inputFile;
  fileData: File = null;
  loading: boolean;

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
  }

  onFileChange(fileInput: any) {
    if (fileInput.target.files.length > 0) {
      this.fileData = fileInput.target.files[0];
    }
  }

  onSubmitFile() {
    if (this.fileData === null) {
      this.openSnackBar('No se seleccionó un archivo', null);
      return;
    }
    this.loading = true;
    this.data.uploadDatabaseFile(this.fileData).subscribe((res: any) => {
      this.openSnackBar(res.message, null);
      console.log(res);
      this.loading = false;
      this.inputFile.nativeElement.value = null;
      this.fileData = null;
    });
  }

  openSnackBar(message: string, action: string) {
  }


}
