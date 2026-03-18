import Loading from "../ui/Loading";

interface ContentSectionProcessProps {
  isLoading: boolean;
  isError: boolean;
  textError: string;
  textButtonError: string;
  fetchData: () => void;
  children: React.ReactNode;
}

export default function ContentSectionProcess({ isLoading, isError, textError, textButtonError, fetchData, children }: ContentSectionProcessProps) {

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loading w={6} h={6} color="blue" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{textError}</p>
        <button
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={fetchData}
        >
          {textButtonError}
        </button>
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  );
}