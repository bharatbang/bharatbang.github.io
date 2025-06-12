
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoanOptionState {
  principal: string;
  annualRate: string;
  tenureMonths: string;
}

interface CalculatedLoanData {
  emi: number | null;
  totalInterest: number | null;
  totalRepayable: number | null;
}

const initialLoanOptionState: LoanOptionState = {
  principal: '',
  annualRate: '',
  tenureMonths: '',
};

const calculateLoanData = (principalStr: string, annualRateStr: string, tenureMonthsStr: string): CalculatedLoanData => {
  const principal = parseFloat(principalStr);
  const annualRate = parseFloat(annualRateStr);
  const tenureMonths = parseInt(tenureMonthsStr, 10);

  if (principal <= 0 || annualRate < 0 || tenureMonths <= 0 || isNaN(principal) || isNaN(annualRate) || isNaN(tenureMonths)) {
    return { emi: null, totalInterest: null, totalRepayable: null };
  }

  const monthlyRate = annualRate / 12 / 100;
  let emi: number;

  if (monthlyRate === 0) {
    emi = principal / tenureMonths;
  } else {
    if (Math.pow(1 + monthlyRate, tenureMonths) - 1 === 0) {
       return { emi: null, totalInterest: null, totalRepayable: null };
    }
    emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  }
  
  if (isNaN(emi) || !isFinite(emi)) {
    return { emi: null, totalInterest: null, totalRepayable: null };
  }

  const totalRepayable = emi * tenureMonths;
  const totalInterest = totalRepayable - principal;

  return { 
    emi: parseFloat(emi.toFixed(2)), 
    totalInterest: parseFloat(totalInterest.toFixed(2)), 
    totalRepayable: parseFloat(totalRepayable.toFixed(2))
  };
};

