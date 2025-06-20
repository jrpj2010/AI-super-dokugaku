'use client'

import { useState } from 'react';
import { Area, Purpose, BudgetLevel, SearchCriteria } from '@/types/v2';
import { AreaSelector } from './AreaSelector';
import { PurposeSelector } from './PurposeSelector';
import { DetailSelector } from './DetailSelector';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StepWizardProps {
  onComplete: (criteria: SearchCriteria) => void;
  onCancel: () => void;
}

export function StepWizard({ onComplete, onCancel }: StepWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [criteria, setCriteria] = useState<Partial<SearchCriteria>>({
    purposes: [],
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // 完了
      if (criteria.area && criteria.purposes && criteria.purposes.length > 0) {
        onComplete(criteria as SearchCriteria);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AreaSelector
            selectedArea={criteria.area}
            onAreaChange={(area) => setCriteria({ ...criteria, area })}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <PurposeSelector
            selectedPurposes={criteria.purposes || []}
            onPurposeChange={(purposes) => setCriteria({ ...criteria, purposes })}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <DetailSelector
            criteria={criteria}
            onChange={setCriteria}
            onComplete={() => {
              if (criteria.area && criteria.purposes && criteria.purposes.length > 0) {
                onComplete(criteria as SearchCriteria);
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {currentStep > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  戻る
                </Button>
              )}
              <h1 className="text-xl font-bold">週末プランを作成</h1>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>

      {/* プログレスバー */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              ステップ {currentStep} / {totalSteps}
            </span>
            <span className="text-sm text-gray-600">
              {currentStep === 1 && 'エリア選択'}
              {currentStep === 2 && '目的選択'}
              {currentStep === 3 && '詳細設定'}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="py-8">
        {renderStep()}
      </div>
    </div>
  );
}