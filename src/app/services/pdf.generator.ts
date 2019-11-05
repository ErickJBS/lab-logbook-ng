import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { PageOrientation } from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
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

  generateStudentsReportPdf(managerName: string, records: any[]) {
    const docDefinition = {
      content: [
        { text: 'Universidad Autónoma de Chihuahua', style: 'header' },
        { text: 'Facultad de Ingeniería', style: 'header' },
        { text: 'Laboratorio de Automática', style: 'header' },
        { text: 'Bitácora de Asistencia de Alumnos', style: 'header' },
        { text: `Jefe de Laboratorio: ${managerName}`, style: 'header' },
        {
          margin: [0, 20, 0, 0],
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 250, '*'],

            body: [
              [{ text: 'Matrícula', style: 'tableHead' }, { text: 'Nombre', style: 'tableHead' }, { text: 'Carrera', style: 'tableHead' }],
              ...records
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

  generateProfessorsReportPdf(managerName: string, records: any[]) {
    const docDefinition = {
      pageOrientation: 'landscape',
      content: [
        { text: 'Universidad Autónoma de Chihuahua', style: 'header' },
        { text: 'Facultad de Ingeniería', style: 'header' },
        { text: 'Laboratorio de Automática', style: 'header' },
        { text: 'Bitácora de Asistencia de Alumnos', style: 'header' },
        { text: `Jefe de Laboratorio: ${managerName}`, style: 'header' },
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
              ...records
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

    pdfMake.createPdf(docDefinition).open();
  }

}
