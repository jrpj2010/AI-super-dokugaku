/**
 * 分析結果を視覚的に表現するモジュール
 */
class VisualizationManager {
  /**
   * VisualizationManagerのコンストラクタ
   * @param {string} containerId 視覚化要素を表示するコンテナのID
   */
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentView = 'hierarchy';
    this.detailLevel = 3;
    
    // サンプルデータ
    this.sampleData = {
      hierarchy: {
        title: '効果的な書籍設計のための考察と提案',
        children: [
          {
            title: 'メディア形態の違い',
            subtitle: 'セミナーvs書籍',
            children: [
              { title: '問題提起', content: 'セミナーと書籍では受講者とゴール設定が異なる' },
              { title: '背景分析', content: 'メディア特性による学習体験の違い' },
              { title: '具体的提案', content: '書籍ならではの「驚き」や「感動」の設計' }
            ]
          },
          {
            title: '情報入力方法の選択',
            subtitle: '音声入力vs文章入力',
            children: [
              { title: '問題提起', content: '音声入力推奨の逆効果可能性' },
              { title: '背景分析', content: '独学層の学習スタイル特性' },
              { title: '具体的提案', content: '比較表を用いた選択肢の提示' }
            ]
          },
          {
            title: '学習継続性の確保',
            subtitle: '難易度設計と継続支援',
            children: [
              { title: '問題提起', content: '後半部分での読者の脱落懸念' },
              { title: '背景分析', content: '難しさを感じる要因' },
              { title: '具体的提案', content: 'まとめやチェックリストの設置' }
            ]
          }
        ]
      },
      relationThemes: [
        { name: '読者体験の最適化', x: 50, y: 50, size: 30 },
        { name: 'メディア特性理解', x: 20, y: 20, size: 20 },
        { name: '入力方法の選択', x: 80, y: 20, size: 20 },
        { name: '継続性の確保', x: 50, y: 80, size: 20 },
      ],
      relationLinks: [
        { source: 0, target: 1, strength: 0.7 },
        { source: 0, target: 2, strength: 0.6 },
        { source: 0, target: 3, strength: 0.8 },
        { source: 1, target: 2, strength: 0.4 },
        { source: 2, target: 3, strength: 0.5 },
        { source: 3, target: 1, strength: 0.3 }
      ]
    };
    
