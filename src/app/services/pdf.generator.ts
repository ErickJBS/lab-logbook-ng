import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { PageOrientation } from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { group } from '@angular/animations';
import { Subject } from 'rxjs';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfGenerator {

  images = {
    logo_fing: 'img/logo_fing.png',
  };

  constructor() {
    (pdfMake as any).fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    };
  }

  generateStudentsReportPdf(content: {
    startDate: Date,
    endDate: Date,
    group: string,
    subject: string,
    managerName: string,
    records: any[]
    professor: string
  }) {
    const timeStamp = `${this.formatDate(content.startDate)} - ${this.formatDate(content.endDate)}`;
    const docDefinition = {
      content: [
        { text: 'Universidad Autónoma de Chihuahua', style: 'header' },
        { text: 'Facultad de Ingeniería', style: 'header' },
        { text: 'Laboratorio de Automática', style: 'header' },
        { text: 'Bitácora de Asistencia de Alumnos', style: 'header' },
        { text: `Jefe de Laboratorio: ${content.managerName}`, style: 'header' },
        {
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              alignment: 'center',
              margin: [0, 20, 0, 0],
              table: {
                headerRows: 0,
                widths: ['*'],
                body: [
                  [{ text: content.group || 'NA' }],
                  [{ text: content.subject || 'NA' }],
                  [{ text: content.professor || 'NA' }],
                  [{ text: timeStamp }],
                ]
              }
            },
            { width: '*', text: '' },
          ]
        },
        {
          margin: [0, 20, 0, 0],
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 250, '*'],

            body: [
              [{ text: 'Matrícula', style: 'tableHead' }, { text: 'Nombre', style: 'tableHead' }, { text: 'Carrera', style: 'tableHead' }],
              ...content.records
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: 'center',
        },
        tableHead: {
          fontSize: 12,
          alignment: 'center',
        }
      },
      images: {
        // logo_fing: 'http://fing.uach.mx/util/2013/01/27/logo%20ingenieria.png',
        // logo_uach: 'http://fing.uach.mx/util/2013/01/27/logo%20uach.png',
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }

  generateProfessorsReportPdf(content: {
    startDate: Date,
    endDate: Date,
    managerName: string,
    records: any[]
  }) {
    const docDefinition = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Universidad Autónoma de Chihuahua', style: 'header' },
        { text: 'Facultad de Ingeniería', style: 'header' },
        { text: 'Laboratorio de Automática', style: 'header' },
        { text: 'Bitácora de Asistencia de Alumnos', style: 'header' },
        { text: `Jefe de Laboratorio: ${content.managerName}`, style: 'header' },
        {
          margin: [0, 20, 0, 0],
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [350, '*', '*', '*'],

            body: [
              [{ text: 'Docente', style: 'tableHead' }, { text: 'Materia', style: 'tableHead' },
              { text: 'Fecha', style: 'tableHead' }, { text: 'Entrada', style: 'tableHead' }],
              ...content.records
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: 'center',
        },
        tableHead: {
          fontSize: 12,
          alignment: 'center',
        }
      }
    };

    pdfMake.createPdf(docDefinition as any).open();
  }

  formatDate(date: Date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = '' + date.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('/');
  }
}
