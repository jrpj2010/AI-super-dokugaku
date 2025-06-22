// レイアウトエンジン - 複数のレイアウトモードに対応

export type LayoutMode = 'vertical' | 'horizontal' | 'circular' | 'hierarchical';

export interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Node {
  id: string;
  text: string;
}

interface ThemeCluster {
  id: string;
  name: string;
  nodeIds: string[];
  keywords: string[];
  color: string;
  importance: number;
}

export class LayoutEngine {
  private nodeWidth = 280;
  private nodeHeight = 100;
  private padding = 20;

  calculateLayout(
    nodes: Node[],
    clusters: ThemeCluster[],
    mode: LayoutMode,
    manualPositions?: Map<string, NodePosition>
  ): Map<string, NodePosition> {
    switch (mode) {
      case 'vertical':
        return this.calculateVerticalLayout(nodes, manualPositions);
      case 'horizontal':
        return this.calculateHorizontalLayout(nodes, manualPositions);
      case 'circular':
        return this.calculateCircularLayout(nodes, clusters, manualPositions);
      case 'hierarchical':
        return this.calculateHierarchicalLayout(nodes, clusters, manualPositions);
      default:
        return this.calculateVerticalLayout(nodes, manualPositions);
    }
  }

  // 縦展開レイアウト（時系列重視）
  private calculateVerticalLayout(
    nodes: Node[],
    manualPositions?: Map<string, NodePosition>
  ): Map<string, NodePosition> {
    const positions = new Map<string, NodePosition>();
    const speakerColumns = new Map<string, number>();
    const speakerYPositions = new Map<string, number>();
    
    const verticalSpacing = 150;
    const horizontalSpacing = 400;
    const startX = 200;
    const startY = 100;

    nodes.forEach((node, index) => {
      // 手動調整された位置がある場合はそれを使用
      if (manualPositions?.has(node.id)) {
        positions.set(node.id, manualPositions.get(node.id)!);
        return;
      }

      const speakerMatch = node.text.match(/^話者(\d+)[：:]/);
      const speakerId = speakerMatch ? speakerMatch[1] : 'default';
      
      if (!speakerColumns.has(speakerId)) {
        speakerColumns.set(speakerId, speakerColumns.size);
        speakerYPositions.set(speakerId, startY);
      }
      
      const columnIndex = speakerColumns.get(speakerId) || 0;
      const x = startX + columnIndex * horizontalSpacing;
      const currentY = speakerYPositions.get(speakerId) || startY;
      
      positions.set(node.id, {
        x: x,
        y: currentY,
        width: this.nodeWidth,
        height: this.nodeHeight
      });
      
      speakerYPositions.set(speakerId, currentY + verticalSpacing);
    });

    return positions;
  }

  // 横展開レイアウト（話者重視）
  private calculateHorizontalLayout(
    nodes: Node[],
    manualPositions?: Map<string, NodePosition>
  ): Map<string, NodePosition> {
    const positions = new Map<string, NodePosition>();
    const speakerRows = new Map<string, number>();
    const speakerXPositions = new Map<string, number>();
    
    const horizontalSpacing = 320;
    const verticalSpacing = 200;
    const startX = 100;
    const startY = 100;

    nodes.forEach((node, index) => {
      if (manualPositions?.has(node.id)) {
        positions.set(node.id, manualPositions.get(node.id)!);
        return;
      }

      const speakerMatch = node.text.match(/^話者(\d+)[：:]/);
      const speakerId = speakerMatch ? speakerMatch[1] : 'default';
      
      if (!speakerRows.has(speakerId)) {
        speakerRows.set(speakerId, speakerRows.size);
        speakerXPositions.set(speakerId, startX);
      }
      
      const rowIndex = speakerRows.get(speakerId) || 0;
      const y = startY + rowIndex * verticalSpacing;
      const currentX = speakerXPositions.get(speakerId) || startX;
      
      positions.set(node.id, {
        x: currentX,
        y: y,
        width: this.nodeWidth,
        height: this.nodeHeight
      });
      
      speakerXPositions.set(speakerId, currentX + horizontalSpacing);
    });

    return positions;
  }

