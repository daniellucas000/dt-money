import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../contexts/TransactionsContext';

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  // {income: total, outcome: total, total: total}
  // acumulator é o objeto
  // cada transação irá aumentar o valor de income e outcome do acumlator = summary
  const summary = transactions.reduce(
    (acumulador, transaction) => {
      if (transaction.type === 'income') {
        acumulador.income += transaction.price;
        acumulador.total += transaction.price;
      } else {
        acumulador.outcome += transaction.price;
        acumulador.total -= transaction.price;
      }

      return acumulador;
    },
    { income: 0, outcome: 0, total: 0 }
  )

  return summary;
}
