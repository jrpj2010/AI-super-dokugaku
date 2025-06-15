/**
 * スライド生成エンジン
 * 既存の分析結果を重厚なHTMLスライドに変換
 */

import { MessageAnalyzer } from './analyzer.js';
import { VisualizationManager } from './visualizer.js';
import { PracticalAdviceManager } from './practical-advice.js';

export class SlideGenerator {
  constructor() {
    this.analyzer = new MessageAnalyzer();
    this.adviceManager = new PracticalAdviceManager();
    this.slides = [];
    
    // スライドテーマ設定
    this.theme = {
      primary: '#2c6b97',
      secondary: '#65a897',
      accent: '#f5a623',
      text: '#333333',
      background: '#ffffff',
      gradient1: 'linear-gradient(135deg, #2c6b97 0%, #4889b5 100%)',
      gradient2: 'linear-gradient(135deg, #65a897 0%, #7fc4b3 100%)'
    };
  }
  
  /**
   * メッセージからスライドを生成
   * @param {string} message - 分析対象のメッセージ
   * @returns {Promise<Object>} スライドデータ
   */
  async generateSlides(message) {
    // メッセージを分析
    const analysisResult = await this.analyzer.analyzeMessage(message);
    
    // アドバイスを生成
    const advice = this.adviceManager.generateAdvice(analysisResult);
    const implementationSteps = this.adviceManager.generateImplementationSteps(advice);
    
    // スライドを構築
    this.slides = [];
    
    // 1. タイトルスライド
    this.slides.push(this.createTitleSlide(analysisResult));
    
    // 2. 概要スライド
    this.slides.push(this.createOverviewSlide(analysisResult));
    
    // 3. 主要テーマスライド
    this.slides.push(this.createThemesSlide(analysisResult.themes));
    
    // 4. 問題意識スライド
    if (analysisResult.problems && analysisResult.problems.length > 0) {
      this.slides.push(this.createProblemsSlide(analysisResult.problems));
    }
    
    // 5. 構造分析スライド
    this.slides.push(this.createStructureSlide(analysisResult.structure));
    
    // 6. 論理フロースライド
    this.slides.push(this.createLogicalFlowSlide(analysisResult.structure));
    
    // 7. 強み・弱みスライド
    this.slides.push(this.createStrengthsWeaknessesSlide(analysisResult.structure));
    
    // 8-10. アドバイススライド（カテゴリー別）
    const adviceByCategory = this.groupAdviceByCategory(advice);
    Object.entries(adviceByCategory).forEach(([category, items]) => {
      this.slides.push(this.createAdviceSlide(category, items));
    });
    
    // 11. 実装ステップスライド
    this.slides.push(this.createImplementationSlide(implementationSteps));
    
    // 12. まとめスライド
    this.slides.push(this.createSummarySlide(analysisResult, advice));
    
    return {
      slides: this.slides,
      metadata: {
        totalSlides: this.slides.length,
        generatedAt: new Date().toISOString(),
        messageLength: message.length,
        analysisResult: analysisResult
      }
    };
  }
  
  /**
   * タイトルスライドを作成
   */
  createTitleSlide(analysisResult) {
    return {
      type: 'title',
      content: {
        title: 'メッセージ分析レポート',
        subtitle: '構造化分析と改善提案',
        date: new Date().toLocaleDateString('ja-JP'),
        stats: {
          themes: analysisResult.themes.length,
          problems: analysisResult.problems?.length || 0,
          advice: analysisResult.advice?.length || 0
        }
      },
      style: {
        background: this.theme.gradient1,
        titleColor: '#ffffff',
        animation: 'fadeIn'
      }
    };
  }
  
