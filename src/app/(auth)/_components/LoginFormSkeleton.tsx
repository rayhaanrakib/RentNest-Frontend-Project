const LoginFormSkeleton = () => {
  return (
    <div className="w-full max-w-sm space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="mx-auto h-8 w-28 rounded-lg bg-slate-200" />
        <div className="mx-auto h-4 w-64 rounded bg-slate-100" />
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <div className="h-4 w-12 rounded bg-slate-200" />
          <div className="h-11 rounded-lg bg-slate-100" />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-4 w-16 rounded bg-slate-200" />
            <div className="h-3 w-24 rounded bg-slate-100" />
          </div>
          <div className="h-11 rounded-lg bg-slate-100" />
        </div>

        {/* Submit Button */}
        <div className="h-11 rounded-lg bg-slate-200" />
      </div>

      {/* Demo access */}
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-3.5">
        <div className="flex items-center justify-between">
          <div className="h-3 w-20 rounded bg-slate-200" />
          <div className="h-4 w-24 rounded-full bg-slate-100" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          <div className="h-[4.75rem] rounded-xl bg-slate-100" />
          <div className="h-[4.75rem] rounded-xl bg-slate-100" />
          <div className="h-[4.75rem] rounded-xl bg-slate-100" />
        </div>
        <div className="mx-auto mt-3 h-3 w-44 rounded bg-slate-100" />
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="border-t border-slate-200" />
        <div className="absolute inset-x-0 -top-2 flex justify-center">
          <div className="h-4 w-28 rounded bg-white px-2" />
        </div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-11 rounded-lg bg-slate-100" />
        <div className="h-11 rounded-lg bg-slate-100" />
      </div>

      {/* Footer Link */}
      <div className="flex justify-center">
        <div className="h-4 w-40 rounded bg-slate-100" />
      </div>
    </div>
  );
};

export default LoginFormSkeleton;