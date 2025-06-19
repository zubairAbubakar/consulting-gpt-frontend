import { BillableItem } from '@/types/medical_assessment';

interface MedicalAssessmentProps {
  medicalAssociation: string;
  billableItems: BillableItem[];
  totalFee: number;
}

export const MedicalAssessment: React.FC<MedicalAssessmentProps> = ({
  medicalAssociation,
  billableItems,
  totalFee,
}) => {
  return (
    <div className="my-8">
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-200">
          Billable Items ({medicalAssociation})
        </h2>
        <div className="mt-2 rounded bg-emerald-50 px-4 py-2 font-medium text-emerald-700 shadow dark:bg-emerald-900/40 dark:text-emerald-200 md:mt-0">
          Total Fee:{' '}
          <span className="font-bold">
            ${totalFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-800">
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-slate-300">
                HCPCS Code
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-slate-300">
                Description
              </th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 dark:text-slate-300">
                Fee (USD)
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-slate-300">
                Status/Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {billableItems.map((item) => (
              <tr
                key={item.id}
                className={item.fee === 0 ? 'bg-yellow-50 dark:bg-yellow-900/30' : ''}
              >
                <td className="px-4 py-2 font-mono text-sm text-gray-800 dark:text-slate-200">
                  {item.hcpcs_code}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-slate-300">
                  {item.description}
                </td>
                <td className="px-4 py-2 text-right text-sm text-gray-900 dark:text-slate-100">
                  {item.fee === 0 ? (
                    <span className="text-gray-400 dark:text-slate-500">$0.00</span>
                  ) : (
                    `$${item.fee.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                  )}
                </td>
                <td className="px-4 py-2 text-xs">
                  {item.fee === 0 ? (
                    <span className="inline-flex items-center gap-1 rounded bg-yellow-100 px-2 py-1 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-200">
                      <svg
                        className="h-4 w-4 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Fee data not found in CMS
                    </span>
                  ) : (
                    <span className="text-green-700 dark:text-green-300">Billable</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Optional: Alert if any missing fee data */}
      {billableItems.some((item) => item.fee === 0) && (
        <div className="mt-4 flex items-center gap-2 rounded bg-yellow-50 px-4 py-2 text-sm text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200">
          <svg
            className="h-5 w-5 text-yellow-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Some items are missing fee data and are not included in the total.
        </div>
      )}
    </div>
  );
};
