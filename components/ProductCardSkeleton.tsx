export default function ProductCardSkeleton() {
  return (
    <div className="group flex flex-col gap-4 h-full">
      <div className="relative aspect-square rounded-3xl bg-gray-200 animate-pulse shrink-0"></div>
      <div className="flex flex-col gap-3 px-1 flex-1">
        <div className="flex justify-between items-start gap-3">
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-6 bg-gray-200 rounded-md w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0 w-1/4">
            <div className="h-6 bg-gray-200 rounded-md w-full animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-md w-2/3 animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-auto pt-2">
          <div className="h-10 bg-gray-200 rounded-full flex-1 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-full flex-1 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