  // 円形レイアウト（中心テーマから放射状）
  private calculateCircularLayout(
    nodes: Node[],
    clusters: ThemeCluster[],
    manualPositions?: Map<string, NodePosition>
  ): Map<string, NodePosition> {
    const positions = new Map<string, NodePosition>();
    const centerX = 800;
    const centerY = 600;
    
    // クラスターごとに円を配置
    clusters.forEach((cluster, clusterIndex) => {
      const clusterRadius = 300 + clusterIndex * 150;
      const angleStep = (2 * Math.PI) / clusters.length;
      const clusterAngle = clusterIndex * angleStep;
      
      const clusterCenterX = centerX + Math.cos(clusterAngle) * clusterRadius;
      const clusterCenterY = centerY + Math.sin(clusterAngle) * clusterRadius;
      
      // クラスター内のノードを円形配置
      cluster.nodeIds.forEach((nodeId, nodeIndex) => {
        if (manualPositions?.has(nodeId)) {
          positions.set(nodeId, manualPositions.get(nodeId)!);
          return;
        }

        const nodeRadius = 100;
        const nodeAngleStep = (2 * Math.PI) / cluster.nodeIds.length;
        const nodeAngle = nodeIndex * nodeAngleStep;
        
        const x = clusterCenterX + Math.cos(nodeAngle) * nodeRadius - this.nodeWidth / 2;
        const y = clusterCenterY + Math.sin(nodeAngle) * nodeRadius - this.nodeHeight / 2;
        
        positions.set(nodeId, {
          x: Math.max(this.padding, x),
          y: Math.max(this.padding, y),
          width: this.nodeWidth,
          height: this.nodeHeight
        });
      });
    });

    // クラスターに属さないノードは中心に配置
    const unclusteredNodes = nodes.filter(node => 
      !clusters.some(cluster => cluster.nodeIds.includes(node.id))
    );
    
    unclusteredNodes.forEach((node, index) => {
      if (manualPositions?.has(node.id)) {
        positions.set(node.id, manualPositions.get(node.id)!);
        return;
      }

      const angle = (index / unclusteredNodes.length) * 2 * Math.PI;
      const radius = 150;
      
      const x = centerX + Math.cos(angle) * radius - this.nodeWidth / 2;
      const y = centerY + Math.sin(angle) * radius - this.nodeHeight / 2;
      
      positions.set(node.id, {
        x: Math.max(this.padding, x),
        y: Math.max(this.padding, y),
        width: this.nodeWidth,
        height: this.nodeHeight
      });
    });

    return positions;
  }

  // 階層レイアウト（ツリー構造）
  private calculateHierarchicalLayout(
    nodes: Node[],
    clusters: ThemeCluster[],
    manualPositions?: Map<string, NodePosition>
  ): Map<string, NodePosition> {
    const positions = new Map<string, NodePosition>();
    
    // クラスターを重要度順にソート
    const sortedClusters = [...clusters].sort((a, b) => b.importance - a.importance);
    
    let currentY = 100;
    const levelSpacing = 200;
    const nodeSpacing = 320;
    
    sortedClusters.forEach((cluster, clusterIndex) => {
      // クラスターヘッダー位置
      const clusterStartX = 100;
      
      // クラスター内ノードを横に配置
      cluster.nodeIds.forEach((nodeId, nodeIndex) => {
        if (manualPositions?.has(nodeId)) {
          positions.set(nodeId, manualPositions.get(nodeId)!);
          return;
        }

        const x = clusterStartX + nodeIndex * nodeSpacing;
        const y = currentY;
        
        positions.set(nodeId, {
          x: x,
          y: y,
          width: this.nodeWidth,
          height: this.nodeHeight
        });
      });
      
      currentY += levelSpacing;
    });

    // クラスターに属さないノードは最下段に配置
    const unclusteredNodes = nodes.filter(node => 
      !clusters.some(cluster => cluster.nodeIds.includes(node.id))
    );
    
    unclusteredNodes.forEach((node, index) => {
      if (manualPositions?.has(node.id)) {
        positions.set(node.id, manualPositions.get(node.id)!);
        return;
      }

      const x = 100 + index * nodeSpacing;
      const y = currentY;
      
      positions.set(node.id, {
        x: x,
        y: y,
        width: this.nodeWidth,
        height: this.nodeHeight
      });
    });

    return positions;
  }

  // レイアウト境界を計算
  calculateBounds(positions: Map<string, NodePosition>): {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    width: number;
    height: number;
  } {
    const positionArray = Array.from(positions.values());
    
    if (positionArray.length === 0) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0 };
    }
    
    const minX = Math.min(...positionArray.map(p => p.x));
    const maxX = Math.max(...positionArray.map(p => p.x + p.width));
    const minY = Math.min(...positionArray.map(p => p.y));
    const maxY = Math.max(...positionArray.map(p => p.y + p.height));
    
    return {
      minX,
      maxX,
      minY,
      maxY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
}