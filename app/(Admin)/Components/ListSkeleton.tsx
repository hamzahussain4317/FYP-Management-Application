"use client";
type Props = {
  length: number | 1;
  list: string;
};
export default function ListSkeleton({ length, list }: Props) {
  return (
    <div className="w-full bg-light-surface dark:bg-dark-surface shadow-soft rounded-lg p-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-light-text dark:text-dark-text">
        Loading {list}...
      </h1>
      <div className="flex flex-col gap-3">
        {Array.from({ length: length }).map((_, index) => (
          <div
            key={index}
            className="border border-light-border dark:border-dark-border p-4 rounded-md bg-light-background dark:bg-dark-background animate-pulse"
          >
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
