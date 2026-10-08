import { IPayment } from "@/types";
import {
  getPayments,
  getTenantRentalReviews,
} from "@dashboard/tenant/_actions/tenantActions";
import ReviewModal from "@dashboard/tenant/_components/ReviewModal";

const PaymentsPage = async () => {
  const payments: IPayment[] = await getPayments();
  const reviews = await getTenantRentalReviews();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Payment History
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Review all your past transactions
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {payments.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm font-medium text-slate-800 mb-1">
              No payments yet
            </p>
            <p className="text-sm text-slate-500">
              Your payment history will appear here once you pay for a rental.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500 bg-slate-50">
                  <th className="font-medium px-6 py-3">Property</th>
                  <th className="font-medium px-6 py-3">Amount</th>
                  <th className="font-medium px-6 py-3">Date Paid</th>
                  <th className="font-medium px-6 py-3">Status</th>
                  <th className="font-medium px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {payments.map((payment: IPayment) => {
                  const isReviewed = reviews.some(
                    (review:any) =>
                      review.property?.id === payment.rentalRequest?.propertyId,
                  );

                  return (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                    >
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {payment.rentalRequest?.property?.title ||
                          "Unknown Property"}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: payment.currency,
                        }).format(payment.amount)}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            payment.status === "COMPLETED"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 text-right">
                        {payment.status === "COMPLETED" &&
                          payment.rentalRequest?.propertyId &&
                          (isReviewed ? (
                            <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 font-medium">
                              Already Reviewed
                            </span>
                          ) : (
                            <ReviewModal
                              propertyId={payment.rentalRequest.propertyId}
                              propertyName={
                                payment.rentalRequest?.property?.title ||
                                "Property"
                              }
                            />
                          ))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