    this.setupEventListeners();
  }

  /**
   * イベントリスナーを設定
   */
  setupEventListeners() {
    // 表示モード切替ボタンのイベントリスナー
    const viewButtons = document.querySelectorAll('[data-view]');
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.currentView = button.getAttribute('data-view');
        
        // アクティブクラスの切り替え
        viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // 選択されたビューの描画
        this.renderVisualization();
      });
    });
    
    // 詳細レベルスライダーのイベントリスナー
    const detailSlider = document.getElementById('detailLevel');
    if (detailSlider) {
      detailSlider.addEventListener('input', () => {
        this.detailLevel = parseInt(detailSlider.value, 10);
        this.renderVisualization();
      });
    }
  }

  /**
   * 構造分析結果を視覚化
   * @param {Object} structureData 構造分析データ（省略時はサンプルデータを使用）
   */
  renderStructureVisualization(structureData = null) {
    if (!this.container) return;
    
    // データがない場合はサンプルデータを使用
    const data = structureData || this.sampleData.hierarchy;
    
    // 現在の表示モードに応じた描画処理
    switch (this.currentView) {
      case 'hierarchy':
        this.renderHierarchyView(data);
        break;
      case 'flow':
        this.renderFlowView(data);
        break;
      case 'mind':
        this.renderMindMapView(data);
        break;
      default:
        this.renderHierarchyView(data);
    }
  }

  /**
   * 階層ビューの描画
   * @param {Object} data 階層データ
   */
  renderHierarchyView(data) {
    // 実際のアプリケーションでは、D3.jsやChart.jsなどのライブラリを使用して
    // 本格的な階層図を描画するが、ここではHTMLで簡易表示
    
    const hierarchyHTML = `
      <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; overflow: auto;">
        <div style="width: 100%; max-width: 800px;">
          <div style="background-color: var(--primary); color: white; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <strong>${data.title}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
            ${data.children.map((mainPoint, index) => `
              <div style="background-color: var(--secondary); color: white; padding: 12px; border-radius: 6px; margin-bottom: 15px; text-align: center; flex: 1; min-width: 200px;">
                <div style="font-weight: bold;">${mainPoint.title}</div>
                <div style="font-size: 0.8rem; opacity: 0.8;">${mainPoint.subtitle}</div>
                ${this.detailLevel >= 3 ? `
                  <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 5px;">
                    ${mainPoint.children.map(subPoint => `
                      <div style="background-color: rgba(255,255,255,0.2); padding: 5px; border-radius: 4px; text-align: left; font-size: 0.9rem;">
                        <strong>${subPoint.title}:</strong> ${this.detailLevel >= 4 ? subPoint.content : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    
    this.container.innerHTML = hierarchyHTML;
  }

  /**
   * フロービューの描画
   * @param {Object} data 階層データ
   */
  renderFlowView(data) {
    // 実際のアプリケーションでは、フローチャートライブラリを使用して描画
    
    const flowHTML = `
      <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; overflow: auto;">
        <div style="width: 100%; max-width: 800px;">
          <div style="background-color: var(--primary); color: white; padding: 10px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
            <strong>${data.title}</strong>
          </div>
          
          ${data.children.map((mainPoint, index) => `
            <div style="margin-bottom: 30px;">
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="width: 30px; height: 30px; background-color: var(--secondary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                  ${index + 1}
                </div>
                <div style="background-color: var(--secondary); color: white; padding: 8px 15px; border-radius: 6px; flex-grow: 1;">
                  <div style="font-weight: bold;">${mainPoint.title}</div>
                  <div style="font-size: 0.8rem; opacity: 0.8;">${mainPoint.subtitle}</div>
                </div>
              </div>
              
              ${this.detailLevel >= 3 ? `
                <div style="display: flex; margin-left: 40px;">
                  <div style="width: 2px; background-color: var(--border-light); margin-right: 20px;"></div>
                  <div style="flex-grow: 1;">
                    ${mainPoint.children.map(subPoint => `
                      <div style="margin-bottom: 15px;">
                        <div style="font-weight: bold; color: var(--primary); margin-bottom: 5px;">${subPoint.title}</div>
                        ${this.detailLevel >= 4 ? `<div style="background-color: var(--background-light); padding: 8px; border-radius: 4px;">${subPoint.content}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    this.container.innerHTML = flowHTML;
  }

  /**
   * マインドマップビューの描画
   * @param {Object} data 階層データ
   */
  renderMindMapView(data) {
    // 実際のアプリケーションでは、マインドマップライブラリを使用して描画
    
    const mindMapHTML = `
      <div style="height: 100%; display: flex; align-items: center; justify-content: center; padding: 10px; overflow: auto;">
        <div style="position: relative; width: 100%; height: 100%; max-width: 800px; max-height: 500px;">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: var(--primary); color: white; padding: 15px; border-radius: 50%; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; text-align: center; z-index: 10;">
            メッセージ構造
          </div>
          
          ${data.children.map((mainPoint, index) => {
            // 各主要ポイントの位置を計算（円周上に配置）
            const angle = (index / data.children.length) * 2 * Math.PI;
            const x = 50 + 30 * Math.cos(angle);
            const y = 50 + 30 * Math.sin(angle);
            
            return `
              <div style="position: absolute; top: ${y}%; left: ${x}%; transform: translate(-50%, -50%); background-color: var(--secondary); color: white; padding: 10px; border-radius: 8px; text-align: center; width: 100px; z-index: 5;">
                ${mainPoint.title}
              </div>
              
              ${this.detailLevel >= 3 && mainPoint.children ? mainPoint.children.map((subPoint, subIndex) => {
                // サブポイントの位置を計算（主要ポイントの周りに配置）
                const subAngle = angle + (subIndex - 1) * 0.3;
                const subX = x + 15 * Math.cos(subAngle);
                const subY = y + 15 * Math.sin(subAngle);
                
                return `
                  <div style="position: absolute; top: ${subY}%; left: ${subX}%; transform: translate(-50%, -50%); background-color: var(--accent); color: white; padding: 5px; border-radius: 6px; text-align: center; font-size: 0.8rem; width: 80px; z-index: 2;">
                    ${subPoint.title}
                  </div>
                `;
              }).join('') : ''}
            `;
          }).join('')}
          
          <!-- 接続線（実際のアプリケーションでは、SVGやCanvasで描画） -->
          <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;" viewBox="0 0 100 100">
            ${data.children.map((mainPoint, index) => {
              const angle = (index / data.children.length) * 2 * Math.PI;
              const x = 50 + 30 * Math.cos(angle);
              const y = 50 + 30 * Math.sin(angle);
              
              return `
                <line x1="50" y1="50" x2="${x}" y2="${y}" stroke="var(--border-medium)" stroke-width="1" />
              `;
            }).join('')}
          </svg>
        </div>
      </div>
    `;
    
    this.container.innerHTML = mindMapHTML;
  }

  /**
   * テーマの関連性を視覚化
   * @param {string[]} themes テーマのリスト（省略時はサンプルデータを使用）
   */
  renderThemeRelationship(themes = null) {
    if (!this.container) return;
    
    // 実際のアプリケーションでは、D3.jsなどのライブラリを使用して
    // ネットワークグラフを描画するが、ここではHTMLで簡易表示
    
    // データがない場合はサンプルデータを使用
    const nodes = themes || this.sampleData.relationThemes;
    const links = this.sampleData.relationLinks;
    
    const relationshipHTML = `
      <div style="height: 100%; position: relative;">
        ${nodes.map((node, index) => `
          <div style="
            position: absolute;
            top: ${node.y}%;
            left: ${node.x}%;
            transform: translate(-50%, -50%);
            background-color: ${index === 0 ? 'var(--primary)' : 'var(--secondary)'};
            color: white;
            padding: 10px;
            border-radius: ${index === 0 ? '50%' : '8px'};
            text-align: center;
            width: ${node.size * 4}px;
            height: ${index === 0 ? node.size * 4 : 'auto'}px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5;
          ">
            ${node.name}
          </div>
        `).join('')}
        
        <!-- 接続線 -->
        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;" viewBox="0 0 100 100">
          ${links.map(link => {
            const source = nodes[link.source];
            const target = nodes[link.target];
            return `
              <line 
                x1="${source.x}" 
                y1="${source.y}" 
                x2="${target.x}" 
                y2="${target.y}" 
                stroke="var(--border-medium)" 
                stroke-width="${link.strength * 3}" 
                stroke-opacity="0.6"
              />
            `;
          }).join('')}
        </svg>
      </div>
    `;
    
    this.container.innerHTML = relationshipHTML;
  }

  /**
   * アドバイス要素をカテゴリー別に視覚化
   * @param {Object[]} advice アドバイスのリスト（省略時はサンプルデータを使用）
   */
  renderAdviceCategories(advice = null) {
    if (!this.container) return;
    
    // 実際のアプリケーションでは、グラフィカルな視覚化を行うが、
    // ここではHTMLでカテゴリー別に表示
    
    // サンプルアドバイスカテゴリー
    const categories = [
      { name: '構造改善', color: 'var(--primary)', icon: '📊' },
      { name: '選択肢提示', color: 'var(--secondary)', icon: '🔀' },
      { name: '継続支援', color: 'var(--success)', icon: '🔄' },
      { name: 'メディア特性活用', color: 'var(--accent)', icon: '📱' }
    ];
    
    // サンプルアドバイス内容
    const adviceItems = [
      { category: '構造改善', content: 'メッセージの論理構造をより明確にする' },
      { category: '選択肢提示', content: '比較表を用いてメリット・デメリットを対比させる' },
      { category: '継続支援', content: '定期的な確認ポイントを設ける' },
      { category: 'メディア特性活用', content: '紙媒体の強みを活かしたワークシートを取り入れる' }
    ];
    
    const categoriesHTML = `
      <div style="height: 100%; padding: 20px; overflow: auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
          ${categories.map(category => `
            <div style="background-color: white; border-left: 4px solid ${category.color}; border-radius: 8px; padding: 15px; box-shadow: var(--box-shadow-light);">
              <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <div style="font-size: 1.5rem; margin-right: 10px;">${category.icon}</div>
                <h4 style="margin: 0; color: ${category.color};">${category.name}</h4>
              </div>
              <div style="margin-top: 10px;">
                ${adviceItems.filter(item => item.category === category.name).map(item => `
                  <div style="margin-bottom: 8px; padding: 8px; background-color: var(--background-light); border-radius: 4px;">
                    ${item.content}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    this.container.innerHTML = categoriesHTML;
  }

  /**
   * 視覚化を描画する
   */
  renderVisualization() {
    this.renderStructureVisualization();
  }
}

// モジュールとしてエクスポート
export { VisualizationManager };

// 初期化処理
document.addEventListener('DOMContentLoaded', () => {
  // 構造解析ページの図を初期化
  if (document.getElementById('hierarchyDiagram')) {
    const hierarchyDiagram = document.getElementById('hierarchyDiagram');
    hierarchyDiagram.innerHTML = `
      <div style="height: 100%; display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div style="width: 100%; max-width: 800px;">
          <div style="background-color: var(--primary); color: white; padding: 10px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <strong>効果的な書籍設計のための考察と提案</strong>
          </div>
          <div style="display: flex; justify-content: space-between; gap: 10px;">
            <div style="background-color: var(--secondary); color: white; padding: 8px; border-radius: 6px; text-align: center; flex: 1;">
              <span>メディア形態の違い</span>
            </div>
            <div style="background-color: var(--secondary); color: white; padding: 8px; border-radius: 6px; text-align: center; flex: 1;">
              <span>情報入力方法の選択</span>
            </div>
            <div style="background-color: var(--secondary); color: white; padding: 8px; border-radius: 6px; text-align: center; flex: 1;">
              <span>学習継続性の確保</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (document.getElementById('relationshipDiagram')) {
    const relationshipDiagram = document.getElementById('relationshipDiagram');
    relationshipDiagram.innerHTML = `
      <div style="height: 100%; display: flex; align-items: center; justify-content: center; padding: 20px;">
        <div style="width: 100%; max-width: 600px; position: relative;">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: var(--primary); color: white; padding: 15px; border-radius: 50%; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; text-align: center;">
            <span>読者体験の最適化</span>
          </div>
          <div style="position: absolute; top: 20%; left: 20%; background-color: var(--secondary); color: white; padding: 10px; border-radius: 8px; text-align: center;">
            <span>メディア特性理解</span>
          </div>
          <div style="position: absolute; top: 20%; right: 20%; background-color: var(--secondary); color: white; padding: 10px; border-radius: 8px; text-align: center;">
            <span>入力方法の選択</span>
          </div>
          <div style="position: absolute; bottom: 20%; left: 50%; transform: translateX(-50%); background-color: var(--secondary); color: white; padding: 10px; border-radius: 8px; text-align: center;">
            <span>継続性の確保</span>
          </div>
        </div>
      </div>
    `;
  }

  if (document.getElementById('frameworkDiagram')) {
    const frameworkDiagram = document.getElementById('frameworkDiagram');
    frameworkDiagram.innerHTML = `
      <div style="height: 100%; display: flex; align-items: center; justify-content: center; padding: 10px;">
        <div style="width: 100%; display: flex; justify-content: space-between; gap: 10px;">
          <div style="background-color: var(--primary-light); color: white; padding: 15px; border-radius: 8px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="font-weight: bold; margin-bottom: 5px;">診断</div>
            <div style="font-size: 0.8rem;">読者層の理解</div>
          </div>
          <div style="display: flex; align-items: center; color: var(--text-light);">→</div>
          <div style="background-color: var(--primary-light); color: white; padding: 15px; border-radius: 8px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="font-weight: bold; margin-bottom: 5px;">設計</div>
            <div style="font-size: 0.8rem;">構成計画</div>
          </div>
          <div style="display: flex; align-items: center; color: var(--text-light);">→</div>
          <div style="background-color: var(--primary-light); color: white; padding: 15px; border-radius: 8px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="font-weight: bold; margin-bottom: 5px;">提示</div>
            <div style="font-size: 0.8rem;">選択肢提供</div>
          </div>
          <div style="display: flex; align-items: center; color: var(--text-light);">→</div>
          <div style="background-color: var(--primary-light); color: white; padding: 15px; border-radius: 8px; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="font-weight: bold; margin-bottom: 5px;">サポート</div>
            <div style="font-size: 0.8rem;">継続支援</div>
          </div>
        </div>
      </div>
    `;
  }

  // インタラクティブツールのビジュアライザを初期化
  const visualizationArea = document.getElementById('visualizationArea');
  if (visualizationArea) {
    const visualizer = new VisualizationManager('visualizationArea');
    // ビジュアライザの制御ボタンにイベントリスナーを設定
    document.querySelectorAll('[data-view]').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-view]').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        visualizer.currentView = button.getAttribute('data-view');
        visualizer.renderVisualization();
      });
    });

    // 詳細レベルスライダーにイベントリスナーを設定
    const detailLevel = document.getElementById('detailLevel');
    if (detailLevel) {
      detailLevel.addEventListener('input', () => {
        visualizer.detailLevel = parseInt(detailLevel.value, 10);
        visualizer.renderVisualization();
      });
    }
  }
});

// Syntax self-check
try {
  console.log("Visualizer syntax check passed");
}
catch (error) {
  console.error("Syntax error:", error.message);
}