  /**
   * 概要スライドを作成
   */
  createOverviewSlide(analysisResult) {
    return {
      type: 'overview',
      content: {
        title: '分析概要',
        sections: [
          {
            icon: '🎯',
            label: '主要テーマ',
            value: `${analysisResult.themes.length}個の重要テーマを特定`
          },
          {
            icon: '📊',
            label: '構造分析',
            value: `${analysisResult.structure.logicalFlow.length}段階の論理構造`
          },
          {
            icon: '💡',
            label: '改善提案',
            value: `${analysisResult.advice.length}個の実践的アドバイス`
          }
        ],
        metadata: analysisResult.metadata
      },
      style: {
        background: '#f8f9fa',
        accentColor: this.theme.primary
      }
    };
  }
  
  /**
   * テーマスライドを作成
   */
  createThemesSlide(themes) {
    return {
      type: 'themes',
      content: {
        title: '特定された主要テーマ',
        themes: themes.map((theme, index) => ({
          text: theme,
          size: Math.max(100 - index * 10, 60), // 重要度に応じてサイズを変更
          color: this.getThemeColor(index)
        })),
        visualization: 'bubble'
      },
      style: {
        background: '#ffffff',
        centerAlign: true
      }
    };
  }
  
  /**
   * 問題意識スライドを作成
   */
  createProblemsSlide(problems) {
    return {
      type: 'problems',
      content: {
        title: '特定された問題点',
        problems: problems.map((problem, index) => ({
          number: index + 1,
          title: problem.title,
          description: problem.description,
          severity: this.calculateSeverity(problem)
        }))
      },
      style: {
        background: '#fff5f5',
        borderColor: '#ff6b6b',
        numberStyle: 'circle'
      }
    };
  }
  
  /**
   * 構造分析スライドを作成
   */
  createStructureSlide(structure) {
    return {
      type: 'structure',
      content: {
        title: 'メッセージの構造分析',
        mainPoints: structure.mainPoints.map((point, index) => ({
          order: index + 1,
          text: point,
          icon: this.getStructureIcon(index)
        })),
        visualization: 'hierarchy'
      },
      style: {
        background: this.theme.gradient2,
        textColor: '#ffffff',
        cardStyle: 'elevated'
      }
    };
  }
  
  /**
   * 論理フロースライドを作成
   */
  createLogicalFlowSlide(structure) {
    return {
      type: 'flow',
      content: {
        title: '論理的な流れ',
        steps: structure.logicalFlow.map((step, index) => ({
          step: step,
          order: index + 1,
          description: this.getFlowDescription(step)
        })),
        visualization: 'timeline'
      },
      style: {
        background: '#f0f4f8',
        flowStyle: 'arrows',
        animation: 'slideIn'
      }
    };
  }
  
  /**
   * 強み・弱みスライドを作成
   */
  createStrengthsWeaknessesSlide(structure) {
    return {
      type: 'analysis',
      content: {
        title: '強みと改善点',
        strengths: structure.strengths.map(s => ({
          text: s,
          icon: '✓',
          color: '#4caf50'
        })),
        weaknesses: structure.weaknesses.map(w => ({
          text: w,
          icon: '!',
          color: '#ff9800'
        }))
      },
      style: {
        layout: 'split',
        background: '#ffffff'
      }
    };
  }
  
  /**
   * アドバイススライドを作成
   */
  createAdviceSlide(category, items) {
    return {
      type: 'advice',
      content: {
        title: `改善提案: ${category}`,
        category: category,
        items: items.map(item => ({
          title: item.title,
          description: item.description,
          actions: item.actions,
          priority: this.calculatePriority(item)
        }))
      },
      style: {
        background: this.getCategoryBackground(category),
        iconStyle: 'modern',
        cardLayout: 'grid'
      }
    };
  }
  
  /**
   * 実装ステップスライドを作成
   */
  createImplementationSlide(steps) {
    return {
      type: 'implementation',
      content: {
        title: '実装ロードマップ',
        phases: this.groupStepsByPhase(steps),
        timeline: this.createTimeline(steps),
        totalTime: this.calculateTotalTime(steps)
      },
      style: {
        background: '#e8f4fd',
        timelineStyle: 'gantt',
        phaseColors: ['#2196F3', '#4CAF50', '#FF9800']
      }
    };
  }
  
