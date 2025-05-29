import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

type LoadingModalProps = {
  loading: boolean;
  setLoading?: (loading: boolean) => void;
};

const LoadingModal = ({ loading, setLoading }: LoadingModalProps) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="p-6 flex flex-col items-center">
        <ClipLoader color="#3A2E24" size={50} />
      </div>
    </div>
  );
};

export default LoadingModal;
