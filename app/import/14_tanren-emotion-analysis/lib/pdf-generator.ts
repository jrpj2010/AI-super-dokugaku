import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFGeneratorOptions {
  sessionId: string;
  timestamp: string;
}

export class PDFGenerator {
  private doc: jsPDF;
  
  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
  }

  /**
   * レポート全体をPDFに変換
   */
  async generateReportPDF(
    element: HTMLElement,
    options: PDFGeneratorOptions
  ): Promise<Blob> {
    try {
      // html2canvasでレポート全体をキャンバスに変換
      const canvas = await html2canvas(element, {
        scale: 2, // 高解像度で出力
        useCORS: true, // 外部リソースを許可
        logging: false,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY, // スクロール位置を考慮
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4の幅 (mm)
      const pageHeight = 297; // A4の高さ (mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // 最初のページに画像を追加
      this.doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // フッターを追加
      this.addFooter(1);

      // 複数ページが必要な場合
      let pageCount = 1;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        this.doc.addPage();
        pageCount++;
        this.doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        this.addFooter(pageCount);
        heightLeft -= pageHeight;
      }

      // PDFをBlobとして返す
      return this.doc.output('blob');
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error('PDFの生成に失敗しました');
    }
  }

  /**
   * フッターを追加
   */
  private addFooter(pageNumber: number): void {
    const pageHeight = 297; // A4の高さ (mm)
    const footerY = pageHeight - 10; // 下から10mm
    
    // フッターテキストを設定
    this.doc.setFontSize(10);
    this.doc.setTextColor(128, 128, 128); // グレー色
    
    // 中央にバージョン情報を配置
    const versionText = 'TANREN Ver 1.1.2';
    const textWidth = this.doc.getTextWidth(versionText);
    const centerX = 105; // A4の幅の中央
    this.doc.text(versionText, centerX - textWidth / 2, footerY);
    
    // 日付を右側に配置
    const dateText = new Date().toLocaleDateString('ja-JP');
    const dateWidth = this.doc.getTextWidth(dateText);
    this.doc.text(dateText, 200 - dateWidth, footerY);
    
    // ページ番号を左側に配置
    const pageText = `Page ${pageNumber}`;
    this.doc.text(pageText, 10, footerY);
  }

  /**
   * 日本語フォントを設定（必要に応じて）
   */
  async setJapaneseFont(): Promise<void> {
    // 日本語フォントの設定が必要な場合はここで行う
    // 現在はhtml2canvasを使用してレンダリングするため、
    // ブラウザのフォントがそのまま使用される
  }

  /**
   * ファイル名を生成
   */
  static generateFileName(sessionId: string, timestamp: string): string {
    const formattedTimestamp = timestamp.replace(/[:\s]/g, '_');
    return `tanren_emotion_report_${sessionId}_${formattedTimestamp}.pdf`;
  }
}