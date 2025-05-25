/**
 * Claude Code Action テスト用サンプルファイル
 *
 * このファイルは以下の実験に使用します：
 * - コードレビュー
 * - バグ修正
 * - リファクタリング提案
 */

// シンプルな計算機クラス
class Calculator {
  constructor() {
    this.result = 0;
  }

  // 足し算
  add(num) {
    this.result += num;
    return this;
  }

  // 引き算
  subtract(num) {
    this.result -= num;
    return this;
  }

  // 掛け算
  multiply(num) {
    this.result *= num;
    return this;
  }

  // 割り算
  divide(num) {
    if (num === 0) {
      throw new Error('ゼロで割ることはできません');
    }
    this.result /= num;
    return this;
  }

  // 結果を取得
  getValue() {
    return this.result;
  }

  // リセット
  reset() {
    this.result = 0;
    return this;
  }
}

// 使用例
const calc = new Calculator();
console.log(calc.add(10).multiply(2).subtract(5).getValue()); // 15

// TODO: エラーハンドリングを改善
// TODO: 履歴機能を追加
// TODO: より複雑な計算をサポート

module.exports = Calculator;