export default function EmiComparisonClient() {
  const [loanOption1, setLoanOption1] = useState<LoanOptionState>(initialLoanOptionState);
  const [loanOption2, setLoanOption2] = useState<LoanOptionState>(initialLoanOptionState);
  const [loanOption3, setLoanOption3] = useState<LoanOptionState>(initialLoanOptionState);

  const handleInputChange = (
    cardIndex: number, // 0 for Loan Option 1, 1 for Loan Option 2, 2 for Loan Option 3
    field: keyof LoanOptionState,
    value: string
  ) => {
    if (field === 'principal' || field === 'tenureMonths') {
      // Sync these fields across all options
      setLoanOption1(prev => ({ ...prev, [field]: value }));
      setLoanOption2(prev => ({ ...prev, [field]: value }));
      setLoanOption3(prev => ({ ...prev, [field]: value }));
    } else if (field === 'annualRate') {
      // Update only the specific loan option's annual rate
      if (cardIndex === 0) {
        setLoanOption1(prev => ({ ...prev, annualRate: value }));
      } else if (cardIndex === 1) {
        setLoanOption2(prev => ({ ...prev, annualRate: value }));
      } else if (cardIndex === 2) {
        setLoanOption3(prev => ({ ...prev, annualRate: value }));
      }
    }
  };

  const loanData1 = useMemo(() => calculateLoanData(loanOption1.principal, loanOption1.annualRate, loanOption1.tenureMonths), [loanOption1]);
  const loanData2 = useMemo(() => calculateLoanData(loanOption2.principal, loanOption2.annualRate, loanOption2.tenureMonths), [loanOption2]);
  const loanData3 = useMemo(() => calculateLoanData(loanOption3.principal, loanOption3.annualRate, loanOption3.tenureMonths), [loanOption3]);

  const loanDataArray = [loanData1, loanData2, loanData3];
  const loanOptionsArray = [loanOption1, loanOption2, loanOption3];

  const bestOptionIndex = useMemo(() => {
    const validOptions = loanDataArray
      .map((data, index) => ({
        ...data,
        originalIndex: index,
        principal: parseFloat(loanOptionsArray[index].principal),
      }))
      .filter(option => option.emi !== null && option.principal > 0);

    if (validOptions.length < 2) {
      return -1; // Not enough valid options to compare
    }

    validOptions.sort((a, b) => {
      if (a.emi! < b.emi!) return -1;
      if (a.emi! > b.emi!) return 1;
      if (a.totalInterest! < b.totalInterest!) return -1;
      if (a.totalInterest! > b.totalInterest!) return 1;
      return a.originalIndex < b.originalIndex ? -1 : 1; // Tie-breaker by original position
    });
    
    return validOptions[0].originalIndex;
  }, [loanData1, loanData2, loanData3, loanOption1, loanOption2, loanOption3]);


  const getCardDynamicBackground = (currentIndex: number): string => {
    if (bestOptionIndex === -1) {
      return ""; // Default background if no best option determined
    }
    if (currentIndex === bestOptionIndex) {
      return "bg-accent/20 dark:bg-accent/30"; // Greenish highlight
    } else {
      // Only apply red if this "other" option was valid itself, otherwise default
      const optionData = loanDataArray[currentIndex];
      const optionInputs = loanOptionsArray[currentIndex];
      if (optionData.emi !== null && parseFloat(optionInputs.principal) > 0) {
        return "bg-destructive/20 dark:bg-destructive/30"; // Reddish highlight
      }
      return ""; // Default for other non-best options that were not valid
    }
  };


  const renderLoanOptionCard = (
    title: string,
    optionState: LoanOptionState,
    // optionSetter: React.Dispatch<React.SetStateAction<LoanOptionState>>, // Removed
    calculatedData: CalculatedLoanData,
    optionNumber: number, // 1-based index
    borderColorClass: string,
    dynamicBackgroundClass: string
  ) => (
    <Card className={cn("flex flex-col border-2 shadow-lg", borderColorClass, dynamicBackgroundClass)}>
      <CardHeader className="bg-muted/70">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription>Enter loan details to calculate EMI.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow pt-6">
        <div>
          <Label htmlFor={`principal-${optionNumber}`} className="text-sm">Principal Amount (₹)</Label>
          <Input
            id={`principal-${optionNumber}`}
            type="number"
            placeholder="e.g., 500000"
            value={optionState.principal}
            onChange={(e) => handleInputChange(optionNumber - 1, 'principal', e.target.value)}
            min="0"
          />
        </div>
        <div>
          <Label htmlFor={`rate-${optionNumber}`} className="text-sm">Annual Interest Rate (%)</Label>
          <Input
            id={`rate-${optionNumber}`}
            type="number"
            placeholder="e.g., 8.5"
            value={optionState.annualRate}
            onChange={(e) => handleInputChange(optionNumber - 1, 'annualRate', e.target.value)}
            step="0.01"
            min="0"
          />
        </div>
        <div>
          <Label htmlFor={`tenure-${optionNumber}`} className="text-sm">Loan Tenure (Months)</Label>
          <Input
            id={`tenure-${optionNumber}`}
            type="number"
            placeholder="e.g., 60"
            value={optionState.tenureMonths}
            onChange={(e) => handleInputChange(optionNumber - 1, 'tenureMonths', e.target.value)}
            min="1"
          />
        </div>
      </CardContent>
      <CardFooter className="mt-auto bg-muted/50 p-4 rounded-b-lg">
        <div className="w-full">
          <p className="text-sm font-medium text-muted-foreground">Calculated EMI:</p>
          <p className="text-2xl font-bold text-primary">
            {calculatedData.emi !== null ? `₹ ${calculatedData.emi.toFixed(2)}` : '₹ 0.00'}
          </p>
          {calculatedData.emi === null && (optionState.principal || optionState.annualRate || optionState.tenureMonths) && (
             <p className="text-xs text-destructive mt-1 flex items-center"><AlertCircle size={14} className="mr-1" />Please enter valid inputs.</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );

  const resetAll = () => {
    setLoanOption1(initialLoanOptionState);
    setLoanOption2(initialLoanOptionState);
    setLoanOption3(initialLoanOptionState);
  };

  const renderSavingsComparison = (
    baseOptionData: CalculatedLoanData, 
    baseOptionName: string,
    compareOptionData: CalculatedLoanData, 
    compareOptionName: string,
    basePrincipal: string,
    comparePrincipal: string
    ) => {
    if (baseOptionData.emi === null || compareOptionData.emi === null) {
      return <p className="text-sm text-muted-foreground">Enter valid details for {baseOptionName} and {compareOptionName} to see comparison.</p>;
    }
    
    if (parseFloat(basePrincipal) !== parseFloat(comparePrincipal) && basePrincipal && comparePrincipal) {
        return <p className="text-sm text-muted-foreground">Principal amounts for {baseOptionName} and {compareOptionName} must be the same for direct savings comparison.</p>;
    }


    const interestDiff = (baseOptionData.totalInterest ?? 0) - (compareOptionData.totalInterest ?? 0);
    const repayableDiff = (baseOptionData.totalRepayable ?? 0) - (compareOptionData.totalRepayable ?? 0);

    return (
      <div className="space-y-2">
        <h4 className="font-semibold text-md">{compareOptionName} vs. {baseOptionName}</h4>
        <div className={cn("flex items-center", interestDiff > 0 ? "text-green-600" : interestDiff < 0 ? "text-red-600" : "text-muted-foreground")}>
          {interestDiff > 0 ? <TrendingUp size={16} className="mr-2" /> : interestDiff < 0 ? <TrendingDown size={16} className="mr-2" /> : <Info size={16} className="mr-2" />}
          <span>
            You {interestDiff > 0 ? 'save' : interestDiff < 0 ? 'spend an extra' : 'pay the same amount of'} 
            <strong className="px-1">₹{Math.abs(interestDiff).toFixed(2)}</strong> 
            in total interest.
          </span>
        </div>
        <div className={cn("flex items-center", repayableDiff > 0 ? "text-green-600" : repayableDiff < 0 ? "text-red-600" : "text-muted-foreground")}>
          {repayableDiff > 0 ? <TrendingUp size={16} className="mr-2" /> : repayableDiff < 0 ? <TrendingDown size={16} className="mr-2" /> : <Info size={16} className="mr-2" />}
          <span>
            You {repayableDiff > 0 ? 'save' : repayableDiff < 0 ? 'spend an extra' : 'repay the same amount'} 
            <strong className="px-1">₹{Math.abs(repayableDiff).toFixed(2)}</strong> 
            in total repayment.
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button onClick={resetAll} variant="outline">Reset All Fields</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderLoanOptionCard('Loan Option 1', loanOption1, loanData1, 1, "border-[hsl(var(--chart-1))]", getCardDynamicBackground(0))}
        {renderLoanOptionCard('Loan Option 2', loanOption2, loanData2, 2, "border-[hsl(var(--chart-2))]", getCardDynamicBackground(1))}
        {renderLoanOptionCard('Loan Option 3', loanOption3, loanData3, 3, "border-[hsl(var(--chart-3))]", getCardDynamicBackground(2))}
      </div>

      <Card className="mt-8 shadow-lg">
        <CardHeader className="bg-muted/70">
          <CardTitle className="text-xl font-semibold">Savings Summary</CardTitle>
          <CardDescription>Comparison of total interest and repayment amounts based on the options above. Comparisons are most meaningful when principal amounts are the same.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
            {[loanData1, loanData2, loanData3].map((data, index) => (
              <div key={index} className="p-3 bg-background rounded-md border">
                <h4 className="font-medium text-primary mb-1">Loan Option {index + 1}</h4>
                <p>Total Interest: <span className="font-semibold">{data.totalInterest !== null ? `₹${data.totalInterest.toFixed(2)}` : 'N/A'}</span></p>
                <p>Total Repayable: <span className="font-semibold">{data.totalRepayable !== null ? `₹${data.totalRepayable.toFixed(2)}` : 'N/A'}</span></p>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
             {loanData1.emi !== null && loanData2.emi !== null && renderSavingsComparison(loanData1, "Option 1", loanData2, "Option 2", loanOption1.principal, loanOption2.principal)}
             {loanData1.emi !== null && loanData2.emi !== null && loanData3.emi !==null && <hr className="my-4 border-border"/>}
             {loanData1.emi !== null && loanData3.emi !== null && renderSavingsComparison(loanData1, "Option 1", loanData3, "Option 3", loanOption1.principal, loanOption3.principal)}
          </div>
           {(loanData1.emi === null || (loanData2.emi === null && loanData3.emi === null)) && (
            <p className="text-sm text-muted-foreground text-center">Enter details for Loan Option 1 and at least one other option to see a comparative summary.</p>
           )}
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>EMI Calculation Formula</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The Equated Monthly Installment (EMI) is calculated using the formula:
          </p>
          <p className="mt-2 p-3 bg-muted rounded-md font-mono text-sm break-all">
            EMI = [P × r × (1 + r)^n] / [(1 + r)^n – 1]
          </p>
          <ul className="mt-3 list-disc list-inside text-sm space-y-1 text-muted-foreground">
            <li><strong className="text-foreground">P</strong> = Principal loan amount</li>
            <li><strong className="text-foreground">r</strong> = Monthly interest rate (Annual Rate / 12 / 100)</li>
            <li><strong className="text-foreground">n</strong> = Loan tenure in months</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
    

    