
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LoanOptionState {
  principal: string;
  annualRate: string;
  tenureMonths: string;
}

const initialLoanOptionState: LoanOptionState = {
  principal: '',
  annualRate: '',
  tenureMonths: '',
};

const calculateEMI = (principal: number, annualRate: number, tenureMonths: number): number | null => {
  if (principal <= 0 || annualRate < 0 || tenureMonths <= 0) {
    return null;
  }
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) {
    // If interest rate is 0, EMI is principal / tenure if principal and tenure are valid
    return principal > 0 && tenureMonths > 0 ? principal / tenureMonths : null;
  }
  if (Math.pow(1 + monthlyRate, tenureMonths) - 1 === 0) { // Avoid division by zero if (1+monthlyRate)^tenureMonths is 1
    return null;
  }
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return emi;
};

export default function EmiComparisonClient() {
  const [loanOption1, setLoanOption1] = useState<LoanOptionState>(initialLoanOptionState);
  const [loanOption2, setLoanOption2] = useState<LoanOptionState>(initialLoanOptionState);
  const [loanOption3, setLoanOption3] = useState<LoanOptionState>(initialLoanOptionState);

  const handleInputChange = (
    optionSetter: React.Dispatch<React.SetStateAction<LoanOptionState>>,
    field: keyof LoanOptionState,
    value: string
  ) => {
    optionSetter((prev) => ({ ...prev, [field]: value }));
  };

  const emi1 = useMemo(() => {
    const principal = parseFloat(loanOption1.principal);
    const annualRate = parseFloat(loanOption1.annualRate);
    const tenureMonths = parseInt(loanOption1.tenureMonths, 10);
    return calculateEMI(principal, annualRate, tenureMonths);
  }, [loanOption1]);

  const emi2 = useMemo(() => {
    const principal = parseFloat(loanOption2.principal);
    const annualRate = parseFloat(loanOption2.annualRate);
    const tenureMonths = parseInt(loanOption2.tenureMonths, 10);
    return calculateEMI(principal, annualRate, tenureMonths);
  }, [loanOption2]);

  const emi3 = useMemo(() => {
    const principal = parseFloat(loanOption3.principal);
    const annualRate = parseFloat(loanOption3.annualRate);
    const tenureMonths = parseInt(loanOption3.tenureMonths, 10);
    return calculateEMI(principal, annualRate, tenureMonths);
  }, [loanOption3]);

  const renderLoanOptionCard = (
    title: string,
    optionState: LoanOptionState,
    optionSetter: React.Dispatch<React.SetStateAction<LoanOptionState>>,
    calculatedEmi: number | null,
    optionNumber: number
  ) => (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Enter loan details to calculate EMI.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div>
          <Label htmlFor={`principal-${optionNumber}`} className="text-sm">Principal Amount (₹)</Label>
          <Input
            id={`principal-${optionNumber}`}
            type="number"
            placeholder="e.g., 500000"
            value={optionState.principal}
            onChange={(e) => handleInputChange(optionSetter, 'principal', e.target.value)}
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
            onChange={(e) => handleInputChange(optionSetter, 'annualRate', e.target.value)}
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
            onChange={(e) => handleInputChange(optionSetter, 'tenureMonths', e.target.value)}
            min="1"
          />
        </div>
      </CardContent>
      <CardFooter className="mt-auto bg-muted/50 p-4 rounded-b-lg">
        <div className="w-full">
          <p className="text-sm font-medium text-muted-foreground">Calculated EMI:</p>
          <p className="text-2xl font-bold text-primary">
            {calculatedEmi !== null ? `₹ ${calculatedEmi.toFixed(2)}` : '₹ 0.00'}
          </p>
          {calculatedEmi === null && (optionState.principal || optionState.annualRate || optionState.tenureMonths) && (
             <p className="text-xs text-destructive mt-1">Please enter valid inputs for all fields.</p>
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

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={resetAll} variant="outline">Reset All Fields</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderLoanOptionCard('Loan Option 1', loanOption1, setLoanOption1, emi1, 1)}
        {renderLoanOptionCard('Loan Option 2', loanOption2, setLoanOption2, emi2, 2)}
        {renderLoanOptionCard('Loan Option 3', loanOption3, setLoanOption3, emi3, 3)}
      </div>
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
