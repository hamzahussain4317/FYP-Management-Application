"use client";
type Props = {
  length: number | 1;
};
export default function CardSkeleton({ length }: Props) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: length }).map((_, index) => (
        <div
          key={index}
          className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border p-4 rounded-md bg-light-background dark:bg-dark-background h-auto animate-pulse"
        >
          <div className="min-h-[200px] dark:bg-gray-500 rounded-lg mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
