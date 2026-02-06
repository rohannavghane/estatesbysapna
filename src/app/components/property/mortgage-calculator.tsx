import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Slider } from '@/app/components/ui/slider';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  const [downPayment, setDownPayment] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(25);

  const calculations = useMemo(() => {
    const downPaymentAmount = (propertyPrice * downPayment) / 100;
    const loanAmount = propertyPrice - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyPayment = monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    return {
      downPaymentAmount,
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
    };
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calculator className="h-6 w-6 text-[var(--gold)]" />
        <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>
          Mortgage Calculator
        </h3>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Calculate Your Monthly Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Property Price */}
          <div className="space-y-2">
            <Label>Property Price</Label>
            <Input
              type="text"
              value={formatCurrency(propertyPrice)}
              disabled
              className="bg-secondary"
            />
          </div>

          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Down Payment</Label>
              <span className="text-sm font-medium">{downPayment}%</span>
            </div>
            <Slider
              value={[downPayment]}
              onValueChange={(value) => setDownPayment(value[0])}
              min={20}
              max={80}
              step={5}
              className="py-4"
            />
            <div className="text-sm text-muted-foreground">
              {formatCurrency(calculations.downPaymentAmount)}
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Interest Rate</Label>
              <span className="text-sm font-medium">{interestRate}%</span>
            </div>
            <Slider
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
              min={2}
              max={8}
              step={0.1}
              className="py-4"
            />
          </div>

          {/* Loan Term */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Loan Term</Label>
              <span className="text-sm font-medium">{loanTerm} years</span>
            </div>
            <Slider
              value={[loanTerm]}
              onValueChange={(value) => setLoanTerm(value[0])}
              min={5}
              max={30}
              step={5}
              className="py-4"
            />
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Monthly Payment</div>
            <div
              className="text-2xl md:text-3xl"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              {formatCurrency(calculations.monthlyPayment)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Loan Amount</div>
            <div
              className="text-2xl md:text-3xl"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              {formatCurrency(calculations.loanAmount)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Interest</div>
            <div
              className="text-2xl md:text-3xl"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              {formatCurrency(calculations.totalInterest)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Total Payment</div>
            <div
              className="text-2xl md:text-3xl"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              {formatCurrency(calculations.totalPayment)}
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        * This calculator provides estimates only. Actual terms may vary based on your financial profile and lender requirements.
      </p>
    </div>
  );
}
