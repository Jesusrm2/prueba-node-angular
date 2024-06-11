import { Component, EventEmitter, Output } from '@angular/core';
import { FileSelectEvent } from 'primeng/fileupload';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {  IImportFile, IErroresExcel } from '../../interfaces/import-file';
import { MessageService } from 'primeng/api';
import { Usuario } from '../../../auth/interfaces/usuario';
import { ImportFileService } from '../../services/import-file.service';
@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html'
})
export class ImportFileComponent {
  @Output() fileUploaded = new EventEmitter<void>();

  isLoading = false;
  nameFileToUpload?: string;
  displayImportFichero: boolean = false;


  listUsers: Usuario[] = [];
  listErrors: IErroresExcel[] = [];



  selectFile?: File;
  formData: FormData;

  constructor(private importFileService: ImportFileService, private messageService: MessageService,) { 
    this.formData = new FormData();
  }

  onFileSelect(event: FileSelectEvent) {
    if (event.files.length > 0) {
      this.selectFile = event.files[0];
      this.nameFileToUpload = this.selectFile.name;
    }
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
 
  private guardarDatosFichero():boolean {
    let rellenado:boolean = false;
    if (this.selectFile) {
      rellenado = true;
      this.formData.delete('fichero');
      this.formData.append('fichero', this.selectFile);
    }
    return rellenado;
 
  }

  
  response?: IImportFile = undefined;

  enviarFichero() {
    this.isLoading = true;
    this.listUsers = [];
    this.listErrors = [];

    const rellenado = this.guardarDatosFichero();
    if(rellenado && this.selectFile){
       this.importFileService.uploadUsers(this.selectFile).subscribe(
        {
          next: (response) => {
            this.response = response;
            if (response.usuariosExitosos) {
              this.listUsers = response.usuariosExitosos;
            }
            if (response.errores) {
              console.log(response.errores);
              this.listErrors = response.errores;
            }
            this.fileUploaded.emit();
          },
          error: (error) => {
  
            this.messageService.add({ severity: 'error', summary: 'Error al procesar el fichero', detail: 'No se han podido procesar los datos' });
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
          
        }
    
       );
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error al procesar el fichero', detail: 'No se ha seleccionado ningún fichero' });
    }
 }
 downloadExcelFile() {
  if (this.listUsers && this.listUsers.length > 0) {
    const worksheet = XLSX.utils.json_to_sheet(this.listUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'UsersAccount.xlsx');
  } else {
    console.log('No hay usuarios para exportar');
  }
}
downloadPdfFile() {
  if (this.listUsers && this.listUsers.length > 0) {
    const doc = new jsPDF();
    const columnNames = ["Usuario", "Email", "Identificacion", "Rol" ];
    const data = this.listUsers.map(user => [
      user.persona.nombres + ' ' + user.persona.apellidos,
      user.correo,
      user.persona.identificacion,
      user.rol.rolname

    ]);
    autoTable(doc, {
      head: [columnNames],
      body: data,
    });
    doc.save('UsersAccount.pdf');
  } else {
    console.log('No hay usuarios para exportar');
  }
}
}