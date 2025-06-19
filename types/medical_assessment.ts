export interface BillableItem {
  id: number;
  description: string;
  hcpcs_code: string;
  fee: number;
}

export interface MedicalAssessment {
  medical_association: string;
  billable_items: BillableItem[];
  totalFee: number;
}
