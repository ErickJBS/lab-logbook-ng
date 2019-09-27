import { Component, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  fileData: File = null;

  constructor(
    private data: DataService,
    private snackBar: MatSnackBar
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
    this.data.uploadDatabaseFile(this.fileData).subscribe((res) => {
      console.log(res);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
