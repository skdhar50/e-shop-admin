const PageHeader = (props) => {
  const { title, render } = props;
  return (
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold text-indigo-600 uppercase">{title}</h2>
      <div className="flex items-center space-x-4">{render}</div>
    </div>
  );
};

export default PageHeader;
