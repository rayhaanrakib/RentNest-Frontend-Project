import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";
import { getAllProperties, getCategories } from "@public/_actions/getData";
import { ICategory, IProperty } from "@/types";


const CategoriesContent = async () => {
  const [categoriesData, propertiesData] = await Promise.all([
    getCategories(),
    getAllProperties(),
  ]);

  const categories = categoriesData?.data || categoriesData || [];
  const allProperties = propertiesData?.data || propertiesData || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {categories.map((category: ICategory) => {
        const categoryProperties = allProperties.filter(
          (p: IProperty) => p.category?.id === category.id
        );

        if (categoryProperties.length === 0) return null;

        return (
          <div
            key={category.id}
            className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col"
          >
            {/* Category Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {category.name}
                </h2>
                <span className="shrink-0 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 shadow-sm">
                  {categoryProperties.length} {categoryProperties.length === 1 ? "Property" : "Properties"}
                </span>
              </div>
              <p className="text-sm text-slate-500 max-w-md">
                {category.description}
              </p>
            </div>

            {/* Properties List */}
            <div className="divide-y divide-slate-100 flex-grow">
              {categoryProperties.map((property: IProperty) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="group flex items-center justify-between p-5 md:p-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Property Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 shrink-0">
                      <Building2 className="h-4 w-4" />
                    </div>

                    {/* Property Title */}
                    <h3 className="text-base font-medium text-slate-800 truncate group-hover:text-brand-600 transition-colors">
                      {property.title}
                    </h3>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all shrink-0 ml-4">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="col-span-full text-center py-24 bg-white rounded-3xl border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            No categories found
          </h3>
          <p className="text-slate-500">Please check back later.</p>
        </div>
      )}
    </div>
  );
}
export default CategoriesContent;
