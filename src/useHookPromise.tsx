import React, { useState, useEffect, use } from 'react';

// Simulated API call
const fetchData = () => new Promise<string>((resolve) => {
  setTimeout(() => resolve("Data fetched successfully!"), 2000);
});

// Component without 'use' hook
const WithoutUseHook: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data}</div>;
};

// Component with 'use' hook
const WithUseHook: React.FC = () => {
  const data = use(fetchData());

  return <div>{data}</div>;
};

// Parent component to demonstrate usage
const PromiseApp: React.FC = () => {
  return (
    <div id="use-hook-promise">
      <h2>Promise Handling Comparison</h2>
      {/* <h3>Without use hook:</h3>
      <WithoutUseHook /> */}
      <h3>With use hook:</h3>
      <React.Suspense fallback={<div>Loading...</div>}>
        <WithUseHook />
      </React.Suspense>
    </div>
  );
};

export { WithoutUseHook, WithUseHook, PromiseApp };


