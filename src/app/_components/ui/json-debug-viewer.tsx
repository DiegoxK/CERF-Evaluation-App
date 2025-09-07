"use client";

interface JsonDebugViewerProps<T> {
  object: T | undefined;
  title?: string;
}

export const JsonDebugViewer = <T,>({
  object,
  title = "Live Streamed Object",
}: JsonDebugViewerProps<T>) => {
  if (!object) {
    return null;
  }

  return (
    <div className="mt-8 rounded-lg border bg-gray-50 p-4 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <pre className="mt-2 w-full overflow-auto rounded-md bg-gray-900 p-4 text-xs text-white dark:bg-black">
        {JSON.stringify(object, null, 2)}
      </pre>
    </div>
  );
};
