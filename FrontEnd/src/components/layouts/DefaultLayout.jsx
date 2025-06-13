import CustomFooter from "../footer/CustomFooter";
import CustomNav from "../navbar/CustomNav";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <CustomNav />
      {children}
      <CustomFooter />
    </>
  );
};

export default DefaultLayout;
