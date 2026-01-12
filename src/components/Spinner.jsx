const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-light-200 border-t-transparent">
        Loading....
      </div>
    </div>
  );
};

export default Spinner;
