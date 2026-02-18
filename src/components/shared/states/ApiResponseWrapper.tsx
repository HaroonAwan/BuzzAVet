import Error from '@/components/shared/states/Error';
import Loading from '@/components/shared/states/Loading';
import NoData from '@/components/shared/states/NoData';
import React from 'react';

interface ApiResponseWrapperProps {
  children: React.ReactNode;
  hasData: boolean;
  isLoading: boolean;
  hasError: boolean;
  hasDataMessage?: string;
  isErrorMessage?: string;
  loadingSize?: { width: number; height: number };
  errorSize?: { width: number; height: number };
  hasDataSize?: { width: number; height: number };
}

const ApiResponseWrapper: React.FC<ApiResponseWrapperProps> = ({
  children,
  hasData,
  isLoading,
  loadingSize = { width: 120, height: 120 },
  hasError,
  errorSize = { width: 120, height: 120 },
  hasDataMessage = null,
  hasDataSize = { width: 120, height: 120 },
  isErrorMessage = null,
}) => {
  if (isLoading) {
    return (
      <div className="w-full">
        <Loading width={loadingSize.width} height={loadingSize.height} />;
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full">
        <Error message={isErrorMessage ?? null} width={errorSize.width} height={errorSize.height} />
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="w-full">
        <NoData
          width={hasDataSize.width}
          height={hasDataSize.height}
          message={hasDataMessage ?? null}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default ApiResponseWrapper;
