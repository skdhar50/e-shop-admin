const ProgressingBar = () => {
  return (
    <div class=" flex  space-y-3">
      <div class="relative w-full bg-gray-200 rounded">
        <div
          style={{ width: "100%" }}
          class="absolute top-0 h-4 rounded shim-blue"
        ></div>
      </div>
    </div>
  );
};

export default ProgressingBar;
