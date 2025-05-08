"use client";
type Props = {
  fields: number | 1;
};
export default function CardSkeleton({ fields }: Props) {
  return (
    <div className="h-auto flex flex-col justify-center items-center w-full max-w-5xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-100 animate-pulse">
        Loading Group Details {fields}
      </h2>
      <div className="h-full w-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border p-4 rounded-md animate-pulse">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index}>
            <div
              key={index}
              className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/5 mb-2"
            ></div>
            <input
              type="text"
              className="p-3 bg-gray-300 dark:bg-gray-100 rounded w-1/2 mb-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
