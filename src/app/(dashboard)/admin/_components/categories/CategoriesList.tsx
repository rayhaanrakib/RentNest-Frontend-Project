import { getCategoriesData } from "@dashboard/admin/_actions/adminActions";
import { Folder, Building2 } from "lucide-react";
import DeleteCategoryButton from "./DeleteCategoryButton";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const CategoriesList = async () => {
  const categories = await getCategoriesData();

  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <Folder className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-slate-900">
          No categories yet
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Create your first category to organize properties.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category: any) => (
        <div
          key={category.id}
          className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                  <Folder className="h-3.5 w-3.5 text-slate-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {category.name}
                </h3>
              </div>

              {category.description && (
                <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>

            {/* Delete */}
            <DeleteCategoryButton
              categoryId={category.id}
              categoryName={category.name}
            />
          </div>


          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
              <Building2 className="h-3 w-3" />
              {category._count?.properties ?? 0}{" "}
              {category._count?.properties === 1 ? "property" : "properties"}
            </span>

            <span className="text-[11px] text-slate-400">
              {formatDate(category.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;