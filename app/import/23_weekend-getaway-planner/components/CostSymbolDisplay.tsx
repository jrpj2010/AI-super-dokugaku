interface CostSymbolDisplayProps {
  symbol: string;
}

export function CostSymbolDisplay({ symbol }: CostSymbolDisplayProps) {
  const getCostLabel = (sym: string) => {
    switch (sym) {
      case '¥':
        return '手頃';
      case '¥¥':
        return '普通';
      case '¥¥¥':
        return '高級';
      default:
        return sym;
    }
  };

  const getCostColor = (sym: string) => {
    switch (sym) {
      case '¥':
        return 'text-green-600';
      case '¥¥':
        return 'text-yellow-600';
      case '¥¥¥':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <span className={`${getCostColor(symbol)} font-bold`}>
      {symbol} <span className="text-xs">({getCostLabel(symbol)})</span>
    </span>
  );
}