  /**
   * まとめスライドを作成
   */
  createSummarySlide(analysisResult, advice) {
    return {
      type: 'summary',
      content: {
        title: '分析結果のまとめ',
        keyFindings: [
          `${analysisResult.themes.length}個の主要テーマを特定`,
          `${analysisResult.structure.strengths.length}個の強みを発見`,
          `${advice.length}個の改善提案を生成`
        ],
        nextSteps: this.generateNextSteps(advice),
        callToAction: '本分析結果を基に、メッセージの改善を始めましょう'
      },
      style: {
        background: this.theme.gradient1,
        textColor: '#ffffff',
        layout: 'centered'
      }
    };
  }
  
  /**
   * アドバイスをカテゴリー別にグループ化
   */
  groupAdviceByCategory(advice) {
    const grouped = {};
    advice.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  }
  
  /**
   * テーマの色を取得
   */
  getThemeColor(index) {
    const colors = [
      '#2c6b97', '#65a897', '#f5a623', '#e74c3c', '#9b59b6',
      '#3498db', '#1abc9c', '#f39c12', '#e67e22', '#34495e'
    ];
    return colors[index % colors.length];
  }
  
  /**
   * 構造アイコンを取得
   */
  getStructureIcon(index) {
    const icons = ['📌', '🎯', '💡', '🔍', '📊'];
    return icons[index % icons.length];
  }
  
  /**
   * フローの説明を生成
   */
  getFlowDescription(step) {
    const descriptions = {
      '問題提起': '読者の課題や懸念を明確化',
      '分析': '原因や背景を深く掘り下げ',
      '提案': '具体的な解決策を提示',
      '比較': '選択肢を並列して検討',
      '結論': '要点をまとめて次のアクションへ'
    };
    return descriptions[step] || step;
  }
  
  /**
   * 深刻度を計算
   */
  calculateSeverity(problem) {
    // 簡易的な深刻度計算
    if (problem.title.includes('懸念') || problem.title.includes('課題')) {
      return 'high';
    } else if (problem.title.includes('可能性')) {
      return 'medium';
    }
    return 'low';
  }
  
  /**
   * 優先度を計算
   */
  calculatePriority(item) {
    if (item.category === '構造改善') return 'high';
    if (item.category === '継続支援') return 'medium';
    return 'normal';
  }
  
  /**
   * カテゴリー背景色を取得
   */
  getCategoryBackground(category) {
    const backgrounds = {
      '構造改善': '#e3f2fd',
      'メディア活用': '#f3e5f5',
      '継続支援': '#e8f5e9',
      '読者配慮': '#fff3e0'
    };
    return backgrounds[category] || '#f5f5f5';
  }
  
  /**
   * ステップをフェーズ別にグループ化
   */
  groupStepsByPhase(steps) {
    // 簡易的なフェーズ分け
    const phases = {
      '準備フェーズ': [],
      '実装フェーズ': [],
      '仕上げフェーズ': []
    };
    
    steps.forEach((step, index) => {
      if (index < steps.length / 3) {
        phases['準備フェーズ'].push(step);
      } else if (index < (steps.length * 2) / 3) {
        phases['実装フェーズ'].push(step);
      } else {
        phases['仕上げフェーズ'].push(step);
      }
    });
    
    return phases;
  }
  
  /**
   * タイムラインを作成
   */
  createTimeline(steps) {
    let currentWeek = 1;
    return steps.map(step => ({
      ...step,
      startWeek: currentWeek,
      duration: 1,
      endWeek: currentWeek++
    }));
  }
  
  /**
   * 総時間を計算
   */
  calculateTotalTime(steps) {
    return steps.length * 40; // 各ステップ平均40分と仮定
  }
  
  /**
   * 次のステップを生成
   */
  generateNextSteps(advice) {
    const priorities = advice
      .filter(a => this.calculatePriority(a) === 'high')
      .slice(0, 3);
    
    return priorities.map(p => p.title);
  }
}

// エクスポート用のファクトリ関数
export function createSlideGenerator() {
  return new SlideGenerator();
}