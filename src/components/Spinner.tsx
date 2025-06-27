type SpinnerProps = {
  centered?: boolean;
};

const Spinner = ({ centered }: SpinnerProps) => {
  return (
    <div
      className={
        centered
          ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          : "flex justify-center items-center m-2.5"
      }
    >
      <div className="border-4 border-solid border-gray-400/10 border-l-gray-600 rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Spinner;
